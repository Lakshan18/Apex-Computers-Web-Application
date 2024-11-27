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
import model.SetCores;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "UserSignIn", urlPatterns = {"/UserSignIn"})
public class UserSignIn extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.setHeaders(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "POST");

        Response_DTO response_dto = new Response_DTO();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        User_DTO user_dto = gson.fromJson(req.getReader(), User_DTO.class);

        if (user_dto.getEmail().isEmpty()) {
            response_dto.setContent("Please enter your Email..!");
        } else if (user_dto.getPassword().isEmpty()) {
            response_dto.setContent("Please enter your Password..!");
        } else {

            Session session = HibernateUtil.geSessionFactory().openSession();

            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", user_dto.getEmail()));
            criteria.add(Restrictions.eq("password", user_dto.getPassword()));

            if (!criteria.list().isEmpty()) {

                User user = (User) criteria.uniqueResult();

                if (!user.getVerification().equals("Verified")) {
                    req.getSession().setAttribute("email", user_dto.getEmail());
                    response_dto.setContent("Unverified");
                } else {
                    user_dto.setFirst_name(user.getFirst_name());
                    user_dto.setLast_name(user.getLast_name());
                    user_dto.setUsername(user.getUsername());
                    user_dto.setPassword(null);
                    req.getSession().setAttribute("user", user_dto);

                    if (req.getSession().getAttribute("sessionCart") != null) {

                        ArrayList<Cart_DTO> sessionCart = (ArrayList<Cart_DTO>) req.getSession().getAttribute("sessionCart");

                        Criteria criteria1 = session.createCriteria(Cart.class);
                        criteria1.add(Restrictions.eq("user", user));
                        List<Cart> dbCart = criteria1.list();

                        if (dbCart.isEmpty()) {

                            for (Cart_DTO cart_DTO : sessionCart) {
                                Cart cart = new Cart();
                                cart.setProduct(cart_DTO.getProduct()); //* user is null
                                cart.setQuantity(cart_DTO.getQuantity());
                                cart.setUser(user);
                                session.save(cart);
                            }
                        } else {
                            for (Cart_DTO cart_DTO : sessionCart) {

                                boolean isFoundInDBCart = false;
                                for (Cart cart : dbCart) {

                                    if (cart_DTO.getProduct().getId() == cart.getProduct().getId()) {
                                        //same item found in session cart & DB cart
                                        isFoundInDBCart = true;

                                        if ((cart_DTO.getQuantity() + cart.getQuantity()) <= cart.getProduct().getQuantity()) {
                                            //quantity available
                                            cart.setQuantity(cart_DTO.getQuantity() + cart.getQuantity());
                                            session.update(cart);

                                        } else {
                                            //quantity not available
                                            //set max available qty (not required)
                                            cart.setQuantity(cart.getProduct().getQuantity());
                                            session.update(cart);
                                        }
                                    }

                                }

                                if (!isFoundInDBCart) {
                                    //not found in DB cart
                                    Cart cart = new Cart();
                                    cart.setProduct(cart_DTO.getProduct()); //* user is null
                                    cart.setQuantity(cart_DTO.getQuantity());
                                    cart.setUser(user);
                                    session.save(cart);
                                }

                            }
                        }
                        req.getSession().removeAttribute("sessionCart");
                        session.beginTransaction().commit();
                    }
                    response_dto.setSuccess(true);
                    response_dto.setContent("Sign in success");
                }
            } else {
                response_dto.setContent("Invalid Details!");
            }
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));
    }

}
