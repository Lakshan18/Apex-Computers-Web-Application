import React, { useEffect, useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';

function SingleProductView() {
    const [cities, setCities] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    let Delivery_fee = 1500;

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

    useEffect(() => {
        LoadCities();
    }, []);

    const location = useLocation();
    const product = location.state?.product;
    const [showModal, setShowModal] = useState(false);
    const [useExistingAddress, setUseExistingAddress] = useState(true);
    const [address, setAddress] = useState({
        line1: '',
        line2: '',
        mobile: '',
        city: '', // Will store city id
        postalCode: '',
    });

    useEffect(() => {
        if (product) {
            setTotalPrice(product.price + Delivery_fee);
        }
    }, [product]);

    const toggleModal = () => setShowModal(!showModal);

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

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        setSelectedQuantity(quantity);
        setTotalPrice((quantity * product.price) + Delivery_fee);
    };

    if (!product) {
        return <div>No product data available.</div>;
    }

    return (
        <>
            <NavBar />
            <div className='bg-SPV w-[100%] h-[92.8vh] flex flex-row justify-center items-center'>
                <div className='w-[95%] h-auto'>
                    <div className="max-w-3xl mx-auto p-6 bg-SCardV rounded-lg shadow-lg">
                        {/* Product Image */}
                        <div className='w-[100%] flex flex-row justify-center'>
                            <img
                                className="w-[300px] h-auto object-cover object-center mb-6 rounded-md"
                                src={product.image}
                                alt={product.pr_title}
                            />
                        </div>

                        <h1 className="text-[#00C2FF] text-subHeading-txt font-[Inter] font-semibold mb-2">{product.pr_title}</h1>
                        <p className="text-[#97E6FF] text-large-txt font-[Inter] font-medium mb-4">Rs:{product.price.toFixed(2)}</p>
                        <p className="text-[#89c0d1] text-large-txt font-[Inter] font-medium mb-4">Available Quantity: <span className='text-cyan-300'>{product.qty}</span></p>

                        {/* Quantity Selection */}
                        <div className="mb-4">
                            <label className="block text-[#A5B0B3] text-medium-txt font-[Inter] font-medium mb-2">Select Quantity:</label>
                            <select
                                className="w-[10%] py-1 ps-2 outline-none border border-gray-300 rounded-md"
                                value={selectedQuantity}
                                onChange={handleQuantityChange}
                            >
                                {Array.from({ length: product.qty }, (_, index) => index + 1).map((value) => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>

                        <p className='text-yellow-200 text-medium-txt mb-3'>Delivery Charge Rs : {Delivery_fee}.00</p>

                        {/* Total Price */}
                        <p className="text-[#97E6FF] text-large-txt font-[Inter] font-medium mb-6">Total Price: Rs:{totalPrice.toFixed(2)}</p>

                        {/* Buttons */}
                        <div className="flex flex-row items-center justify-between">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 w-[150px] rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Add to Cart
                            </button>
                            <button
                                className="bg-green-600 text-white w-[150px] px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                                onClick={toggleModal}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
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
                                    <label className="block text-gray-700">Address Line 1</label>
                                    <input
                                        type="text"
                                        name="line1"
                                        value={address.line1}
                                        onChange={handleAddressChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        disabled={useExistingAddress}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Address Line 2</label>
                                    <input
                                        type="text"
                                        name="line2"
                                        value={address.line2}
                                        onChange={handleAddressChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        disabled={useExistingAddress}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={address.mobile}
                                        onChange={handleAddressChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        disabled={useExistingAddress}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">City</label>
                                    <select
                                        name="city"
                                        value={address.city}
                                        onChange={handleAddressChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        disabled={useExistingAddress}
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
                                    <label className="block text-gray-700">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={address.postalCode}
                                        onChange={handleAddressChange}
                                        className="w-[40%] p-2 border border-gray-300 rounded-md"
                                        disabled={useExistingAddress}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                onClick={async () => {
                                    try {
                                        const data = {
                                            productId: product.id,
                                            productPrice: product.price,
                                            selectedQuantity,
                                            totalBalance: totalPrice,
                                            useExistingAddress,
                                        };

                                        if (!useExistingAddress) {
                                            data.address = address; // address.city will now contain the city id
                                        }

                                        const response = await fetch("http://localhost:8080/apex_comp-backend/BuyNowProcess", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            credentials: "include",
                                            body: JSON.stringify(data),
                                        });

                                        if (response.ok) {
                                            const respObj = await response.json();
                                            console.log("Checkout success:", respObj);
                                        } else {
                                            console.error("Checkout failed:", response);
                                        }
                                    } catch (error) {
                                        console.error("Error during checkout:", error);
                                    }
                                }}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SingleProductView;
