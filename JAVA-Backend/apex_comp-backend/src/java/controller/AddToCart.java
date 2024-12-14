package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.Cart_DTO;
import dto.Response_DTO;
import dto.User_DTO;
import entity.Cart;
import entity.Product;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import model.SetCores;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "AddToCart", urlPatterns = {"/AddToCart"})
public class AddToCart extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "GET");

        Response_DTO response_dto = new Response_DTO();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        Session session = HibernateUtil.geSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();

        try {
            String pid = req.getParameter("pid");
            String qty = req.getParameter("qty");

            if (!Validations.isInteger(pid)) {
                response_dto.setContent("Invalid product id");
            } else if (!Validations.isInteger(qty)) {
                response_dto.setContent("Invalid product quantity");
            } else {
                int productId = Integer.parseInt(pid);
                int productQty = Integer.parseInt(qty);

                if (productQty <= 0) {
                    response_dto.setContent("Quantity must be greater than 0");
                } else {
                    Product product = (Product) session.get(Product.class, productId);

                    if (product != null) {
                        //product found...
                        if (req.getSession().getAttribute("user") != null) {
                            //DB cart....

                            User_DTO user_dto = (User_DTO) req.getSession().getAttribute("user");

                            //search user...
                            Criteria criteria1 = session.createCriteria(User.class);
                            criteria1.add(Restrictions.eq("email", user_dto.getEmail()));

                            User user = (User) criteria1.uniqueResult();

                            //check in DB cart...
                            Criteria criteria2 = session.createCriteria(Cart.class);
                            criteria2.add(Restrictions.eq("user", user));
                            criteria2.add(Restrictions.eq("product", product));

                            if (criteria2.list().isEmpty()) {
                                //item not found in cart...

                                if (productQty <= product.getQuatity()) {
                                    //add product into cart...

                                    Cart cart = new Cart();
                                    cart.setProduct(product);
                                    cart.setQuantity(productQty);
                                    cart.setUser(user);

                                    session.save(cart);
                                    transaction.commit();
                                    response_dto.setSuccess(true);
                                    response_dto.setContent("Product added to cart");
                                } else {
                                    //not enough stock....
                                    response_dto.setContent("Not enough stock");
                                }
                            } else {
                                //item found in cart...

                                Cart cartItem = (Cart) criteria2.uniqueResult();

                                if ((cartItem.getQuantity() + productQty) <= product.getQuatity()) {

                                    cartItem.setQuantity(cartItem.getQuantity() + productQty);
                                    session.update(cartItem);
                                    transaction.commit();

                                    response_dto.setSuccess(true);
                                    response_dto.setContent("Quantity updated");
                                } else {
                                    //can't update your cart. Quantity not available
                                    response_dto.setContent("Quantity not available");
                                }
                            }
                        } else {
                            //session cart......

                            HttpSession httpSession = req.getSession();

                            if (httpSession.getAttribute("sessionCart") != null) {
                                //session cart found....

                                ArrayList<Cart_DTO> sessionCart = (ArrayList<Cart_DTO>) httpSession.getAttribute("sessionCart");

                                Cart_DTO foundCart_dto = null;

                                for (Cart_DTO cart_dto : sessionCart) {
                                    if (cart_dto.getProduct().getId() == product.getId()) {
                                        foundCart_dto = cart_dto;
                                        break;
                                    }
                                }

                                if (foundCart_dto != null) {
                                    //product found....

                                    if ((foundCart_dto.getQty() + productQty) <= product.getQuatity()) {
                                        //update quantity in session cart

                                        foundCart_dto.setQty(foundCart_dto.getQty() + productQty);

                                        response_dto.setSuccess(true);
                                        response_dto.setContent("Product quantity updated");
                                    } else {
                                        // quantity not available
                                        response_dto.setContent("Quantity not available");
                                    }
                                } else {
                                    //product not found...

                                    if (productQty <= product.getQuatity()) {
                                        //add to session cart
                                        Cart_DTO cart_dto = new Cart_DTO();
                                        cart_dto.setProduct(product);
                                        cart_dto.setQty(productQty);
                                        sessionCart.add(cart_dto);

                                        response_dto.setSuccess(true);
                                        response_dto.setContent("Product added to cart 1");
                                        System.out.println(cart_dto.getProduct().getTitle());
                                    } else {
                                        //quantity not available
                                        response_dto.setContent("Quantity not available");
                                    }
                                }
                            } else {
                                //session cart not found
                                if (productQty <= product.getQuatity()) {

                                    ArrayList<Cart_DTO> sessionCart = new ArrayList<>();

                                    Cart_DTO cart_dto = new Cart_DTO();
                                    cart_dto.setProduct(product);
                                    cart_dto.setQty(productQty);
                                    sessionCart.add(cart_dto);

                                    req.getSession().setAttribute("sessionCart", sessionCart);

                                    response_dto.setSuccess(true);
                                    response_dto.setContent("Product added to cart 2");
                                    System.out.println(cart_dto.getProduct().getTitle());
                                } else {
                                    //not enough stock in session cart
                                    response_dto.setContent("Not enough stock");
                                }
                            }
                        }
                    } else {
                        //product not found
                        response_dto.setContent("Product not found");
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            response_dto.setContent("Unable to process you request");
        }

        session.close();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));

    }
}
