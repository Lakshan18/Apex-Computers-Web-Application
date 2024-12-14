package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import dto.User_DTO;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.SetCores;
import org.hibernate.Session;

@WebServlet(name = "Check_Signin", urlPatterns = {"/Check_Signin"})
public class Check_Signin extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "GET");

        JsonObject jsonObject = new JsonObject();

        Response_DTO response_DTO = new Response_DTO();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

        Session session = HibernateUtil.geSessionFactory().openSession();

        if (req.getSession().getAttribute("user") != null) {
            // User is already signed in
            User_DTO user_DTO = (User_DTO) req.getSession().getAttribute("user");
            response_DTO.setSuccess(true);

            JsonObject userInfo = new JsonObject();
            userInfo.addProperty("id", user_DTO.getId());
            userInfo.addProperty("email", user_DTO.getEmail());

            String displayName;
            if (user_DTO.getUsername() != null && !user_DTO.getUsername().isEmpty()) {
                displayName = user_DTO.getUsername();
            } else {
                displayName = user_DTO.getFirst_name() + " " + user_DTO.getLast_name();
            }
            userInfo.addProperty("name", displayName);

            response_DTO.setContent(userInfo);
        } else {
            response_DTO.setContent("Default");
        }

        jsonObject.add("response_dto", gson.toJsonTree(response_DTO));

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));
    }
}
