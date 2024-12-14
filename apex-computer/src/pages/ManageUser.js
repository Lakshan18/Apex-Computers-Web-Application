const ManageUser = () => {
    const users = [
        { id: 1, name: "User A", email: "usera@example.com", role: "Admin" },
        { id: 2, name: "User B", email: "userb@example.com", role: "User" },
    ];

    const handleDelete = (id) => {
        // Handle user deletion
        console.log("Delete user with ID:", id);
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Manage Users</h3>
            <table className="min-w-full table-auto border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                        <th className="border border-gray-400 px-4 py-2">Email</th>
                        <th className="border border-gray-400 px-4 py-2">Role</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.role}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDelete(user.id)}
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

export default ManageUser;
