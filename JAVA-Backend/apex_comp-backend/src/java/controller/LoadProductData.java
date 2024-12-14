package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import entity.Brand;
import entity.Category;
import entity.Model;
import model.HibernateUtil;
import model.SetCores;
import org.hibernate.Criteria;
import org.hibernate.Session;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "LoadProductData", urlPatterns = {"/LoadProductData"})
public class LoadProductData extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.AllowMethod(req, resp, "GET");

        Response_DTO response_dto = new Response_DTO();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

        Session session = HibernateUtil.geSessionFactory().openSession();
        JsonObject jsonResponse = new JsonObject();

        try {
            // Fetch Category Names
            Criteria categoryCriteria = session.createCriteria(Category.class);
            List<Category> categories = categoryCriteria.list();
            JsonArray categoryNames = new JsonArray();
            for (Category category : categories) {
                categoryNames.add(category.getName()); // Assuming `getName()` exists in the Category entity
            }
            jsonResponse.add("categories", categoryNames);

            // Fetch Brand Names
            Criteria brandCriteria = session.createCriteria(Brand.class);
            List<Brand> brands = brandCriteria.list();
            JsonArray brandNames = new JsonArray();
            for (Brand brand : brands) {
                brandNames.add(brand.getName()); // Assuming `getName()` exists in the Brand entity
            }
            jsonResponse.add("brands", brandNames);

            // Fetch Model Names
            Criteria modelCriteria = session.createCriteria(Model.class);
            List<Model> models = modelCriteria.list();
            JsonArray modelNames = new JsonArray();
            for (Model model : models) {
                modelNames.add(model.getName()); // Assuming `getName()` exists in the Model entity
            }
            jsonResponse.add("models", modelNames);

            response_dto.setSuccess(true);
            response_dto.setContent(jsonResponse);

        } catch (Exception e) {
            e.printStackTrace();
            response_dto.setSuccess(false);
            response_dto.setContent("Failed to load product data.");
        } finally {
            session.close();
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));
    }
}
