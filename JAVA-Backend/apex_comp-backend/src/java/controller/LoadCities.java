package controller;

import com.google.gson.Gson;
import dto.Response_DTO;
import entity.City;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.SetCores;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;

@WebServlet(name = "LoadCities", urlPatterns = {"/LoadCities"})
public class LoadCities extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "GET");

        Gson gson = new Gson();
        Response_DTO response_dto = new Response_DTO();
        Transaction transaction = null;

        try {

            Session session = HibernateUtil.geSessionFactory().openSession();
            transaction = session.beginTransaction();

            Criteria criteria = session.createCriteria(City.class);

            List<City> cities = criteria.list();

            ArrayList<Map<String, Object>> cityList = new ArrayList<>();

            for (City city : cities) {
                Map<String, Object> cityMap = new HashMap<>();
                cityMap.put("id", city.getId());
                cityMap.put("c_name", city.getName());
                cityList.add(cityMap);
            }

            transaction.commit();

            response_dto.setSuccess(true);
            response_dto.setContent(cityList);

            session.close();

        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();

            response_dto.setSuccess(false);
            response_dto.setContent("An error occurred while fetching cities.");
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));
    }
}
