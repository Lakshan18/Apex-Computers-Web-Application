package model;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SetCores {

    static String origin = "Access-Control-Allow-Origin";
    static String method = "Access-Control-Allow-Methods";
    static String header = "Access-Control-Allow-Headers";

    public static void setHeaders(HttpServletRequest req, HttpServletResponse resp) {
        resp.setHeader(origin, "http://localhost:3000");
        resp.setHeader(method, "GET, POST, OPTIONS");
        resp.setHeader(header, "Content-Type");
    }

    public static void AllowMethod(HttpServletRequest req, HttpServletResponse resp, String setMethod) {
        resp.setHeader(origin, "http://localhost:3000");
        resp.setHeader(method, setMethod);
        resp.setHeader(header, "Content-Type");

    }

}
