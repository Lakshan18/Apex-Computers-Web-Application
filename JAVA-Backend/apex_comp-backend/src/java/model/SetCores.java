package model;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SetCores {

    static final String ORIGIN = "Access-Control-Allow-Origin";
    static final String METHODS = "Access-Control-Allow-Methods";
    static final String HEADERS = "Access-Control-Allow-Headers";
    static final String CREDENTIALS = "Access-Control-Allow-Credentials";

    public static void setHeaders(HttpServletRequest req, HttpServletResponse resp) {
        String requestOrigin = req.getHeader("Origin");
        resp.setHeader(ORIGIN, requestOrigin != null ? requestOrigin : "http://localhost:3000");
        resp.setHeader(METHODS, "GET, POST, OPTIONS");
        resp.setHeader(HEADERS, "Content-Type, Authorization, Accept, X-CSRF-TOKEN");
        resp.setHeader(CREDENTIALS, "true");
    }

    public static void AllowMethod(HttpServletRequest req, HttpServletResponse resp, String setMethod) {
        String requestOrigin = req.getHeader("Origin");
        resp.setHeader(ORIGIN, requestOrigin != null ? requestOrigin : "http://localhost:3000");
        resp.setHeader(METHODS, setMethod);
        resp.setHeader(HEADERS, "Content-Type, Authorization, Accept, X-CSRF-TOKEN");
        resp.setHeader(CREDENTIALS, "true");
    }

    // Handle preflight OPTIONS request
    public static void handlePreflight(HttpServletRequest req, HttpServletResponse resp) {
        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            resp.setStatus(HttpServletResponse.SC_OK);
            setHeaders(req, resp);
        }
    }
}
