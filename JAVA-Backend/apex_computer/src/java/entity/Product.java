package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "product")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    
    @Column(name = "title",length = 30,nullable = false)
    private String title;
    
    @Column(name = "price",nullable = false)
    private double price;
    
    @Column(name = "description",nullable = false)
    private String description;
    
    @Column(name = "qty",nullable = false)
    private int qty;
    
    @Column(name = "date_time",nullable = false)
    private Date date;
    
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;
    
    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;
    
    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;
    
    @ManyToOne
    @JoinColumn(name = "product_condition_id")
    private Product_Condition product_condition;
    
    @ManyToOne
    @JoinColumn(name = "product_status_id")
    private Product_Status product_status;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Product() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }
    
    public Color getColor(){
        return color;
    }
    
    public void setColor(Color color){
        this.color = color;
    }

    public Product_Condition getProduct_condition() {
        return product_condition;
    }

    public void setProduct_condition(Product_Condition product_condition) {
        this.product_condition = product_condition;
    }

    public Product_Status getProduct_status() {
        return product_status;
    }

    public void setProduct_status(Product_Status product_status) {
        this.product_status = product_status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
