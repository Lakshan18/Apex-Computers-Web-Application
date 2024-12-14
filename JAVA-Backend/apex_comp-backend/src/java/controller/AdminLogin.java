package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import entity.Admin;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
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
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "AdminLogin", urlPatterns = {"/AdminLogin"})
public class AdminLogin extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.AllowMethod(req, resp, "POST");

        Response_DTO response_dto = new Response_DTO();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

        JsonObject inputJson = new JsonObject();
        try (InputStreamReader reader = new InputStreamReader(req.getInputStream())) {
            inputJson = new com.google.gson.JsonParser().parse(reader).getAsJsonObject();
        } catch (Exception e) {
            e.printStackTrace();
        }

        String username = inputJson.get("uName").getAsString();
        String password = inputJson.get("password").getAsString();

        Session session = HibernateUtil.geSessionFactory().openSession();

        try {
            Criteria criteria = session.createCriteria(Admin.class);
            criteria.add(Restrictions.eq("username", username));
            criteria.add(Restrictions.eq("password", password));

            List<Admin> admins = criteria.list();

            if (admins != null && !admins.isEmpty()) {
                Admin admin = admins.get(0);

                HttpSession sessionHttp = req.getSession();
                sessionHttp.setAttribute("admin", admin);

                response_dto.setSuccess(true);
                response_dto.setContent("success");
            } else {
                response_dto.setSuccess(false);
                response_dto.setContent("invalid");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response_dto.setSuccess(false);
            response_dto.setContent("An error occurred during login.");
        } finally {
            session.close();
        }

        JsonObject jsonResponse = new JsonObject();
        jsonResponse.add("response_dto", gson.toJsonTree(response_dto));

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonResponse));
    }

}
