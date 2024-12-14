package controller;

import com.google.gson.Gson;
import dto.Response_DTO;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.SetCores;

@WebServlet(name = "User_SignOut", urlPatterns = {"/User_SignOut"})
public class User_SignOut extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SetCores.handlePreflight(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SetCores.AllowMethod(req, resp, "GET");

        Response_DTO response_dto = new Response_DTO();
        Gson gson = new Gson();
        
        if(req.getSession().getAttribute("user") != null){
            req.getSession().invalidate();
            response_dto.setSuccess(true);
            response_dto.setContent("done");
        }else{
            response_dto.setContent("failure");
        }
        
        resp.getWriter().write(gson.toJson(response_dto));
    }
}
