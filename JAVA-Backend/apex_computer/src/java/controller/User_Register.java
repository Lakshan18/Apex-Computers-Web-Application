package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
import dto.ResponseDTO;
import dto.User_DTO;
import entity.User;
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

        ResponseDTO respDto = new ResponseDTO();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        final User_DTO userDto = gson.fromJson(req.getReader(), User_DTO.class);

        if (userDto.getFname().isEmpty()) {
            respDto.setContent("Please Enter Your First Name.!!");
        } else if (userDto.getLname().isEmpty()) {
            respDto.setContent("Please Enter your Last Name.!!");
        } else if (userDto.getEmail().isEmpty()) {
            respDto.setContent("Please Enter Your Email.!!");
        } else if (!Validations.isEmailValid(userDto.getEmail())) {
            respDto.setContent("Please Enter Valid Email.!!");
        } else if (userDto.getPassword().isEmpty()) {
            respDto.setContent("Please Enter Your Password.!!");
        } else if (!Validations.isPasswordValid(userDto.getPassword())) {
            respDto.setContent("Password must include at least one uppercase letter, "
                    + "number, special character, and not less than 8 characters");
        } else if (userDto.getConf_password().isEmpty()) {
            respDto.setContent("Please enter your password again.!!");
        } else if (!userDto.getPassword().equals(userDto.getConf_password())) {
            respDto.setContent("Passwords are not matched.! Please check you password.");
        } else {
  
            Session session = HibernateUtil.getSessionFactory().openSession();

            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", userDto.getEmail()));

            if (!criteria.list().isEmpty()) {
                respDto.setContent("Email already Exists.!!");
            } else {
                Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String formatDate = formatter.format(date);

                int vCode = (int) (Math.random() * 100000);

                final User user = new User();
                user.setFname(userDto.getFname());
                user.setLname(userDto.getLname());
                user.setEmail(userDto.getEmail());
                user.setPassword(userDto.getPassword());
                user.setDate(formatDate);
                user.setVerification(String.valueOf(vCode));

                
//                send to verification code to user's email.......

                Thread sendUserEmailThread = new Thread() {
                    @Override
                    public void run() {
                        Mail.sendMail(
                                userDto.getEmail(),
                                "Apex Computers Email Verification",
                                "<h2>Verification Code : " + user.getVerification() + "</h2>"
                        );
                    }
                };
                sendUserEmailThread.start();
                session.save(user);
                session.beginTransaction().commit();

                req.getSession().setAttribute("email", userDto.getEmail());
                
            respDto.setSuccess(true);
            respDto.setContent("Registration Success.!! Please check your email for verify..");
        }

            
            session.close();
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(respDto));
    }

}
