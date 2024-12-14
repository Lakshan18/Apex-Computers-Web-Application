import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import '../App.css';

function Cart() {
    const [cartProducts, setCartProducts] = useState([]);

    // Fetch cart items from backend
    const LoadCartItems = async () => {
        try {
            const response = await fetch("http://localhost:8080/apex_comp-backend/LoadCartItems", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const respObject = await response.json();
                console.log("Cart Items from Backend:", respObject);
                setCartProducts(
                    respObject.map((item) => ({
                        id: item.product.id,
                        title: item.product.title,
                        price: item.product.price,
                        avQty: item.qty,
                        quantity: 1, // Always start with 1 for calculations
                        image: item.image,
                    }))
                );
            } else {
                console.error("Failed to load cart items:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    useEffect(() => {
        LoadCartItems();
    }, []);

    // Function to handle quantity change
    const updateQuantity = (id, newQuantity) => {
        setCartProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, quantity: newQuantity } : product
            )
        );
    };

    // Function to remove a product from the cart
    const removeProduct = async (id) => {
        const response = await fetch(`http://localhost:8080/apex_comp-backend/RemoveCartItem?pid=${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );

        if (response.ok) {
            const deleteResponse = await response.json();
            console.log(deleteResponse);

            if (deleteResponse.success) {
                setCartProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
                window.location.reload();
            } else {
                console.log(deleteResponse);
            }
        } else {
            console.error(response);
        }
    };

    // Calculate total price dynamically using the selected quantities
    const totalPrice = cartProducts.reduce(
        (acc, product) => acc + product.price * product.quantity,  // Multiply price by the selected quantity
        0
    );

    return (
        <>
            <NavBar />
            <div className='w-[100%] h-[92.8vh] cartBG flex flex-row justify-center items-center'>
                <div className="w-[75%] h-auto cartContent mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-subHeading-txt text-[#00C2FF] font-[Inter] font-semibold mb-6">Shopping Cart</h1>
                    {cartProducts.length === 0 ? (
                        <p className="text-[#C2CBCE] text-center text-heading-txt font-[Inter] font-medium">Your cart is empty.</p>
                    ) : (
                        <>
                            <div className="space-y-6">
                                {cartProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between shadow-xl bg-[#304950] p-4 rounded-lg"
                                        style={{ border: '1px #7DB2C2' }}
                                    >
                                        {/* Product Image */}
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />

                                        {/* Product Title and Price */}
                                        <div className="flex-1 ml-6">
                                            <h2 className="text-[#97E6FF] text-large-txt font-[Inter] font-medium">{product.title}</h2>
                                            <p className="text-[#C2CBCE] text-medium-txt font-[Inter] font-medium">Rs:{product.price.toFixed(2)}</p>
                                            <p className="text-[#C2CBCE] text-medium-txt font-[Inter] font-medium">Available Quantity: <p className='text-cyan-300'>{product.avQty}</p></p>
                                        </div>

                                        {/* Quantity Selector */}
                                        <div className="flex items-center">
                                            <label htmlFor={`quantity-${product.id}`} className="mr-2 text-[#C2CBCE]">
                                                Qty:
                                            </label>
                                            <select
                                                id={`quantity-${product.id}`}
                                                value={product.quantity}
                                                onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                                                className="px-6 py-2 border border-gray-300 rounded-md"
                                            >
                                                {/* Dynamically generate quantity options (from 1 to 5) */}
                                                {[1, 2, 3, 4, 5].map((qty) => (
                                                    <option key={qty} value={qty}>
                                                        {qty}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeProduct(product.id)}
                                            className="bg-red-500 ms-[1.5%] text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Total Price */}
                            <div className="mt-8 flex justify-between items-center">
                                <h2 className="text-[#EBFF00] text-medium-txt font-[Inter] font-medium">Total Rs:{totalPrice.toFixed(2)}</h2>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Cart;
