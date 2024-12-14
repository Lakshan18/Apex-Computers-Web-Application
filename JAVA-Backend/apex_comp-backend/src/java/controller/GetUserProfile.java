package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import dto.User_DTO;
import entity.Address;
import entity.User;
import model.HibernateUtil;
import model.SetCores;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "GetUserProfile", urlPatterns = {"/GetUserProfile"})
public class GetUserProfile extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "GET");

        Response_DTO response_dto = new Response_DTO();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        JsonObject jsonObject = new JsonObject();

        try {
            int u_id = Integer.parseInt(req.getParameter("id"));
            Session session = HibernateUtil.geSessionFactory().openSession();

            Criteria userCriteria = session.createCriteria(User.class);
            userCriteria.add(Restrictions.eq("id", u_id));
            User user = (User) userCriteria.uniqueResult();

            if (user != null) {
                jsonObject.addProperty("email", user.getEmail());
                jsonObject.addProperty("fName", user.getFirst_name());
                jsonObject.addProperty("lName",user.getLast_name());

                if (user.getUsername() == null) {
                    jsonObject.addProperty("username", "");
                } else {
                    jsonObject.addProperty("username", user.getUsername());
                }

                // Fetch address details
                Criteria addressCriteria = session.createCriteria(Address.class);
                addressCriteria.createAlias("user", "userAlias");
                addressCriteria.add(Restrictions.eq("userAlias.id", u_id));
                Address address = (Address) addressCriteria.uniqueResult();

                if (address != null) {
                    jsonObject.addProperty("line1", address.getLine1());
                    jsonObject.addProperty("line2", address.getLine2());
                    jsonObject.addProperty("mobile", address.getMobile());
                    jsonObject.addProperty("postal", address.getPostal());
                    jsonObject.addProperty("city", address.getCity().getName());
                } else {
                    jsonObject.addProperty("line1", "Empty");
                    jsonObject.addProperty("line2", "Empty");
                    jsonObject.addProperty("mobile", "Empty");
                    jsonObject.addProperty("postal", "Empty");
                    jsonObject.addProperty("city", "Empty");
                }
            } else {
                response_dto.setContent("User not found");
                response_dto.setSuccess(false);
            }

            session.close();

            String jsonResponse = gson.toJson(jsonObject);
            resp.setContentType("application/json");
            resp.getWriter().write(jsonResponse);

        } catch (Exception e) {
            e.printStackTrace();
            response_dto.setContent("An error occurred: " + e.getMessage());
            response_dto.setSuccess(false);

            String errorResponse = gson.toJson(response_dto);
            resp.setContentType("application/json");
            resp.getWriter().write(errorResponse);
        }

    }
}
