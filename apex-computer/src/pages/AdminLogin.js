import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {

        setErrorMessage("");

        if (!username || !password) {
            setErrorMessage("Both username and password are required.");
            return;
        }

        const inputData = {
            uName: username,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:8080/apex_comp-backend/AdminLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputData),
                credentials: "include",
            });

            if (response.ok) {
                const respObject = await response.json();
                console.log(respObject);

                if (respObject.response_dto.content === "success") {
                    setErrorMessage("");
                    navigate('/Adm-panel_pg');
                } else {
                    setErrorMessage("Invalid username & password..");
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-6 bg-gray-800 text-white rounded-lg shadow-lg">
                <h2 className="text-large-txt font-bold text-center mb-6">Admin Login</h2>
                {errorMessage && (
                    <p className="text-red-500 text-sm text-center mb-4">
                        {errorMessage}
                    </p>
                )}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full mt-1 px-4 py-2 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full mt-1 px-4 py-2 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded text-lg font-semibold transition"
                >
                    Login
                </button>
                <p className="mt-6 text-sm text-center text-gray-400">
                    Only authorized personnel can access the admin panel.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
