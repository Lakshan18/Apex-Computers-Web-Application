package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import entity.Brand;
import entity.Category;
import entity.Color;
import entity.Model;
import entity.Product;
import model.HibernateUtil;
import model.SetCores;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;

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
            // Fetch Category Data
            Criteria categoryCriteria = session.createCriteria(Category.class);
            List<Category> categories = categoryCriteria.list();
            JsonArray categoryArray = new JsonArray();
            for (Category category : categories) {
                JsonObject categoryObj = new JsonObject();
                categoryObj.addProperty("catId", category.getId());
                categoryObj.addProperty("catName", category.getName());
                categoryArray.add(categoryObj);
            }
            jsonResponse.add("categories", categoryArray);

            // Fetch Brand Data
            Criteria brandCriteria = session.createCriteria(Brand.class);
            List<Brand> brands = brandCriteria.list();
            JsonArray brandArray = new JsonArray();
            for (Brand brand : brands) {
                JsonObject brandObj = new JsonObject();
                brandObj.addProperty("brdId", brand.getId());
                brandObj.addProperty("brdName", brand.getName());
                brandArray.add(brandObj);
            }
            jsonResponse.add("brands", brandArray);

            // Fetch Model Data
            Criteria modelCriteria = session.createCriteria(Model.class);
            List<Model> models = modelCriteria.list();
            JsonArray modelArray = new JsonArray();
            for (Model model : models) {
                JsonObject modelObj = new JsonObject();
                modelObj.addProperty("modId", model.getId());
                modelObj.addProperty("modName", model.getName());
                modelArray.add(modelObj);
            }
            jsonResponse.add("models", modelArray);

            // Fetch Color Data
            Criteria colorCriteria = session.createCriteria(Color.class);
            List<Color> colors = colorCriteria.list();
            JsonArray colorArray = new JsonArray();
            for (Color color : colors) {
                JsonObject colorObj = new JsonObject();
                colorObj.addProperty("colId", color.getId());
                colorObj.addProperty("colName", color.getName());
                colorArray.add(colorObj);
            }
            jsonResponse.add("colors", colorArray);

            // Fetch Next Product ID
            Criteria productCriteria = session.createCriteria(Product.class);
            productCriteria.addOrder(Order.desc("id"));
            productCriteria.setMaxResults(1);
            Product latestProduct = (Product) productCriteria.uniqueResult();
            int nextPid = (latestProduct != null) ? latestProduct.getId() + 1 : 1; 
            jsonResponse.addProperty("pid", nextPid);

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
