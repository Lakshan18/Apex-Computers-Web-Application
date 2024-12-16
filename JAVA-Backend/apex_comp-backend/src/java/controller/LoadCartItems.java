
import com.google.gson.Gson;
import dto.Cart_DTO;
import dto.User_DTO;
import entity.Cart;
import entity.Product;
import entity.User;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import model.SetCores;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "LoadCartItems", urlPatterns = {"/LoadCartItems"})
public class LoadCartItems extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "GET");

        Gson gson = new Gson();
        HttpSession httpSession = req.getSession();
        ArrayList<Cart_DTO> cartDtoList = new ArrayList<>();
        Session session = HibernateUtil.geSessionFactory().openSession();
        String imageBasePath = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort()
                + req.getContextPath() + "/product-images/";

        try {

            if (httpSession.getAttribute("user") != null) {
                User_DTO user_DTO = (User_DTO) httpSession.getAttribute("user");

                Criteria criteria1 = session.createCriteria(User.class);
                criteria1.add(Restrictions.eq("email", user_DTO.getEmail()));
                User user = (User) criteria1.uniqueResult();

                Criteria criteria2 = session.createCriteria(Cart.class);
                criteria2.add(Restrictions.eq("user", user));
                List<Cart> cartList = criteria2.list();

                for (Cart cart : cartList) {

                    Cart_DTO cart_DTO = new Cart_DTO();

                    Product product = cart.getProduct();
                    product.setAdmin(null);

                    String imageUrl = imageBasePath + product.getId() + ".png"; 
                    cart_DTO.setProduct(product);
                    cart_DTO.setQty(cart.getQuantity());
                    cart_DTO.setImage(imageUrl); 

                    cartDtoList.add(cart_DTO);
                }
            } else {
                System.out.println("session cart");

                if (httpSession.getAttribute("sessionCart") != null) {
                    System.out.println("cart not empty");
                    cartDtoList = (ArrayList<Cart_DTO>) httpSession.getAttribute("sessionCart");

                    for (Cart_DTO cart_DTO : cartDtoList) {
                        cart_DTO.getProduct().setAdmin(null);
                    }
                } else {
                    // cart empty
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        session.close();
        System.out.println("session closed");

        resp.setContentType("application/json");
        System.out.println("content type set");

        resp.getWriter().write(gson.toJson(cartDtoList));
        System.out.println("response sent");
    }
}
