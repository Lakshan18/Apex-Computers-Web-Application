import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function NavBar() {
    const [profileInfo, setProfileInfo] = useState(null);

    const checkSigning = async () => {
        try {
            const response = await fetch("http://localhost:8080/apex_comp-backend/Check_Signin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const respObj = await response.json();
                const contactInfo = respObj.response_dto.content;

                if (typeof contactInfo === "object" && contactInfo !== null) {
                    const userInfo = {
                        id: contactInfo.id,
                        email: contactInfo.email,
                        name: contactInfo.name,
                    };
                    sessionStorage.setItem("user_info", JSON.stringify(userInfo));
                    setProfileInfo(userInfo.name);
                } else {
                    console.warn("Invalid contact info received:", contactInfo);
                }
            } else {
                sessionStorage.removeItem("user_info");
                setProfileInfo("");
            }
        } catch (error) {
            console.error("Error during checkSigning:", error);
        }
    };


    useEffect(() => {
        const savedInfo = sessionStorage.getItem("user_info");
        if (savedInfo) {
            setProfileInfo(JSON.parse(savedInfo));
        } else {
            checkSigning();
        }
    }, []);

    return (
        <>
            <div className="nav-container">
                <div className="w-[100%] flex flex-row items-center px-[1.7%]">
                    <div className="w-[80%]">
                        <span className="text-large-txt cursor-pointer text-[#CECECE]">
                            APEX Computers
                        </span>
                    </div>
                    <div className="w-[20%] flex flex-row items-center justify-end">
                        <div className="w-auto flex gap-4">
                            {profileInfo ? (
                                <>
                                    <span className="text-[16px] cursor-pointer text-[#CECECE]">
                                        {profileInfo.name} |
                                    </span>
                                    <Link
                                        className="text-[16px] cursor-pointer text-[#c35656]"
                                        onClick={async () => {
                                            const response = await fetch("http://localhost:8080/apex_comp-backend/User_SignOut", {
                                                method: "GET",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                credentials: "include",
                                            });

                                            if (response.ok) {
                                                const respObj = await response.json();
                                                console.log(respObj);
                                                if (respObj.content === "done") {
                                                    sessionStorage.removeItem("user_info");
                                                    alert("You are signed out now.");
                                                    setTimeout(() => {
                                                        window.location.reload();
                                                    }, 1600);
                                                } else {
                                                    console.log(response);
                                                    alert("You are already signed out.");
                                                }
                                            }
                                        }}
                                    >
                                        Sign Out
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to="/signin"
                                    className="text-[16px] cursor-pointer text-[#7fc9ee]"
                                >
                                    Sign In |
                                </Link>
                            )}
                            <span className="text-[16px] text-[#CECECE] cursor-pointer">
                                Wishlist
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;
