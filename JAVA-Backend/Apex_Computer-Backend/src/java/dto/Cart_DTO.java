package dto;

import entity.Product;
import java.io.Serializable;

public class Cart_DTO implements Serializable {

    private Product product;
    private int quantity;
    
    public Cart_DTO(){
        
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}