import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AddProduct from "./AddProducts";
import ManageProduct from "./ManageProduct";
import ManageUser from "./ManageUser";
import OrderManagement from "./OrderManagement";

const AdminPanel = () => {
    const [selectedSection, setSelectedSection] = useState("addProduct");

    return (
        <div className="flex h-auto">
            <Sidebar setSelectedSection={setSelectedSection} />

            <div className="flex-1 p-6 bg-gray-100">
                {/* Render Content Based on Selected Section */}
                {selectedSection === "addProduct" && <AddProduct />}
                {selectedSection === "manageProduct" && <ManageProduct />}
                {selectedSection === "manageUser" && <ManageUser />}
                {selectedSection === "orderManagement" && <OrderManagement />}
            </div>
        </div>
    );
};

export default AdminPanel;
