package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.Response_DTO;
import entity.Product;
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
import org.hibernate.criterion.Order;

@WebServlet(name = "Load_AllProducts", urlPatterns = {"/Load_AllProducts"})
public class Load_AllProducts extends HttpServlet {

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

            Criteria criteria = session.createCriteria(Product.class);
            criteria.addOrder(Order.desc("date_time"));
            List<Product> productsList = criteria.list();

            List<Map<String, Object>> productDataList = new ArrayList<>();

            String imageBasePath = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort()
                    + req.getContextPath() + "/product-images/";

            for (Product product : productsList) {
                Map<String, Object> productMap = new HashMap<>();
                productMap.put("id", product.getId());
                productMap.put("title", product.getTitle());
                productMap.put("price", product.getPrice());
                productMap.put("description", product.getDescription());
                productMap.put("quantity", product.getQuatity());
                productMap.put("date_time", product.getDate_time().toString());

                productMap.put("brand", product.getBrand() != null ? product.getBrand().getName() : null);
                productMap.put("model", product.getModel() != null ? product.getModel().getName() : null);
                productMap.put("color", product.getColor() != null ? product.getColor().getId() : null);
                productMap.put("product_condition", product.getProduct_condition() != null ? product.getProduct_condition().getName() : null);
                productMap.put("product_status", product.getProduct_status() != null ? product.getProduct_status().getName() : null);
//                productMap.put("user", product.getUser() != null ? product.getUser().getEmail() : null);
                productMap.put("image", imageBasePath + product.getId() + ".png");

                productDataList.add(productMap);
            }

            response_dto.setSuccess(true);
            response_dto.setContent(productDataList);

            transaction.commit();

            session.close();
            
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
            response_dto.setSuccess(false);
            response_dto.setContent("Error retrieving products");
        }
        
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));
    }
}
