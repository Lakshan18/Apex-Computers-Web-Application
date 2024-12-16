package controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import entity.Order_Item;
import entity.Orders;
import model.HibernateUtil;
import model.SetCores;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.hibernate.criterion.Order;

@WebServlet(name = "FetchOrderHistory", urlPatterns = {"/FetchOrderHistory"})
public class FetchOrderHistory extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Handle CORS preflight requests
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "GET");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // Parse user ID from the request
        int userId;
        try {
            userId = Integer.parseInt(req.getParameter("uid"));
        } catch (NumberFormatException e) {
            resp.getWriter().write(new Gson().toJson(errorResponse("Invalid user ID.")));
            return;
        }

        JsonObject responseJson = new JsonObject();
        JsonArray ordersArray = new JsonArray();

        try {
            Session session = HibernateUtil.geSessionFactory().openSession();

            Criteria orderCriteria = session.createCriteria(Orders.class);
            orderCriteria.createAlias("user", "u");
            orderCriteria.add(Restrictions.eq("u.id", userId));
            orderCriteria.addOrder(Order.desc("date_time"));

            List<Orders> orders = orderCriteria.list();

            for (Orders order : orders) {
                JsonObject orderJson = new JsonObject();
                orderJson.addProperty("orderId", order.getId());
                orderJson.addProperty("dateTime", order.getDate_time().toString());

                // Fetch associated order items
                Criteria itemCriteria = session.createCriteria(Order_Item.class);
                itemCriteria.createAlias("order", "o");
                itemCriteria.add(Restrictions.eq("o.id", order.getId()));

                List<Order_Item> orderItems = itemCriteria.list();

                if (!orderItems.isEmpty()) {
                    Order_Item firstItem = orderItems.get(0);
                    orderJson.addProperty("total", firstItem.getTotal());
                    orderJson.addProperty("orderStatus", firstItem.getOrder_status().getName());
                } else {
                    orderJson.addProperty("total", 0.0);
                    orderJson.addProperty("orderStatus", "N/A");
                }

                ordersArray.add(orderJson);
            }

            responseJson.addProperty("success", true);
            responseJson.add("orders", ordersArray);
        } catch (Exception e) {
            e.printStackTrace();
            responseJson = errorResponse("Error fetching order history.");
        }

        // Send JSON response
        resp.getWriter().write(new Gson().toJson(responseJson));
    }

    private JsonObject errorResponse(String message) {
        JsonObject errorJson = new JsonObject();
        errorJson.addProperty("success", false);
        errorJson.addProperty("message", message);
        return errorJson;
    }
}
