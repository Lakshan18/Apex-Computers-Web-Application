package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.User_DTO;
import entity.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import model.Payhere;
import model.SetCores;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "BuyNowProcess", urlPatterns = {"/BuyNowProcess"})
public class BuyNowProcess extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.AllowMethod(req, resp, "POST");

        StringBuilder jsonInput = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonInput.append(line);
            }
        }

        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        JsonObject inputData = gson.fromJson(jsonInput.toString(), JsonObject.class);
        HttpSession httpSession = req.getSession();
        Session session =   HibernateUtil.geSessionFactory().openSession();
        try {
            Transaction transaction = session.beginTransaction();

            int productId = inputData.get("productId").getAsInt();
            double totalBalance = inputData.get("totalBalance").getAsDouble();
            int selectedQuantity = inputData.get("selectedQuantity").getAsInt();
            boolean useExistingAddress = inputData.get("useExistingAddress").getAsBoolean();

            String addressLine1 = null;
            String addressLine2 = null;
            String mobile = null;
            String city = null;
            String postalCode = null;

            if (!useExistingAddress) {
                JsonObject address = inputData.getAsJsonObject("address");
                addressLine1 = address.get("line1").getAsString();
                addressLine2 = address.get("line2").getAsString();
                mobile = address.get("mobile").getAsString();
                city = address.get("city").getAsString();
                postalCode = address.get("postalCode").getAsString();
            }

            if (httpSession.getAttribute("user") != null) {
                User_DTO user_dto = (User_DTO) httpSession.getAttribute("user");
                Criteria criteria1 = session.createCriteria(User.class);
                criteria1.add(Restrictions.eq("email", user_dto.getEmail()));
                User user = (User) criteria1.uniqueResult();

                if (user == null) {
                    responseJson.addProperty("message", "User not found in the database");
                } else if (useExistingAddress) {
                    Criteria criteria2 = session.createCriteria(Address.class);
                    criteria2.add(Restrictions.eq("user", user));
                    criteria2.addOrder(Order.desc("id"));
                    criteria2.setMaxResults(1);

                    Address address = (Address) criteria2.uniqueResult();
                    if (address == null) {
                        responseJson.addProperty("message", "Current address not found. Please create a new address");
                    } else {
                        Product product = (Product) session.get(Product.class, productId);
                        saveOrders(session, transaction, user, address, responseJson, product, selectedQuantity, totalBalance);
                    }
                } else {
                    Criteria criteria3 = session.createCriteria(City.class);
                    criteria3.add(Restrictions.eq("id", Integer.parseInt(city)));

                    City city1 = (City) criteria3.uniqueResult();
                    if (city1 == null) {
                        responseJson.addProperty("message", "Invalid city selected");
                    } else if (addressLine1.isEmpty() || addressLine2.isEmpty() || mobile.isEmpty() || postalCode.isEmpty() || !Validations.isMobileNumberValid(mobile) || !Validations.isInteger(postalCode)) {
                        responseJson.addProperty("message", "Invalid address or contact information");
                    } else {
                        Address address = new Address();
                        address.setLine1(addressLine1);
                        address.setLine2(addressLine2);
                        address.setMobile(mobile);
                        address.setPostal(postalCode);
                        address.setCity(city1);
                        address.setUser(user);

                        session.save(address);

                        Product product = (Product) session.get(Product.class, productId);
                        saveOrders(session, transaction, user, address, responseJson, product, selectedQuantity, totalBalance);
                    }
                }
            } else {
                responseJson.addProperty("message", "User not signed in");
            }
        } catch (Exception e) {
            e.printStackTrace();
            responseJson.addProperty("message", "An error occurred: " + e.getMessage());
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseJson));
    }

    private void saveOrders(Session session, Transaction transaction, User user, Address address, JsonObject responseJson, Product product, Integer selectQty, Double totalBalance) {
        try {
            Orders orders = new Orders();
            orders.setAddress(address);
            orders.setDate_time(new Date());
            orders.setUser(user);
            int order_id = (int) session.save(orders);

            Order_Status order_status = (Order_Status) session.get(Order_Status.class, 1);

            Order_Item order_item = new Order_Item();
            order_item.setOrder(orders);
            order_item.setOrder_status(order_status);
            order_item.setProduct(product);
            order_item.setQuantity(selectQty);
            order_item.setTotal(totalBalance);

            session.save(order_item);

            product.setQuatity(product.getQuatity() - selectQty);
            session.update(product);

            transaction.commit();

            String merchant_id = "1221485";
            String formatted_amount = new DecimalFormat("0.00").format(totalBalance);
            String currency = "LKR";
            String merchantSecret = "Nzg1NDI5NjAwMzA1OTUxNjEzMDMxNTQyODM1NzYzODE0MDcwNzE=";
            String merchantSecretMdHash = Payhere.generateMD5(merchantSecret);

            JsonObject payhere = new JsonObject();
            payhere.addProperty("merchant_id", merchant_id);
            payhere.addProperty("return_url", "");
            payhere.addProperty("cancel_url", "");
            payhere.addProperty("notify_url", "");
            payhere.addProperty("first_name", user.getFirst_name());
            payhere.addProperty("last_name", user.getLast_name());
            payhere.addProperty("email", user.getEmail());
            payhere.addProperty("order_id", String.valueOf(order_id));
            payhere.addProperty("delivery_ads", address.getLine1()+"/"+address.getLine2());
            payhere.addProperty("items", product.getTitle());
            payhere.addProperty("currency", currency);
            payhere.addProperty("amount", formatted_amount);
            payhere.addProperty("sandbox", true);

            String md5Hash = Payhere.generateMD5(merchant_id + order_id + formatted_amount + currency + merchantSecretMdHash);
            payhere.addProperty("hash", md5Hash);

            responseJson.addProperty("success", true);
            responseJson.addProperty("message", "Checkout completed");
            responseJson.add("payhereJson", new Gson().toJsonTree(payhere));
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
            responseJson.addProperty("success", false);
            responseJson.addProperty("message", "An error occurred while processing the order: " + e.getMessage());
        }
    }
}
