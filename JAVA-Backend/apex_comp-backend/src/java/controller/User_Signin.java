package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.Cart_DTO;
import dto.Response_DTO;
import dto.User_DTO;
import entity.Cart;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.Mail;
import model.SetCores;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "User_Signin", urlPatterns = {"/User_Signin"})
public class User_Signin extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "POST");

        Response_DTO response_DTO = new Response_DTO();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        User_DTO user_DTO = gson.fromJson(req.getReader(), User_DTO.class);

        if (user_DTO.getEmail().isEmpty()) {
            response_DTO.setContent("Please enter your Email");

        } else if (user_DTO.getPassword().isEmpty()) {
            response_DTO.setContent("Please enter your Password");

        } else if (!Validations.isPasswordValid(user_DTO.getPassword())) {
            response_DTO.setContent("Please enter valid password.!");
        } else {

            Session session = HibernateUtil.geSessionFactory().openSession();

            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", user_DTO.getEmail()));
            criteria.add(Restrictions.eq("password", user_DTO.getPassword()));

            if (!criteria.list().isEmpty()) {

                User user = (User) criteria.uniqueResult();

                if (!user.getVerification().equals("Verified")) {
                    //not verified
                    req.getSession().setAttribute("email", user_DTO.getEmail());
                    response_DTO.setContent("Unverified");

                } else {
                    //verified
                    if (user.getUsername() == null) {
                        user_DTO.setId(user.getId());
                        user_DTO.setFirst_name(user.getFirst_name());
                        user_DTO.setLast_name(user.getLast_name());
                    } else {
                        user_DTO.setId(user.getId());
                        user_DTO.setUsername(user.getUsername());
                    }
                    user_DTO.setPassword(null);
                    req.getSession().setAttribute("user", user_DTO);

                    //Transfer session cart to DB cart
                    if (req.getSession().getAttribute("sessionCart") != null) {

                        ArrayList<Cart_DTO> sessionCart = (ArrayList<Cart_DTO>) req.getSession().getAttribute("sessionCart");

                        Criteria criteria2 = session.createCriteria(Cart.class);
                        criteria2.add(Restrictions.eq("user", user));
                        List<Cart> dbCart = criteria2.list();

                        if (dbCart.isEmpty()) {
                            //DB cart is empty
                            //Add all session cart items into DB cart

                            for (Cart_DTO cart_DTO : sessionCart) {

                                Cart cart = new Cart();
                                cart.setProduct(cart_DTO.getProduct()); //* user is null
                                cart.setQuantity(cart_DTO.getQty());
                                cart.setUser(user);
                                session.save(cart);
                            }

                        } else {
                            //found items in DB cart

                            for (Cart_DTO cart_DTO : sessionCart) {

                                boolean isFoundInDBCart = false;
                                for (Cart cart : dbCart) {

                                    if (cart_DTO.getProduct().getId() == cart.getProduct().getId()) {
                                        //same item found in session cart & DB cart
                                        isFoundInDBCart = true;

                                        if ((cart_DTO.getQty() + cart.getQuantity()) <= cart.getProduct().getQuatity()) {
                                            //quantity available
                                            cart.setQuantity(cart_DTO.getQty() + cart.getQuantity());
                                            session.update(cart);

                                        } else {
                                            //quantity not available
                                            //set max available qty (not required)
                                            cart.setQuantity(cart.getProduct().getQuatity());
                                            session.update(cart);
                                        }
                                    }

                                }

                                if (!isFoundInDBCart) {
                                    //not found in DB cart
                                    Cart cart = new Cart();
                                    cart.setProduct(cart_DTO.getProduct()); //* user is null
                                    cart.setQuantity(cart_DTO.getQty());
                                    cart.setUser(user);
                                    session.save(cart);
                                }

                            }

                        }

                        req.getSession().removeAttribute("sessionCart");
                        session.beginTransaction().commit();

                    }

                    response_DTO.setSuccess(true);
                    response_DTO.setContent("Sign in success");
                }

            } else {
                response_DTO.setContent("Invalid Details!");
            }
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_DTO));
    }
}
