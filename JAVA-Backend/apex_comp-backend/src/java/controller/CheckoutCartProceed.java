import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import dto.User_DTO;
import entity.Address;
import entity.Cart;
import entity.City;
import entity.Order_Item;
import entity.Order_Status;
import entity.Orders;
import entity.Product;
import entity.User;
import java.io.BufferedReader;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import model.Payhere;
import model.SetCores;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "CheckoutCartProceed", urlPatterns = {"/CheckoutCartProceed"})
public class CheckoutCartProceed extends HttpServlet {

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
        Response_DTO responseDTO = new Response_DTO();
        JsonObject responseJsonObject = new JsonObject();
        JsonObject inputData = gson.fromJson(jsonInput.toString(), JsonObject.class);

        HttpSession httpSession = req.getSession();
        Session session = HibernateUtil.geSessionFactory().openSession();

        Transaction transaction = null;

        try {
            transaction = session.beginTransaction();

            boolean useExistingAddress = inputData.get("useExistingAddress").getAsBoolean();
            User_DTO userDTO = (User_DTO) httpSession.getAttribute("user");

            if (userDTO == null) {
                responseJsonObject.addProperty("message", "User is not logged in.");
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                resp.getWriter().write(responseJsonObject.toString());
                return;
            }

            Criteria userCriteria = session.createCriteria(User.class);
            userCriteria.add(Restrictions.eq("email", userDTO.getEmail()));
            User user = (User) userCriteria.uniqueResult();

            if (user == null) {
                responseJsonObject.addProperty("message", "User not found in the database.");
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write(responseJsonObject.toString());
                return;
            }

            Address address;
            if (!useExistingAddress) {
                JsonObject addressData = inputData.getAsJsonObject("address");

                String addressLine1 = addressData.get("line1").getAsString();
                String addressLine2 = addressData.get("line2").getAsString();
                String mobile = addressData.get("mobile").getAsString();
                String postalCode = addressData.get("postalCode").getAsString();
                int cityId = addressData.get("city").getAsInt();

                City city = (City) session.get(City.class, cityId);
                if (city == null) {
                    responseJsonObject.addProperty("message", "Invalid city ID provided.");
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write(responseJsonObject.toString());
                    return;
                }

                address = new Address();
                address.setLine1(addressLine1);
                address.setLine2(addressLine2);
                address.setMobile(mobile);
                address.setPostal(postalCode);
                address.setCity(city);
                address.setUser(user);

                session.save(address);

            } else {
                Criteria addressCriteria = session.createCriteria(Address.class);
                addressCriteria.add(Restrictions.eq("user", user));
                addressCriteria.addOrder(Order.desc("id"));
                addressCriteria.setMaxResults(1);

                address = (Address) addressCriteria.uniqueResult();
                if (address == null) {
                    responseJsonObject.addProperty("message", "No existing address found. Please provide a new address.");
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write(responseJsonObject.toString());
                    return;
                }
            }

            Criteria cartCriteria = session.createCriteria(Cart.class);
            cartCriteria.add(Restrictions.eq("user", user));
            List<Cart> cartList = cartCriteria.list();

            if (cartList.isEmpty()) {
                responseJsonObject.addProperty("message", "Cart is empty.");
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(responseJsonObject.toString());
                return;
            }

            double totalPriceFromFrontend = inputData.get("totalPrice").getAsDouble();
            System.out.println("Total Price from Frontend: " + totalPriceFromFrontend);

            JsonArray productDetails = inputData.getAsJsonArray("productDetails");

            Orders order = new Orders();
            order.setUser(user);
            order.setAddress(address);
            order.setDate_time(new Date());

            session.save(order);

            StringBuilder itemsDetails = new StringBuilder(); 

            for (JsonElement productDetail : productDetails) {
                JsonObject product = productDetail.getAsJsonObject();
                int productId = product.get("productId").getAsInt();
                int quantity = product.get("quantity").getAsInt();

                Product productEntity = (Product) session.get(Product.class, productId);
                if (productEntity == null) {
                    responseJsonObject.addProperty("message", "Product not found in the database.");
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write(responseJsonObject.toString());
                    return;
                }

                double productTotal = productEntity.getPrice() * quantity;

                Order_Item orderItem = new Order_Item();
                orderItem.setQuantity(quantity);
                orderItem.setTotal(productTotal);
                orderItem.setOrder(order);
                orderItem.setProduct(productEntity);

                Criteria statusCriteria = session.createCriteria(Order_Status.class);
                statusCriteria.add(Restrictions.eq("name", "Pending"));
                Order_Status orderStatus = (Order_Status) statusCriteria.uniqueResult();
                if (orderStatus != null) {
                    orderItem.setOrder_status(orderStatus);
                }

                session.save(orderItem);

                String productTitle = productEntity.getTitle();
                itemsDetails.append(productTitle).append(" x").append(quantity).append(", ");
            }

            if (itemsDetails.length() > 0) {
                itemsDetails.setLength(itemsDetails.length() - 2);
            }

            for (Cart cartItem : cartList) {
                session.delete(cartItem); 
            }

            transaction.commit();

            String merchant_id = "1221485";
            String formatted_amount = new DecimalFormat("0.00").format(totalPriceFromFrontend);
            String currency = "LKR";
            String merchantSecret = "Nzg1NDI5NjAwMzA1OTUxNjEzMDMxNTQyODM1NzYzODE0MDcwNzE=";
            String merchantSecretMdHash = Payhere.generateMD5(merchantSecret);

            JsonObject payhere = new JsonObject();
            payhere.addProperty("merchant_id", merchant_id);
            payhere.addProperty("return_url", "https://yourwebsite.com/return");
            payhere.addProperty("cancel_url", "https://yourwebsite.com/cancel");
            payhere.addProperty("notify_url", "https://yourwebsite.com/notify");
            payhere.addProperty("first_name", user.getFirst_name());
            payhere.addProperty("last_name", user.getLast_name());
            payhere.addProperty("email", user.getEmail());
            payhere.addProperty("order_id", String.valueOf(order.getId()));
            payhere.addProperty("delivery_ads", address.getLine1() + "/" + address.getLine2());
            payhere.addProperty("items", itemsDetails.toString()); // Added items with product titles and quantities
            payhere.addProperty("currency", currency);
            payhere.addProperty("amount", formatted_amount);
            payhere.addProperty("sandbox", true);

            String md5Hash = Payhere.generateMD5(merchant_id + order.getId() + formatted_amount + currency + merchantSecretMdHash);
            payhere.addProperty("hash", md5Hash);

            responseJsonObject.add("payhere", payhere);
            resp.getWriter().write(responseJsonObject.toString());

        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
            responseJsonObject.addProperty("message", "An error occurred during the checkout process.");
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write(responseJsonObject.toString());
        } finally {
            session.close();
        }
    }
}
