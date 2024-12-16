package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.Response_DTO;
import entity.Admin;
import entity.Brand;
import entity.Color;
import entity.Model;
import entity.Product;
import entity.Product_Condition;
import entity.Product_Status;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import model.HibernateUtil;
import model.SetCores;
import org.hibernate.Session;
import org.hibernate.Transaction;

@WebServlet(name = "AddProduct", urlPatterns = {"/AddProduct"})
@MultipartConfig()
public class AddProduct extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.AllowMethod(req, resp, "POST");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        Response_DTO response_dto = new Response_DTO();

        try {
            String title = req.getParameter("pTitle");
            double price = Double.parseDouble(req.getParameter("pPrice"));
            String description = req.getParameter("pDesc");
            int quantity = Integer.parseInt(req.getParameter("pQty"));
            int brandId = Integer.parseInt(req.getParameter("pBrandId"));
            int modelId = Integer.parseInt(req.getParameter("pModelId"));
            int colorId = Integer.parseInt(req.getParameter("pColorId"));
            int conditionId = Integer.parseInt(req.getParameter("pCondId"));
            int statusId = Integer.parseInt(req.getParameter("pStatusId"));

            Part imagePart = req.getPart("productImage");
            if (imagePart == null || imagePart.getSize() <= 0) {
                response_dto.setSuccess(false);
                response_dto.setContent("Image file is required.");
                resp.getWriter().write(gson.toJson(response_dto));
                return;
            }

            Session session = HibernateUtil.geSessionFactory().openSession();

            if (req.getSession().getAttribute("admin") != null) {
                Admin admin = (Admin) req.getSession().getAttribute("admin");

                Transaction transaction = session.beginTransaction();

                Product product = new Product();
                product.setTitle(title);
                product.setPrice(price);
                product.setDescription(description);
                product.setQuatity(quantity);
                product.setDate_time(new Date());

                Brand brand = (Brand) session.get(Brand.class, brandId);
                Model model = (Model) session.get(Model.class, modelId);
                Color color = (Color) session.get(Color.class, colorId);
                Product_Condition condition = (Product_Condition) session.get(Product_Condition.class, conditionId);
                Product_Status status = (Product_Status) session.get(Product_Status.class, statusId);

                product.setBrand(brand);
                product.setModel(model);
                product.setColor(color);
                product.setProduct_condition(condition);
                product.setProduct_status(status);
                product.setAdmin(admin);

                session.save(product);
                session.flush(); // Ensure ID is generated

                String serverPath = req.getServletContext().getRealPath("");
                String productImagePath = serverPath + File.separator + "product-images" + File.separator + product.getId() + ".png";
                File file = new File(productImagePath);

                Files.copy(imagePart.getInputStream(), file.toPath(), StandardCopyOption.REPLACE_EXISTING);

                transaction.commit();

                response_dto.setSuccess(true);
                response_dto.setContent("Product added successfully! Image saved as: " + productImagePath);

            } else {
                response_dto.setSuccess(false);
                response_dto.setContent("Admin session not found. Please log in.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            response_dto.setSuccess(false);
            response_dto.setContent("An error occurred: " + e.getMessage());
        }

        // Write the JSON response
        resp.getWriter().write(gson.toJson(response_dto));
    }
}
