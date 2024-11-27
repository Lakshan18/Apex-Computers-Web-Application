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
        SetCores.setHeaders(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "POST");

        Response_DTO response_dto = new Response_DTO();

        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(req.getReader(), JsonObject.class);
        String verification_code = jsonObject.get("v_code").getAsString();

        System.out.println(req.getSession().getAttribute("email"));
        if (req.getSession().getAttribute("email") != null) {
            String email = req.getSession().getAttribute("email").toString();

            Session session = HibernateUtil.geSessionFactory().openSession();

            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", email));
            criteria.add(Restrictions.eq("verification", verification_code));

            if (!criteria.list().isEmpty()) {

                User user = (User) criteria.uniqueResult();
                user.setVerification("Verified");

                User_DTO user_dto = new User_DTO();
                user_dto.setFirst_name(user.getFirst_name());
                user_dto.setLast_name(user.getLast_name());
                user_dto.setUsername(user.getUsername());
                user_dto.setEmail(user.getEmail());

                req.getSession().removeAttribute("email");
                req.getSession().setAttribute("email", user_dto);

                response_dto.setSuccess(true);
                response_dto.setContent("Verification Successfull..!!");
            } else {
                response_dto.setContent("Invalid Verification code. check again..!!");
            }
        } else {
            response_dto.setContent("Please go to Sign in.");
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));
    }

}
