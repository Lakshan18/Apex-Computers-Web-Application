import React, { useEffect, useState } from 'react';
import '../App.css';
import '../css/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate();


    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [coPassword, setCoPassword] = useState("");

    const userDTO = {
        first_name: fName,
        last_name: lName,
        email: email,
        password: password,
        conf_password: coPassword,
    };

    // request process to servlet....

    const signUpProcess = async () => {

        const response = await fetch("http://localhost:8080/apex_computer/User_Register",
            {
                method: "POST",
                body: JSON.stringify(userDTO),
                headers: {
                    "Content-Type": "application/json",
                },
            });

        if (response.ok) {
            const json = await response.json();

            if (json.success) {
                setIsLoading(true);

                setTimeout(() => {
                    setIsLoading(false);
                    setIsModalOpen(true);
                }, 6000);
            } else {
                document.getElementById("message").innerHTML = json.content;
            }
        } else {
            document.getElementById("message").innerHTML = "something went wrong. try again later.!!";
        };
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {

        if (isModalOpen) {
            setTimeout(() => {
                setIsAnimating(true);
            }, 10);
        } else {
            setIsAnimating(false);
        }

    }, [isModalOpen]);

    const backToSignUp = () => {
        setIsModalOpen(false);
    }

    const [vCode, setVCode] = useState("");

    const codeObj = {
        v_code: vCode,
    };

    const verifyAccount = async () => {

        if (vCode.length === 0) {
            alert("please enter your v Code");
        } else if (vCode.length < 5) {
            alert("invalid v Code");
        } else {

            const response = await fetch("http://localhost:8080/apex_computer/Verify_Account",
                {
                    method: "POST",
                    body: JSON.stringify(codeObj),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            if (response.ok) {
                const json = response.json();

                if (json === "success") {
                    navigate('/signin');
                } else {
                    document.getElementById("errorVC").innerHTML = json.content;
                }
            };
        }
    }


    return (
        <>

            <div className='signup_bg'>
                <div className='w-[100%] relative z-10 h-[100vh] flex flex-row justify-center items-center'>

                    {/* Loading spinner (optional) */}
                    {isLoading && (
                        <div className="fixed z-20 inset-0 flex justify-center items-center">
                            <div className="w-12 h-12 border-4 border-t-blue-600 border-blue-300 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed z-20 inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out">
                            <div
                                className={`bg-blue-200 rounded-md p-8 w-1/3 shadow-lg transform transition-all duration-300 ease-out ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                    }`}
                            >
                                <h2 className="text-large-txt text-center font-medium mb-4 font-[Inter]">Verify Your Account</h2>
                                <p className="mb-4 text-center text-medium-txt font-[Inter]">
                                    Thank you for signing up! Please enter your verification code to verify your account..!!
                                </p>
                                <div className='flex flex-col'>
                                    <span className='text-red-600 font-[Inter] text-small-txt' id='errorVC'></span>
                                    <div className='input-container2 mb-2'>
                                        <input type="text" placeholder='012345' value={vCode} onChange={(e) => setVCode(e.target.value)} />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <button
                                        onClick={backToSignUp}
                                        className="px-6 py-1.5 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition duration-300"
                                    >
                                        back
                                    </button>
                                    <button
                                        onClick={verifyAccount}
                                        className="px-6 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                    >
                                        verify
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='container2'>
                        <div className='main-content2'>
                            <div className='section2_1'>
                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-center'>
                                    <span className='text-center text-[16px] text-[#08435C] font-[Inter] font-medium'>WELCOME TO</span>
                                    <span className='text-[#0873A1] text-[30px] font-[Roboto] font-bold'>APEX <span className='text-[#08435C]'>COMPUTERS</span></span>
                                    <p className='text-[#08435C] font-[Inter] text-medium-txt w-[65%] text-center mb-[3.5%]'>Log in to get in the moment updates on the things that interest you.</p>

                                    <div className='w-[80%] h-auto gap-y-2'>
                                        <span className='text-red-600 text-small-txt font-[Inter] font-normal' id='message'></span>
                                        <div className='w-[100%] h-auto gap-y-2 flex flex-col mt-2'>
                                            <div class="input-container2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#08435C" className="w-5 h-5">
                                                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                                                </svg>
                                                <input type="text" placeholder="First Name" value={fName} onChange={(e) => setFname(e.target.value)} />
                                            </div>
                                            <div class="input-container2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#08435C" className="w-5 h-5">
                                                    <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
                                                </svg>
                                                <input type="text" placeholder="Last Name" value={lName} onChange={(e) => setLname(e.target.value)} />
                                            </div>
                                            <div class="input-container2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#08435C" className="w-5 h-5">
                                                    <path fill-rule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clip-rule="evenodd" />
                                                </svg>
                                                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div class="input-container2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#08435C" class="w-5 h-5">
                                                    <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
                                                </svg>
                                                <input type="password" placeholder="Password" value={password} maxLength={15} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            <div class="input-container2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#08435C" class="w-5 h-5">
                                                    <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
                                                </svg>
                                                <input type="password" placeholder="Confirm Password" value={coPassword} maxLength={15} onChange={(e) => setCoPassword(e.target.value)} />
                                            </div>
                                        </div>

                                    </div>

                                    <span className='text-[#1E6CE1] font-[Inter] text-small-txt text-end w-[80%] my-[3.5%] cursor-pointer'>Forgot password?</span>

                                    <button className='signupBtn bg-[#285163] text-large-txt font-[Inter] text-[#BBD8E5] rounded-[25px] py-[8px] w-[80%] mb-[2.5%]' onClick={signUpProcess} disabled={isLoading}>{isLoading ? 'Signing Up...' : 'SIGN UP'}</button>
                                    <span className='text-[#08435C] text-medium-txt font-[Inter]'>Don't have an Account? <Link to="/signin" className='text-[#1E6CE1] font-semibold cursor-pointer'>Sign Now</Link></span>
                                </div>
                            </div>
                            <div className='section2_2'>
                                <div className='about-imgView2'>
                                    <div className='w-[100%] h-[100%] flex flex-row justify-center items-center'>
                                        <div className='w-[80%] h-auto flex flex-col justify-center items-center'>
                                            <div className='apex-logo2'></div>
                                            <span className='font-[Roboto] font-bold text-[#fff] text-[32px] mb-[3%]'>APEX <span className='text-[#00B2FF]'>Computers</span></span>
                                            <p className='text-small-txt text-[#9BDBF7] text-center'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Fugiat esse illum quidem molestiae ab consequuntur, neque
                                                aliquam molestias ex similique placeat inventore? Perferendis
                                                nihil sit quo distinctio harum sed, magni consequuntur, architecto
                                                doloribus debitis accusamus laboriosam sapiente ducimus ipsam obcaecati,
                                                odio vel voluptas excepturi. Magni?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SignUp;