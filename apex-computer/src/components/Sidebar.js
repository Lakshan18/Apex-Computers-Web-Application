import { useState } from "react";

const Sidebar = ({ setSelectedSection }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`w-${collapsed ? '20' : '64'} bg-gray-800 text-white p-6 transition-all`}>
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-white mb-6"
            >
                {collapsed ? "→" : "←"}
            </button>
            <h2 className="text-2xl font-bold mb-6">{collapsed ? "AP" : "Admin Panel"}</h2>
            <ul>
                <li
                    className="mb-4 cursor-pointer hover:text-cyan-400"
                    onClick={() => setSelectedSection("addProduct")}
                >
                    {collapsed ? "Add" : "Add Product"}
                </li>
                <li
                    className="mb-4 cursor-pointer hover:text-cyan-400"
                    onClick={() => setSelectedSection("manageProduct")}
                >
                    {collapsed ? "Manage" : "Manage Product"}
                </li>
                <li
                    className="mb-4 cursor-pointer hover:text-cyan-400"
                    onClick={() => setSelectedSection("manageUser")}
                >
                    {collapsed ? "Users" : "Manage User"}
                </li>
                <li
                    className="mb-4 cursor-pointer hover:text-cyan-400"
                    onClick={() => setSelectedSection("orderManagement")}
                >
                    {collapsed ? "Orders" : "Order Management"}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
