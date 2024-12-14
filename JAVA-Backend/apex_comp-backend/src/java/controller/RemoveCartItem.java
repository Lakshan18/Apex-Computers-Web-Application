package controller;

import com.google.gson.Gson;
import dto.Cart_DTO;
import dto.Response_DTO;
import entity.Cart;
import entity.User;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import model.SetCores;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "RemoveCartItem", urlPatterns = {"/RemoveCartItem"})
public class RemoveCartItem extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "GET");

        Gson gson = new Gson();
        Response_DTO response_dto = new Response_DTO();
        HttpSession httpSession = req.getSession();

        int productId;
        try {
            productId = Integer.parseInt(req.getParameter("pid"));
        } catch (NumberFormatException e) {
            response_dto.setSuccess(false);
            response_dto.setContent("Invalid product ID.");

            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson(response_dto));
            return;
        }

        Session session = HibernateUtil.geSessionFactory().openSession();
        Transaction transaction = null;

        try {
            if (httpSession.getAttribute("user") != null) {
                transaction = session.beginTransaction();

                User user = (User) session.createCriteria(User.class)
                        .add(Restrictions.eq("email", ((dto.User_DTO) httpSession.getAttribute("user")).getEmail()))
                        .uniqueResult();

                if (user == null) {
                    throw new Exception("User not found.");
                }

                Cart cartItem = (Cart) session.createCriteria(Cart.class)
                        .add(Restrictions.eq("user", user))
                        .add(Restrictions.eq("product.id", productId))
                        .uniqueResult();

                if (cartItem != null) {
                    session.delete(cartItem);
                    transaction.commit();
                    response_dto.setSuccess(true);
                    response_dto.setContent("Item removed successfully.");
                } else {
                    response_dto.setSuccess(false);
                    response_dto.setContent("Item not found in the cart.");
                }

            } else {
                if (httpSession.getAttribute("sessionCart") != null) {
                    ArrayList<Cart_DTO> cartDtoList = (ArrayList<Cart_DTO>) httpSession.getAttribute("sessionCart");
                    boolean itemRemoved = cartDtoList.removeIf(cartDto -> cartDto.getProduct().getId() == productId);

                    if (itemRemoved) {
                        response_dto.setSuccess(true);
                        response_dto.setContent("Item removed successfully.");
                    } else {
                        response_dto.setSuccess(false);
                        response_dto.setContent("Item not found in the cart.");
                    }

                    httpSession.setAttribute("sessionCart", cartDtoList);
                } else {
                    response_dto.setSuccess(false);
                    response_dto.setContent("Cart is empty.");
                }
            }

        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
            response_dto.setSuccess(false);
            response_dto.setContent("An error occurred while removing the item.");
        } finally {
            session.close();
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));
    }
}
