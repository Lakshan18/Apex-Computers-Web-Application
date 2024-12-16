//package controller;
//
//import com.google.gson.Gson;
//import dto.Response_DTO;
//import entity.Address;
//import entity.City;
//import entity.User;
//import org.hibernate.Session;
//import org.hibernate.Transaction;
//import util.HibernateUtil;
//import model.SetCores;
//
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpServletRequest;
//import java.io.IOException;
//import java.io.PrintWriter;
//import model.HibernateUtil;
//
//@WebServlet(name = "EditProfile", urlPatterns = {"/EditProfile"})
//public class EditProfile extends HttpServlet {
//
//    @Override
//    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        SetCores.handlePreflight(req, resp);
//    }
//
//    @Override
//    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        SetCores.AllowMethod(req, resp, "POST");
//        resp.setContentType("application/json");
//
//        PrintWriter out = resp.getWriter();
//        Gson gson = new Gson();
//        Response_DTO response_DTO = new Response_DTO();
//
//        try {
//            // Parse user ID and validate
//            String userIdParam = req.getParameter("userId");
//            if (userIdParam == null || userIdParam.isEmpty()) {
//                response_DTO.setSuccess(false);
//                response_DTO.setContent("User ID is required.");
//                out.print(gson.toJson(response_DTO));
//                return;
//            }
//
//            int userId = Integer.parseInt(userIdParam);
//
//            // Start Hibernate session
//            Session session = HibernateUtil.geSessionFactory().openSession();
//            Transaction transaction = session.beginTransaction();
//
//            // Fetch the existing user by ID
//            User existingUser = (User) session.get(User.class, userId);
//            if (existingUser == null) {
//                response_DTO.setSuccess(false);
//                response_DTO.setContent("User not found.");
//                out.print(gson.toJson(response_DTO));
//                return;
//            }
//
//            // Update user fields (if provided)
//            String firstName = req.getParameter("first_name");
//            String lastName = req.getParameter("last_name");
//            String username = req.getParameter("username");
//
//            if (firstName != null) existingUser.setFirst_name(firstName);
//            if (lastName != null) existingUser.setLast_name(lastName);
//            if (username != null) existingUser.setUsername(username);
//
//            // Fetch or create the user's address
//            Address userAddress = (Address) session.createQuery("FROM Address WHERE user.id = :userId")
//                    .setParameter("userId", userId)
//                    .uniqueResult();
//
//            if (userAddress == null) {
//                userAddress = new Address();
//                userAddress.setUser(existingUser);
//            }
//
//            // Update address fields (if provided)
//            String line1 = req.getParameter("line1");
//            String line2 = req.getParameter("line2");
//            String mobile = req.getParameter("mobile");
//            String postalC = req.getParameter("postalC");
//            String cityIdParam = req.getParameter("cityId");
//
//            if (line1 != null) userAddress.setLine1(line1);
//            if (line2 != null) userAddress.setLine2(line2);
//            if (mobile != null) userAddress.setMobile(mobile);
//            if (postalC != null) userAddress.setPostal(postalC);
//
//            // Update city if cityId is provided
//            if (cityIdParam != null && !cityIdParam.isEmpty()) {
//                try {
//                    int cityId = Integer.parseInt(cityIdParam);
//                    City city = (City) session.get(City.class, cityId);
//                    if (city != null) {
//                        userAddress.setCity(city);
//                    } else {
//                        response_DTO.setSuccess(false);
//                        response_DTO.setContent("Invalid city ID.");
//                        out.print(gson.toJson(response_DTO));
//                        return;
//                    }
//                } catch (NumberFormatException e) {
//                    response_DTO.setSuccess(false);
//                    response_DTO.setContent("City ID must be a valid number.");
//                    out.print(gson.toJson(response_DTO));
//                    return;
//                }
//            }
//
//            // Save or update entities
//            session.saveOrUpdate(existingUser);
//            session.saveOrUpdate(userAddress);
//
//            transaction.commit();
//            session.close();
//
//            // Success response
//            response_DTO.setSuccess(true);
//            response_DTO.setContent("Profile updated successfully.");
//            out.print(gson.toJson(response_DTO));
//        } catch (Exception e) {
//            e.printStackTrace();
//            response_DTO.setSuccess(false);
//            response_DTO.setContent("An error occurred while updating the profile.");
//            out.print(gson.toJson(response_DTO));
//        }
//    }
//}
