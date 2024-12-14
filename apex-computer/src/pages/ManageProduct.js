const ManageProduct = () => {
    const products = [
        { id: 1, name: "Product A", price: "$20", description: "Product A Description" },
        { id: 2, name: "Product B", price: "$30", description: "Product B Description" },
    ];

    const handleDelete = (id) => {
        console.log("Delete product with ID:", id);
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Manage Products</h3>
            <table className="min-w-full table-auto border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">Product Name</th>
                        <th className="border border-gray-400 px-4 py-2">Price</th>
                        <th className="border border-gray-400 px-4 py-2">Description</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="border border-gray-400 px-4 py-2">{product.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{product.price}</td>
                            <td className="border border-gray-400 px-4 py-2">{product.description}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProduct;
