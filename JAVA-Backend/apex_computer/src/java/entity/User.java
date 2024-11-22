package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User implements Serializable {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "fname", length = 45, nullable = false)
    private String fname;

    @Column(name = "lname", length = 45, nullable = false)
    private String lname;

    @Column(name = "username", length = 30, nullable = true)
    private String username;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "password", length = 10, nullable = false)
    private String password;
    
    @Column(name = "registration_date",nullable = false)
    private String date;
    
    @Column(name = "verification",length = 10,nullable = false)
    private String v_code;

    public User() {
       
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getDate(){
        return date;
    }
    
    public void setDate(String date){
        this.date = date;
    }
    
    public String getVerification(){
       return v_code;
    }
    
    public void setVerification(String v_code){
        this.v_code = v_code;
    }

}
