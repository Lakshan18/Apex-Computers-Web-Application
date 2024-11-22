package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.ResponseDTO;
import dto.User_DTO;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
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

@WebServlet(name = "Verify_Account", urlPatterns = {"/Verify_Account"})
public class Verify_Account extends HttpServlet {
    
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.setHeaders(req, resp);
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        SetCores.AllowMethod(req, resp, "POST");
        
        ResponseDTO respDto = new ResponseDTO();
        
        Gson gson = new Gson();
        JsonObject jsonObj = gson.fromJson(req.getReader(), JsonObject.class);
        String verification = jsonObj.get("v_code").getAsString();
        
        if (req.getSession().getAttribute("email") != null) {
            
            String email = req.getSession().getAttribute("email").toString();
            
            Session session = HibernateUtil.getSessionFactory().openSession();
            
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", email));
            criteria.add(Restrictions.eq("v_code", verification));
            
            if (!criteria.list().isEmpty()) {
                
                User user = (User) criteria.uniqueResult();
                user.setVerification("verified");
                
                User_DTO userDto = new User_DTO();
                userDto.setFname(user.getFname());
                userDto.setLname(user.getLname());
                userDto.setEmail(user.getEmail());
                
                req.getSession().removeAttribute("email");
                req.getSession().setAttribute("user", userDto);
                
                respDto.setSuccess(true);
                respDto.setContent("Verification Success..!!");
            } else {
                respDto.setContent("Invalid Verification code. check again..!!");
            }
            
        } else {
            respDto.setContent("Please go to Sign in.");
        }
        
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(respDto));
    }
    
}
