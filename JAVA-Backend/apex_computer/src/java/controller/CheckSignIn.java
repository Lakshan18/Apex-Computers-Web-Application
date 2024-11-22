package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dto.ResponseDTO;
import dto.User_DTO;
import entity.Product;
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
import org.hibernate.criterion.Order;

@WebServlet(name = "CheckSignIn", urlPatterns = {"/CheckSignIn"})
public class CheckSignIn extends HttpServlet {
    
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.setHeaders(req, resp);
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        SetCores.AllowMethod(req, resp, "GET");
        
        JsonObject jsonObj = new JsonObject();
        
        ResponseDTO respDto = new ResponseDTO();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        
        Session session = HibernateUtil.getSessionFactory().openSession();
        
        if (req.getSession().getAttribute("user") != null) {
            
            User_DTO userDto = (User_DTO) req.getSession().getAttribute("user");
            respDto.setSuccess(true);
            respDto.setContent(userDto);
        }
        
        jsonObj.add("respDTO", gson.toJsonTree(respDto));

        //latest 4 products to show
        Criteria criteria = session.createCriteria(Product.class);
        criteria.addOrder(Order.desc("id"));
        criteria.setMaxResults(4);
        List<Product> productList = criteria.list();
        
        for (Product product : productList) {
            product.setUser(null);
        }
        
        Gson gson1 = new Gson();
        jsonObj.add("products", gson1.toJsonTree(productList));
        
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObj));
    }
    
}
