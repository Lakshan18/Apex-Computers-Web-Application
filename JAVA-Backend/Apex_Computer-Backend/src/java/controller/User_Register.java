package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.Response_DTO;
import dto.User_DTO;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.Mail;
import model.SetCores;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "User_Register", urlPatterns = {"/User_Register"})
public class User_Register extends HttpServlet {
    
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.setHeaders(req, resp);
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        SetCores.AllowMethod(req, resp, "POST");
        
        Response_DTO response_dto = new Response_DTO();
        
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        final User_DTO user_dto = gson.fromJson(req.getReader(), User_DTO.class);
        
        if (user_dto.getFirst_name().isEmpty()) {
            response_dto.setContent("Please Enter Your First Name.!!");
        } else if (user_dto.getLast_name().isEmpty()) {
            response_dto.setContent("Please Enter your Last Name.!!");
        } else if (user_dto.getEmail().isEmpty()) {
            response_dto.setContent("Please Enter your Email Address.!!");
        } else if (!Validations.isEmailValid(user_dto.getEmail())) {
            response_dto.setContent("Please Enter Valid Email Address.!!");
        } else if (user_dto.getPassword().isEmpty()) {
            response_dto.setContent("Please Enter Your Password.!!");
        } else if (!Validations.isPasswordValid(user_dto.getPassword())) {
            response_dto.setContent("Password must include at least one uppercase letter, "
                    + "number, special character, and not less than 8 characters");
        } else if (user_dto.getConf_password().isEmpty()) {
            response_dto.setContent("Please enter your password again.!!");
        } else if (!user_dto.getPassword().equals(user_dto.getConf_password())) {
            response_dto.setContent("Passwords are not matched.! Please check you password.");
        } else {
            
            Session session = HibernateUtil.geSessionFactory().openSession();
            
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", user_dto.getEmail()));
            
            if (!criteria.list().isEmpty()) {
                response_dto.setContent("Email already Exists.!!");
            } else {
                Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String formatDate = formatter.format(date);
                
                int vCode = (int) (Math.random() * 100000);
                
                final User user = new User();
                user.setFirst_name(user_dto.getFirst_name());
                user.setLast_name(user_dto.getLast_name());
                user.setEmail(user_dto.getEmail());
                user.setPassword(user_dto.getPassword());
                user.setRegistration_date(formatDate);
                user.setVerification(String.valueOf(vCode));

                //  send to verification code to user's email.......
                Thread sendUserEmailThread = new Thread() {
                    @Override
                    public void run() {
                        Mail.sendMail(
                                user_dto.getEmail(),
                                "Apex Computers Email Verification",
                                "<h2>Verification Code : " + user.getVerification() + "</h2>"
                        );
                    }
                };
                
                sendUserEmailThread.start();
                session.save(user);
                session.beginTransaction().commit();
                
                req.getSession().setAttribute("email", user_dto.getEmail());
                response_dto.setSuccess(true);
                response_dto.setContent("Registration Success.!! Please check your email for verify..");
            }
            
            session.close();
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));
    }
    
}
