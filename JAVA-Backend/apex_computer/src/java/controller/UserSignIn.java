package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.Cart_DTO;
import dto.ResponseDTO;
import dto.User_DTO;
import entity.Cart;
import entity.User;
import java.io.IOException;
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
        
        ResponseDTO respDto = new ResponseDTO();
        
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        User_DTO userDto = gson.fromJson(req.getReader(), User_DTO.class);
        
        if (userDto.getEmail().isEmpty()) {
            respDto.setContent("Please Enter Your Email..!!");
        } else if (userDto.getPassword().isEmpty()) {
            respDto.setContent("Please Enter Your Password..!!");
        } else {
            
            Session session = HibernateUtil.getSessionFactory().openSession();
            
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", userDto.getEmail()));
            criteria.add(Restrictions.eq("password", userDto.getPassword()));
            
            if (!criteria.list().isEmpty()) {
                
                User user = (User) criteria.uniqueResult();
                
                if (!user.getVerification().equals("verified")) {
                    req.getSession().setAttribute("email", userDto.getEmail());
                    respDto.setContent("unverified");
                } else {
                    userDto.setFname(user.getFname());
                    userDto.setLname(user.getLname());
                    userDto.setPassword(null);
                    req.getSession().setAttribute("user", userDto);

//                    Transfer sessioncart to DB cart   
                    if (req.getSession().getAttribute("sessioncart") != null) {
                        
                        ArrayList<Cart_DTO> sessionCart = (ArrayList<Cart_DTO>) req.getSession().getAttribute("sessioncart");
                        
                        Criteria criteria2 = session.createCriteria(Cart.class);
                        criteria2.add(Restrictions.eq("user", user));
                        List<Cart> dbCart = criteria2.list();
                        
                        if (dbCart.isEmpty()) {
                            //DB cart is empty
                            //Add all session cart items into DB cart

                            for (Cart_DTO cartDto : sessionCart) {
                                Cart cart = new Cart();
                                cart.setProduct(cartDto.getProduct());
                                cart.setQty(cartDto.getQty());
                                cart.setUser(user);
                                session.save(cart);
                            }
                        } else {
                            
                            for (Cart_DTO cartDto : sessionCart) {
                                
                                boolean isFoundInDbCart = false;
                                for (Cart cart : dbCart) {
                                    if (cartDto.getProduct().getId() == cart.getProduct().getId()) {
                                        isFoundInDbCart = true;
                                        
                                        if ((cartDto.getQty() + cart.getQty()) <= cart.getProduct().getQty()) {
                                            // qty available
                                            cart.setQty(cartDto.getQty() + cart.getQty());
                                            session.update(cart);
                                        } else {
                                            //qty not available

                                            cart.setQty(cart.getProduct().getQty());
                                            session.update(cart);
                                        }
                                    }
                                }
                                
                                if (!isFoundInDbCart) {
                                    // not found db cart

                                    Cart cart = new Cart();
                                    cart.setProduct(cartDto.getProduct());
                                    cart.setQty(cartDto.getQty());
                                    cart.setUser(user);
                                    session.save(cart);
                                }
                            }
                        }
                        req.getSession().removeAttribute("sessioncart");
                        session.beginTransaction().commit();
                    }
                    respDto.setSuccess(true);
                    respDto.setContent("Sign is Success..!!");
                }
                
            } else {
                respDto.setContent("Invalid Details..!");
            }
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(respDto));
    }
    
}
