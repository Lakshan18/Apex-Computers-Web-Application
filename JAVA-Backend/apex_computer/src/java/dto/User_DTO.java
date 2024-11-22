package dto;

import com.google.gson.annotations.Expose;
import java.io.Serializable;

public class User_DTO implements Serializable {

    @Expose
    private String first_name;

    @Expose
    private String last_name;

    @Expose
    private String email;

    @Expose(deserialize = true, serialize = false)
    private String password;

    @Expose(deserialize = true, serialize = false)
    private String conf_password;

    public User_DTO() {

    }

    public String getFname() {
        return first_name;
    }

    public void setFname(String fname) {
        this.first_name = fname;
    }

    public String getLname() {
        return last_name;
    }

    public void setLname(String lname) {
        this.last_name = lname;
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

    public String getConf_password() {
        return conf_password;
    }

    public void setConf_password(String conf_password) {
        this.conf_password = conf_password;
    }

}
