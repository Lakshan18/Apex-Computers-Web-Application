package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import dto.User_DTO;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
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

@WebServlet(name = "Verify_Account", urlPatterns = {"/Verify_Account"})
public class Verify_Account extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "POST");

        Response_DTO response_DTO = new Response_DTO();
        Gson gson = new Gson();
        JsonObject dto = gson.fromJson(req.getReader(), JsonObject.class);
        String verification = dto.get("v_code").getAsString();

        // Check if session has the "email" attribute
        Object emailObj = req.getSession(true).getAttribute("email");

        System.out.println(emailObj.toString());
        
        if (emailObj != null) {
            String email = emailObj.toString();

            Session session = HibernateUtil.geSessionFactory().openSession();

            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", email));
            criteria.add(Restrictions.eq("verification", verification));

            if (!criteria.list().isEmpty()) {
                User user = (User) criteria.uniqueResult();
                user.setVerification("Verified");

                session.beginTransaction();
                session.update(user);
                session.getTransaction().commit();

                User_DTO user_DTO = new User_DTO();
                user_DTO.setFirst_name(user.getFirst_name());
                user_DTO.setLast_name(user.getLast_name());
                user_DTO.setUsername(user.getUsername());
                user_DTO.setEmail(user.getEmail());

                req.getSession().removeAttribute("email");
                req.getSession().setAttribute("user", user_DTO);

                response_DTO.setSuccess(true);
                response_DTO.setContent("Verification success");
            } else {
                response_DTO.setContent("Invalid Verification code!");
            }
        } else {
            response_DTO.setContent("Verification unavailable! Please Sign in");
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_DTO));
    }

}
