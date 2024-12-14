package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import entity.Orders;
import java.io.IOException;
import java.io.PrintWriter;
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

@WebServlet(name = "FetchOrderHistory", urlPatterns = {"/FetchOrderHistory"})
public class FetchOrderHistory extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "GET");

        int user_id = Integer.parseInt(req.getParameter("uid"));

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        Response_DTO response_dto = new Response_DTO();

        try {

            Session session = HibernateUtil.geSessionFactory().openSession();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
