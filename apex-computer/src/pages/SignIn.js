import React, { useState } from 'react';
import '../App.css';
import '../css/SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
function SignIn() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLDetails = {
    email: email,
    password: password,
  };

  const signInProcess = async () => {
    const response = await fetch("http://localhost:8080/Apex_Computer-Backend/UserSignIn",
      {
        method: "POST",
        body: JSON.stringify(userLDetails),
        headers: {
          "Content-Type": "application/json"
        }
      });

    if (response.ok) {
      const json = await response.json();

      if (json.success) {
        setTimeout(() => {
          navigate('/');
        }, 800);
      } else {
        if (json.content === "unverified") {
          alert("please go to veriy your account..!");
        } else {
          document.getElementById("message").innerHTML = json.content;
        }
      }
    } else {
      document.getElementById("message").innerHTML = "Please try again later";
    }
  }

  return (
    <>
      <div className='signin_bg'>
        <div className='w-[100%] h-[100vh] flex flex-row justify-center items-center'>
          <div className='container'>
            <div className='main-content'>
              <div className='section1'>
                <div className='w-[100%] h-[100%] flex flex-col items-center justify-center'>
                  <span className='text-center text-[16px] text-[#08435C] font-[Inter] font-medium'>WELCOME TO</span>
                  <span className='text-[#0873A1] text-[30px] font-[Roboto] font-bold'>APEX <span className='text-[#08435C]'>COMPUTERS</span></span>
                  <p className='text-[#08435C] font-[Inter] text-medium-txt w-[65%] text-center mb-[3.5%]'>Log in to get in the moment updates on the things that interest you.</p>

                  <div className='w-[80%] h-auto'>
                    <span className='text-red-600 text-small-txt font-[Inter] font-normal' id='message'></span>
                    <div className='w-[100%] h-auto flex flex-col items-center gap-y-2'>
                      <div class="input-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#08435C" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                        </svg>
                        <input type="email" placeholder="email.." value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div class="input-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#08435C" class="w-5 h-5">
                          <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
                        </svg>
                        <input type="password" placeholder="Password.." value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <span className='text-[#1E6CE1] font-[Inter] text-small-txt text-end w-[80%] my-[3.5%] cursor-pointer'>Forgot password?</span>

                  <button className='signInbtn bg-[#285163] text-large-txt font-[Inter] text-[#BBD8E5] rounded-[25px] py-[8px] w-[80%] mb-[2.5%]' onClick={signInProcess}>SIGN IN</button>
                  <span className='text-[#08435C] text-medium-txt font-[Inter]'>Don't have an Account? <Link to="/signup" className='text-[#1E6CE1] font-semibold cursor-pointer'>Sign Up Now</Link></span>
                </div>
              </div>
              <div className='section2'>
                <div className='about-imgView'>
                  <div className='w-[100%] h-[100%] flex flex-row justify-center items-center'>
                    <div className='w-[80%] h-auto flex flex-col justify-center items-center'>
                      <div className='apex-logo'></div>
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
      </div>
    </>
  )
}

export default SignIn;