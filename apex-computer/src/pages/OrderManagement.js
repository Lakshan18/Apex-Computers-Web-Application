const OrderManagement = () => {
    const orders = [
        { id: 1, user: "User A", total: "$50", status: "Pending" },
        { id: 2, user: "User B", total: "$30", status: "Shipped" },
    ];

    const handleUpdateStatus = (id, status) => {
        // Handle order status update
        console.log(`Update order ${id} status to ${status}`);
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Order Management</h3>
            <table className="min-w-full table-auto border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">User</th>
                        <th className="border border-gray-400 px-4 py-2">Total</th>
                        <th className="border border-gray-400 px-4 py-2">Status</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="border border-gray-400 px-4 py-2">{order.user}</td>
                            <td className="border border-gray-400 px-4 py-2">{order.total}</td>
                            <td className="border border-gray-400 px-4 py-2">{order.status}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => handleUpdateStatus(order.id, "Shipped")}
                                >
                                    Ship Order
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleUpdateStatus(order.id, "Cancelled")}
                                >
                                    Cancel Order
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagement;
