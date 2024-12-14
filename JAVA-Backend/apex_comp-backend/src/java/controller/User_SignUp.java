package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.Response_DTO;
import dto.User_DTO;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import model.Mail;
import model.SetCores;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "User_SignUp", urlPatterns = {"/User_SignUp"})
public class User_SignUp extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.AllowMethod(req, resp, "POST");

        Response_DTO response_DTO = new Response_DTO();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

        try {
            final User_DTO user_DTO = gson.fromJson(req.getReader(), User_DTO.class);

            if (user_DTO.getFirst_name().isEmpty()) {
                response_DTO.setContent("Please enter your First Name");
            } else if (user_DTO.getLast_name().isEmpty()) {
                response_DTO.setContent("Please enter your Last Name");
            } else if (user_DTO.getEmail().isEmpty()) {
                response_DTO.setContent("Please enter your Email");
            } else if (!Validations.isEmailValid(user_DTO.getEmail())) {
                response_DTO.setContent("Please enter a valid Email");
            } else if (user_DTO.getPassword().isEmpty()) {
                response_DTO.setContent("Please create a Password");
            } else if (!Validations.isPasswordValid(user_DTO.getPassword())) {
                response_DTO.setContent("Password must include at least one uppercase letter, "
                        + "number, special character, and not less than 8 characters");
            } else if (user_DTO.getConf_password().isEmpty()) {
                response_DTO.setContent("Please enter your password again.");
            } else if (!user_DTO.getConf_password().equals(user_DTO.getPassword())) {
                response_DTO.setContent("Passwords do not match. Please check again.");
            } else {
                Session session = HibernateUtil.geSessionFactory().openSession();
                Criteria criteria = session.createCriteria(User.class);
                criteria.add(Restrictions.eq("email", user_DTO.getEmail()));

                if (!criteria.list().isEmpty()) {
                    response_DTO.setContent("Email already exists");
                } else {
                    int code = (int) (Math.random() * 100000);

                    final User user = new User();
                    user.setEmail(user_DTO.getEmail());
                    user.setFirst_name(user_DTO.getFirst_name());
                    user.setLast_name(user_DTO.getLast_name());
                    user.setPassword(user_DTO.getPassword());
                    user.setRegistration_date(new Date());
                    user.setVerification(String.valueOf(code));

                    session.beginTransaction();
                    session.save(user);
                    session.getTransaction().commit();

                    HttpSession httpSession = req.getSession();
                    System.out.println("Session ID: " + httpSession.getId());
                    httpSession.setAttribute("email", user_DTO.getEmail());
                    System.out.println("Email set in session: " + httpSession.getAttribute("email"));

                    Thread sendMailThread = new Thread(() -> {
                        Mail.sendMail(
                                user_DTO.getEmail(),
                                "Apex Computers Email Verification",
                                "<h1>Verification Code: " + user.getVerification() + "</h1>"
                        );
                    });
                    sendMailThread.start();

                    response_DTO.setSuccess(true);
                    response_DTO.setContent("Registration complete. Please check your inbox for the verification code.");
                }
                session.close();
            }
        } catch (Exception e) {
            response_DTO.setContent("An error occurred: " + e.getMessage());
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_DTO));
    }
}
