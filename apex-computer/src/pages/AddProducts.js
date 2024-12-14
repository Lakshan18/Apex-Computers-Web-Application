import React, { useEffect, useState } from "react";

const AddProduct = () => {
    // States for form data
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [color, setColor] = useState("");
    const [productCondition, setProductCondition] = useState("");
    const [productStatus, setProductStatus] = useState("");

    // States for fetched dropdown data
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        loadProductData();
    }, []);

    const loadProductData = async () => {
        try {
            const response = await fetch("http://localhost:8080/apex_comp-backend/LoadProductData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const responseObject = await response.json();
                if (responseObject.success) {
                    const { categories, brands, models } = responseObject.content;
                    setCategories(categories || []);
                    setBrands(brands || []);
                    setModels(models || []);
                } else {
                    console.error("Failed to load product data:", responseObject.content);
                }
            } else {
                console.error("HTTP Error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    const handleAddProduct = () => {
        const newProduct = {
            id,
            title,
            price,
            description,
            quantity,
            dateTime,
            category,
            brand,
            model,
            color,
            productCondition,
            productStatus,
        };
        console.log(newProduct);
        // Add logic to send `newProduct` data to the backend
    };

    return (
        <div className="max-w-screen mx-auto p-6 bg-white rounded shadow-md">
            <h3 className="text-subHeading-txt font-semibold mb-6 text-center">Add New Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm text-gray-700">Product ID</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Enter product ID"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Title</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter product title"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Price</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Quantity</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={quantity}
                        min={1}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter product quantity"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Date & Time</label>
                    <input
                        type="datetime-local"
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Category</label>
                    <select
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((c, index) => (
                            <option key={index} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Brand</label>
                    <select
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    >
                        <option value="">Select a brand</option>
                        {brands.map((b, index) => (
                            <option key={index} value={b}>
                                {b}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Model</label>
                    <select
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <option value="">Select a model</option>
                        {models.map((m, index) => (
                            <option key={index} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Color</label>
                    <select
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    >
                        <option value="">Select Color</option>
                        <option value="orange">Orange</option>
                        <option value="pink">Pink</option>
                        <option value="green">Green</option>
                        <option value="Yellow">Yellow</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Product Condition</label>
                    <select
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={productCondition}
                        onChange={(e) => setProductCondition(e.target.value)}
                    >
                        <option value="">Select condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Product Status</label>
                    <select
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        value={productStatus}
                        onChange={(e) => setProductStatus(e.target.value)}
                    >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm text-gray-700">Description</label>
                <textarea
                    className="w-full px-4 py-2 bg-gray-200 rounded"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                />
            </div>
            <button
                onClick={handleAddProduct}
                className="mt-6 w-[300px] bg-cyan-600 text-white py-2 rounded"
            >
                Add Product
            </button>
        </div>
    );
};

export default AddProduct;
