import React, { useEffect, useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';

const MyProfile = () => {
    const { userId } = useParams();
    const [user_objectData, setUser_ObjectData] = useState("");
    const [orderHistory, setOrderHistory] = useState([]);

    const fetchUserData = async () => {
        const response = await fetch(`http://localhost:8080/apex_comp-backend/GetUserProfile?id=${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );

        if (response.ok) {
            const respObj = await response.json();
            const userObject = {
                u_id: respObj.uid,
                email: respObj.email,
                username: respObj.username,
                fName: respObj.fName,
                lName: respObj.lName,
                mobile: respObj.mobile,
                line1: respObj.line1,
                line2: respObj.line2,
                postalC: respObj.postal,
                city: respObj.city,
            };

            setUser_ObjectData(userObject);
        } else {
            console.error(response);
        }
    }

    const fetchOrderHistory = async () => {
        const response = await fetch(`http://localhost:8080/apex_comp-backend/FetchOrderHistory?uid=${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );

        if (response.ok) {
            const respObj = await response.json();
            if (respObj.success) {
                setOrderHistory(respObj.orders);
            }
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        fetchUserData();
        fetchOrderHistory();
    }, [userId]);

    const updateProfile = async () => {
        const updatedProfile = {
            userId: userId,
            fName: user_objectData.fName,
            lName: user_objectData.lName,
            username: user_objectData.username,
            mobile: user_objectData.mobile,
            line1: user_objectData.line1,
            line2: user_objectData.line2,
            city: user_objectData.city,
            postalC: user_objectData.postalC,
        };
    
        const response = await fetch("http://localhost:8080/apex_comp-backend/EditProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedProfile),
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            if (result.success) {
                alert("Profile updated successfully!");
                fetchUserData(); // Refresh profile data
            } else {
                alert("Failed to update profile: " + result.message);
            }
        } else {
            console.error("Error updating profile:", response);
            alert("An error occurred while updating the profile.");
        }
    };
    

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8">
                {/* Profile Header */}
                <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <img
                            src="/images/User.png"
                            alt="Profile"
                            className="w-20 h-20 p-2 rounded-full border-4 border-teal-500"
                        />
                        <div className="ml-4">
                            <h1 className="text-large-txt font-bold">{user_objectData.fName + " " + user_objectData.lName}</h1>
                            <p className="text-teal-400">{user_objectData.email}</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600" onClick={updateProfile}>Edit Profile</button>
                </div>

                {/* Profile Details */}
                <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-[100%] gap-x-6 gap-y-8">
                        <div className='w-[100%]'>
                            <label className="text-gray-300">First Name</label>
                            <input
                                type="text"
                                value={user_objectData.fName}
                                onChange={(e) => setUser_ObjectData({ ...user_objectData, fName: e.target.value })}
                                className="w-full bg-transparent text-cyan-200 border-b border-gray-600 focus:outline-none focus:border-cyan-300"
                            />
                        </div>
                        <div className='w-[100%]'>
                            <label className="text-gray-300">Last Name</label>
                            <input
                                type="text"
                                value={user_objectData.lName}
                                onChange={(e) => setUser_ObjectData({ ...user_objectData, lName: e.target.value })}
                                className="w-full bg-transparent text-cyan-200 border-b border-gray-600 focus:outline-none focus:border-cyan-300"
                            />
                        </div>
                        <div className='w-[100%]'>
                            <label className="text-gray-300">Username</label>
                            <input
                                type="text"
                                value={user_objectData.username}
                                onChange={(e) => setUser_ObjectData({ ...user_objectData, username: e.target.value })}
                                className="w-full bg-transparent text-cyan-200 border-b border-gray-600 focus:outline-none focus:border-cyan-300"
                            />
                        </div>
                        <div className='w-[100%]'>
                            <label className="text-gray-300">Phone Number</label>
                            <input
                                type="text"
                                value={user_objectData.mobile === "Empty" ? "" : user_objectData.mobile}
                                onChange={(e) => setUser_ObjectData({ ...user_objectData, mobile: e.target.value })}
                                placeholder="Enter phone number"
                                className="w-full bg-transparent text-cyan-100 border-b border-gray-600 focus:outline-none focus:border-cyan-300"
                            />
                        </div>
                        <div className='w-[100%]'>
                            <label className="text-gray-300">Email Address</label>
                            <input
                                disabled
                                type="email"
                                value={user_objectData.email}
                                onChange={(e) => setUser_ObjectData({ ...user_objectData, email: e.target.value })}
                                className="w-full bg-transparent text-cyan-200 border-b border-gray-600 focus:outline-none focus:border-cyan-300"
                            />
                        </div>
                        <div className='w-[100%]'>
                            <label className="text-gray-300">Address Line 1</label>
                            <input
                                type="text"
                                value={user_objectData.line1 === "Empty" ? "" : user_objectData.line1}
                                onChange={(e) => setUser_ObjectData({ ...user_objectData, line1: e.target.value })}
                                placeholder="Enter address line 1"
                                className="w-full bg-transparent text-cyan-100 border-b border-gray-600 focus:outline-none focus:border-cyan-300"
                            />
                        </div>
                        <div className='w-[100%]'>
                            <label className="text-gray-300">Address Line 2</label>
                            <input
                                type="text"
                                value={user_objectData.line2 === "Empty" ? "" : user_objectData.line2}
                                onChange={(e) => setUser_ObjectData({ ...user_objectData, line2: e.target.value })}
                                placeholder="Enter address line 2"
                                className="w-full bg-transparent text-cyan-100 border-b border-gray-600 focus:outline-none focus:border-cyan-300"
                            />
                        </div>
                        <div className='w-[100%]'>
                            <label className="text-gray-300">City</label>
                            <input
                                type="text"
                                value={user_objectData.city === "Empty" ? "" : user_objectData.city}
                                onChange={(e) => setUser_ObjectData({ ...user_objectData, city: e.target.value })}
                                placeholder="Enter city"
                                className="w-full bg-transparent text-cyan-100 border-b border-gray-600 focus:outline-none focus:border-cyan-300"
                            />
                        </div>
                        <div className='w-[100%]'>
                            <label className="text-gray-300">Postal Code</label>
                            <input
                                type="text"
                                value={user_objectData.postalC === "Empty" ? "" : user_objectData.postalC}
                                onChange={(e) => setUser_ObjectData({ ...user_objectData, postalC: e.target.value })}
                                placeholder="Enter postal code"
                                className="w-full bg-transparent text-cyan-100 border-b border-gray-600 focus:outline-none focus:border-cyan-300"
                            />
                        </div>
                    </div>
                </div>


                {/* Order History */}
                <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">Order History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-gray-300">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="p-3">Order ID</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Total</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderHistory.length > 0 ? (
                                    orderHistory.map((order) => (
                                        <tr key={order.orderId} className="border-t border-gray-700 hover:bg-gray-700">
                                            <td className="p-3">#{order.orderId}</td>
                                            <td className="p-3">{new Date(order.dateTime).toLocaleDateString()}</td>
                                            <td className="p-3">${order.total.toFixed(2)}</td>
                                            <td
                                                className={`p-3 ${order.orderStatus === "Delivered"
                                                        ? "text-teal-500"
                                                        : order.orderStatus === "Pending"
                                                            ? "text-yellow-400"
                                                            : "text-red-500"
                                                    }`}
                                            >
                                                {order.orderStatus}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-3 text-center">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;