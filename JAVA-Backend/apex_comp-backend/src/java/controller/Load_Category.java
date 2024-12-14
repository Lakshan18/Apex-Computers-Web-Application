package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.Response_DTO;
import entity.Category;
import java.io.IOException;
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

@WebServlet(name = "Load_Category", urlPatterns = {"/Load_Category"})
public class Load_Category extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "GET");

        Response_DTO response_dto = new Response_DTO();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

        Transaction transaction = null;

        try {
            Session session = HibernateUtil.geSessionFactory().openSession();
            transaction = session.beginTransaction();
            Criteria criteria = session.createCriteria(Category.class);

            List<Category> categories = criteria.list();

            ArrayList<Map<String, Object>> categoryList = new ArrayList<>();

            for (Category category : categories) {
                Map<String, Object> categoryMap = new HashMap<>();
                categoryMap.put("id", category.getId());
                categoryMap.put("name", category.getName());
                categoryList.add(categoryMap);
            }

            transaction.commit();

            response_dto.setSuccess(true);
            response_dto.setContent(categoryList);

            session.close();
            
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();

            response_dto.setSuccess(false);
            response_dto.setContent("An error occurred while fetching categories.");
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));
    }
}
