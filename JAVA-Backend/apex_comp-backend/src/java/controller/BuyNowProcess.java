package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.User_DTO;
import entity.Address;
import entity.City;
import entity.Order_Item;
import entity.Order_Status;
import entity.Product;
import entity.User;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
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

        // Read JSON data from the request body
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

        Session session = HibernateUtil.geSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();

        // Extract data from the JSON input
        int productId = inputData.get("productId").getAsInt();
        double productPrice = inputData.get("productPrice").getAsDouble();
        int selectedQuantity = inputData.get("selectedQuantity").getAsInt();
        double totalBalance = inputData.get("totalBalance").getAsDouble();
        boolean useExistingAddress = inputData.get("useExistingAddress").getAsBoolean();

        // Handle address fields if not using existing address
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
            //user sign in...

            //get user in db..
            User_DTO user_dto = (User_DTO) httpSession.getAttribute("user");
            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", user_dto.getEmail()));
            User user = (User) criteria1.uniqueResult();

            if (useExistingAddress) {
                //get current address..

                //get address from db...
                Criteria criteria2 = session.createCriteria(Address.class);
                criteria2.add(Restrictions.eq("user", user));
                criteria2.addOrder(Order.desc("id"));
                criteria2.setMaxResults(1);

                if (criteria2.list().isEmpty()) {
                    //current address not found...
                    responseJson.addProperty("message", "Current address not found. Please create a new address");
                } else {
                    //get the current address...
                    Address address = (Address) criteria2.list().get(0);

                    //***do the checkout process
                    Product product = (Product) session.get(Product.class, productId);

                    saveOrders(session, transaction, user, address, responseJson, product, selectedQuantity,totalBalance);
                }
            } else {
                // create new address...

                Criteria criteria3 = session.createCriteria(City.class);
                criteria3.add(Restrictions.eq("id", Integer.parseInt(city)));

                if (criteria3.list().isEmpty()) {
                    responseJson.addProperty("message", "Invalid city selected");
                } else {
                    //city found....
                    City city1 = (City) criteria3.list().get(0);

                    if (addressLine1.isEmpty()) {
                        responseJson.addProperty("message", "Please fill address line 1");
                    } else if (addressLine2.isEmpty()) {
                        responseJson.addProperty("message", "Please fill address line 2");
                    } else if (mobile.isEmpty()) {
                        responseJson.addProperty("message", "Please fill mobile number");
                    } else if (!Validations.isMobileNumberValid(mobile)) {
                        responseJson.addProperty("message", "Invalid mobile number");
                    } else if (postalCode.isEmpty()) {
                        responseJson.addProperty("message", "Please fill postal code");
                    } else if (!Validations.isInteger(postalCode)) {
                        responseJson.addProperty("message", "Invalid postal code");
                    } else {
                        //Create new Address..

                        Address address = new Address();
                        address.setLine1(addressLine1);
                        address.setLine2(addressLine2);
                        address.setMobile(mobile);
                        address.setPostal(postalCode);
                        address.setCity(city1);
                        address.setUser(user);

                        session.save(address);

                        //***complete the checkout process
                    }
                }

            }
        } else {
            //user not sign in...
            responseJson.addProperty("message", "User not signed in");
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseJson));

//            // Perform your business logic (e.g., saving to database, processing order)
//            // This is just a placeholder
//            System.out.println("Product ID: " + productId);
//            System.out.println("Product Price: " + productPrice);
//            System.out.println("Selected Quantity: " + selectedQuantity);
//            System.out.println("Total Balance: " + totalBalance);
//            System.out.println("Use Existing Address: " + useExistingAddress);
//
//            if (!useExistingAddress) {
//                System.out.println("Address Line 1: " + addressLine1);
//                System.out.println("Address Line 2: " + addressLine2);
//                System.out.println("Mobile: " + mobile);
//                System.out.println("City: " + city);
//                System.out.println("Postal Code: " + postalCode);
//            }
//
//            // Respond with success
//            responseJson.addProperty("success", true);
//            responseJson.addProperty("message", "Order processed successfully.");
        // Write JSON response
    }

    private void saveOrders(Session session, Transaction transaction, User user, Address address, JsonObject responseJson, Product product, Integer selectQty,Double totalBalance) {
        try {
            //create order in DB...

            entity.Orders orders = new entity.Orders();
            orders.setAddress(address);
            orders.setDate_time(new Date());
            orders.setUser(user);
            int order_id = (int) session.save(user);

            Order_Status order_status = (Order_Status) session.get(Order_Status.class, 1);

            //create order-item in DB...
            Order_Item order_item = new Order_Item();
            order_item.setOrder(orders);
            order_item.setOrder_status(order_status);
            order_item.setProduct(product);
            order_item.setQuantity(selectQty);
            
            session.save(order_item);

            //update product quantity..
            product.setQuatity(product.getQuatity() - selectQty);
            session.update(product);

            transaction.commit();
            
            //set payment data (start)
            String merchant_id = "1221485";
            String formatted_amount = new DecimalFormat("0.00").format(totalBalance);
            String currency = "LKR";
            String merchantSecret = "Nzg1NDI5NjAwMzA1OTUxNjEzMDMxNTQyODM1NzYzODE0MDcwNzE="; //**
            String merchantSecretMdHash = Payhere.generateMD5(merchantSecret);

            JsonObject payhere = new JsonObject();
            payhere.addProperty("merchant_id", merchant_id);

            payhere.addProperty("return_url", "");
            payhere.addProperty("cancel_url", "");
            payhere.addProperty("notify_url", ""); //***

            payhere.addProperty("first_name", user.getFirst_name());
            payhere.addProperty("last_name", user.getLast_name());
            payhere.addProperty("email", user.getEmail());

            payhere.addProperty("phone", "");
            payhere.addProperty("address", "");
            payhere.addProperty("city", "");
            payhere.addProperty("country", "");

            payhere.addProperty("order_id", String.valueOf(order_id));
            payhere.addProperty("items", product.getTitle());
            payhere.addProperty("currency", "LKR");
            payhere.addProperty("amount", formatted_amount);
            payhere.addProperty("sandbox", true);

            //Generate MD5 Hash
            //merahantID + orderID + amountFormatted + currency + getMd5(merchantSecret)
            String md5Hash = Payhere.generateMD5(merchant_id + order_id + formatted_amount + currency + merchantSecretMdHash);
            payhere.addProperty("hash", md5Hash);

            //set payment data (end)
            responseJson.addProperty("success", true);
            responseJson.addProperty("message", "Checkout completed");

            Gson gson = new Gson();
            responseJson.add("payhereJson", gson.toJsonTree(payhere));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
