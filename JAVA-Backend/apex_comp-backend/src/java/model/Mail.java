package model;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

//public class Mail {
//
//    private static final String APP_EMAIL = "lakshanvlogs3276@gmail.com";
//    private static final String APP_PASSWORD = "hndcbmtfygxzphfw";
//
//    public static void sendMail(String email, String subject, String htmlContent) {
//        Properties props = new Properties();
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.smtp.host", "smtp.gmail.com");
//        props.put("mail.smtp.port", "587");
//        props.put("mail.smtp.ssl.protocols", "TLSv1.2");
//        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
//
//        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
//            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication(APP_EMAIL, APP_PASSWORD);
//            }
//        });
//
//        try {
//            Message message = new MimeMessage(session);
//            message.setFrom(new InternetAddress(APP_EMAIL));
//            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
//            message.setSubject(subject);
//            message.setContent(htmlContent, "text/html; charset=UTF-8");
//            Transport.send(message);
//            System.out.println("Email sent successfully!");
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
//    }
//}

public class Mail {

    private static final String APP_EMAIL = "lakshanvlogs3276@gmail.com";
    private static final String APP_PASSWORD = "hndcbmtfygxzphfw";

    public static boolean sendMail(String email, String subject, String htmlContent) {

        boolean status = false;

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(Mail.APP_EMAIL, Mail.APP_PASSWORD);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(Mail.APP_EMAIL));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            message.setSubject(subject);
//            message.setText(content);
            message.setContent(htmlContent, "text/html");

            Transport.send(message);
            System.out.println("Email sent successfully!");
            status = true;
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        return status;
    }
}