import React, { useEffect, useState } from "react";

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [color, setColor] = useState("");
    const [productCondition, setProductCondition] = useState("");
    const [productStatus, setProductStatus] = useState("");
    const [productImage, setProductImage] = useState(null);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [colors, setColors] = useState([]);
    const [productId, setProductId] = useState("");

    useEffect(() => {
        loadProductData();
    }, []);

    const loadProductData = async () => {
        try {
            const response = await fetch("http://localhost:8080/apex_comp-backend/LoadProductData", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                const responseObject = await response.json();
                if (responseObject.success) {
                    const { categories, brands, models, colors, pid } = responseObject.content;
                    setCategories(categories || []);
                    setBrands(brands || []);
                    setModels(models || []);
                    setColors(colors || []);
                    setProductId(pid);
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

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append("pId", productId);
        formData.append("pTitle", title);
        formData.append("pPrice", price);
        formData.append("pDesc", description);
        formData.append("pQty", quantity);
        formData.append("pCateId", category);
        formData.append("pBrandId", brand);
        formData.append("pModelId", model);
        formData.append("pColorId", color);
        formData.append("pCondId", productCondition);
        formData.append("pStatusId", productStatus);
        if (productImage) {
            formData.append("productImage", productImage);
        }

        try {
            const response = await fetch("http://localhost:8080/apex_comp-backend/AddProduct", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const responseObject = await response.json();
            if (responseObject.success) {
                alert("Product added successfully");
                window.location.reload();
            } else {
                alert("Error adding product: " + responseObject.message);
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Error adding product: " + error.message);
        }
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
                        value={productId}
                        disabled
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
                        type="number"
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
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter product quantity"
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
                        {categories.map((c) => (
                            <option key={c.catId} value={c.catId}>
                                {c.catName}
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
                        {brands.map((b) => (
                            <option key={b.brdId} value={b.brdId}>
                                {b.brdName}
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
                        {models.map((m) => (
                            <option key={m.modId} value={m.modId}>
                                {m.modName}
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
                        {colors.map((color) => (
                            <option key={color.colId} value={color.colId}>
                                {color.colName}
                            </option>
                        ))}
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
                        <option value="1">Brand-New</option>
                        <option value="2">Used</option>
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
                        <option value="1">Available</option>
                        <option value="2">Unavailable</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Product Image</label>
                    <input
                        type="file"
                        className="w-full px-4 py-2 bg-gray-200 rounded"
                        onChange={(e) => setProductImage(e.target.files[0])}
                    />
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
