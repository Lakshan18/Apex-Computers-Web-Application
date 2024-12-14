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
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "BasicSearchProducts", urlPatterns = {"/BasicSearchProducts"})
public class BasicSearchProducts extends HttpServlet {
    
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        SetCores.AllowMethod(req, resp, "GET");
        
        Response_DTO response_dto = new Response_DTO();
        String searchTerm = req.getParameter("query");
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
                
        try {
            
            Session session = HibernateUtil.geSessionFactory().openSession();
            Criteria criteria = session.createCriteria(Product.class);
            
            if (searchTerm != null && !searchTerm.trim().isEmpty()) {
                criteria.add(
                        Restrictions.or(
                                Restrictions.ilike("title", "%" + searchTerm + "%"),
                                Restrictions.ilike("description", "%" + searchTerm + "%")
                        )
                );
            }
            
            List<Product> productList = criteria.list();
            
            String imageBasePath = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort()
                    + req.getContextPath() + "/product-images/";
            
            List<Map<String, Object>> productDataList = new ArrayList<>();
            for (Product product : productList) {
                Map<String, Object> productData = new HashMap<>();
                productData.put("id", product.getId());
                productData.put("title", product.getTitle());
                productData.put("price", product.getPrice());
                productData.put("description", product.getDescription());
                productData.put("product_status", product.getProduct_status().getName());
                productData.put("image", imageBasePath + product.getId() + ".png");
                productDataList.add(productData);
            }
            response_dto.setSuccess(true);
            response_dto.setContent(productDataList);
            
            System.out.println(response_dto.getContent());
        } catch (Exception e) {
            e.printStackTrace();
            response_dto.setSuccess(false);
            response_dto.setContent("Error retrieving search results");
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
        
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));
    }
}
