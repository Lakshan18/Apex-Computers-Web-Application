package model;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {

    private static final SessionFactory sessionFactory;

    static {
        SessionFactory tempSessionFactory = null;
        try {
            tempSessionFactory = new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Hibernate configuration error: " + ex.getMessage());
            ex.printStackTrace();
            throw new ExceptionInInitializerError(ex);
        }
        sessionFactory = tempSessionFactory;
    }

    public static SessionFactory geSessionFactory() {
        return sessionFactory;
    }

    public static void shutDown() {
        if (sessionFactory != null) {
            sessionFactory.close();
        }
    }
}
