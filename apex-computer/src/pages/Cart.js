import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import '../App.css';

function Cart() {
    const [cartProducts, setCartProducts] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [useExistingAddress, setUseExistingAddress] = useState(true);
    const [cities, setCities] = useState([]);
    const [address, setAddress] = useState({
        line1: '',
        line2: '',
        mobile: '',
        city: '',
        postalCode: '',
    });
    let delivery_fee = 1500;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.payhere.lk/lib/payhere.js";
        script.onload = () => {
            if (window.payhere) {
                window.payhere.onCompleted = function onCompleted(orderId) {
                    console.log("Payment completed. OrderID:" + orderId);
                };
                window.payhere.onDismissed = function onDismissed() {
                    console.log("Payment dismissed");
                };
                window.payhere.onError = function onError(error) {
                    console.log("Error:" + error);
                };
            }
        };
        script.onerror = () => {
            console.error("Error loading PayHere script");
        };
        document.body.appendChild(script);
    }, []);

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
                setCartProducts(
                    respObject.map((item) => ({
                        id: item.product.id,
                        title: item.product.title,
                        price: item.product.price,
                        avQty: item.qty,
                        quantity: 1,
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
        LoadCities();
    }, []);

    const updateQuantity = (id, newQuantity) => {
        setCartProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, quantity: newQuantity } : product
            )
        );
    };

    const removeProduct = async (id) => {
        const response = await fetch(`http://localhost:8080/apex_comp-backend/RemoveCartItem?pid=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            const deleteResponse = await response.json();
            if (deleteResponse.success) {
                setCartProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
                window.location.reload();
            }
        } else {
            console.error(response);
        }
    };

    const proceedCheckout = async () => {
        const productDetails = cartProducts.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
            price: product.price,
        }));

        const checkoutData = {
            productDetails,
            totalPrice: totalPrice,
            useExistingAddress,
        };

        if (!useExistingAddress) {
            checkoutData.address = address;
        }

        try {
            const response = await fetch("http://localhost:8080/apex_comp-backend/CheckoutCartProceed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(checkoutData),
            });

            if (response.ok) {
                const respObject = await response.json();
                console.log(respObject);

                const responseValues = respObject.payhere;

                var payment = {
                    "sandbox": true,
                    "merchant_id": responseValues.merchant_id,    // Replace your Merchant ID
                    "return_url": undefined,     // Important
                    "cancel_url": undefined,     // Important
                    "notify_url": "",
                    "order_id": responseValues.order_id,
                    "items": responseValues.items,
                    "amount": responseValues.amount,
                    "currency": "LKR",
                    "hash": responseValues.hash, // *Replace with generated hash retrieved from backend
                    "first_name": responseValues.first_name,
                    "last_name": responseValues.last_name,
                    "email": responseValues.email,
                    "phone": "",
                    "address": "",
                    "city": "",
                    "country": "",
                    "delivery_address": responseValues.delivery_ads,
                    "delivery_city": "",
                    "delivery_country": "",
                    "custom_1": "",
                    "custom_2": ""
                };

                window.payhere.startPayment(payment);

            } else {
                console.error("Checkout failed:", response);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    const LoadCities = async () => {
        const response = await fetch("http://localhost:8080/apex_comp-backend/LoadCities", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            const respObject = await response.json();
            if (respObject.success) {
                const citiesAr = respObject.content.map((city) => ({
                    id: city.id,
                    cName: city.c_name,
                }));
                setCities(citiesAr);
            }
        } else {
            console.error(response);
        }
    };

    const subtotal = cartProducts.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );

    const totalPrice = subtotal + delivery_fee;

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleCheckboxChange = () => {
        setUseExistingAddress(!useExistingAddress);
        if (useExistingAddress) {
            setAddress({ line1: '', line2: '', mobile: '', city: '', postalCode: '' });
        }
    };

    return (
        <>
            <NavBar />
            <div className="w-[100%] h-[92.8vh] cartBG flex flex-row justify-center items-center">
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
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                        <div className="flex-1 ml-6">
                                            <h2 className="text-[#97E6FF]">{product.title}</h2>
                                            <p className='text-[#efff97]'>Rs:{product.price.toFixed(2)}</p>
                                            <p className='text-gray-100'>Available Quantity: <span className="text-cyan-300">{product.avQty}</span></p>
                                        </div>
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
                                                {[1, 2, 3, 4, 5].map((qty) => (
                                                    <option key={qty} value={qty}>
                                                        {qty}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            onClick={() => removeProduct(product.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ms-4"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-between items-center">
                                <div className="flex flex-col">
                                    <h2 className='text-red-300'>Delivery Fee Rs:{delivery_fee}.00</h2>
                                    <h2 className='text-green-300 text-large-txt font-medium mt-3'>Total Rs:{totalPrice.toFixed(2)}</h2>
                                </div>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    onClick={toggleModal}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-200 w-[90%] md:w-[40%] p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Add Shipping Address</h2>
                        <div className="mb-4">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={useExistingAddress}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Use existing address
                            </label>
                        </div>

                        {!useExistingAddress && (
                            <div className="space-y-4">
                                <div>
                                    <label>Address Line 1</label>
                                    <input
                                        type="text"
                                        name="line1"
                                        value={address.line1}
                                        onChange={handleAddressChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label>Address Line 2</label>
                                    <input
                                        type="text"
                                        name="line2"
                                        value={address.line2}
                                        onChange={handleAddressChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label>Mobile Number</label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={address.mobile}
                                        onChange={handleAddressChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label>City</label>
                                    <select
                                        name="city"
                                        value={address.city}
                                        onChange={handleAddressChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.cName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={address.postalCode}
                                        onChange={handleAddressChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                onClick={() => {
                                    toggleModal();
                                    proceedCheckout();
                                }}
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;