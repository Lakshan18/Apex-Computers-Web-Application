import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function NavBar() {

    const checkSigning = async () => {
        const response = await fetch("http://localhost:8080/apex_computer/CheckSignIn");

        if (response.ok) {
            const json = await response.json();

            const response_DTO = json.respDTO;

            if (response_DTO.success) {

                //sign in done....

                const user = response_DTO.content;
                alert(user);
            }

           console.log(response_DTO);
        }
    }

    return (
        <>
            <div className='nav-container'> {/*onLoad={checkSigning}*/}
                <div className='w-[100%] flex flex-row items-center px-[1.7%]'>
                    <div className='w-[80%]'>
                        <span className='text-large-txt cursor-pointer text-[#CECECE]' onClick={checkSigning}>APEX Computers</span>
                    </div>
                    <div className='w-[20%] flex flex-row items-center justify-end'>
                        {/* <select>
                            <option>Sri Lanka</option>
                         </select> */}
                        <div className='w-auto flex gap-4'>
                            <Link to="/signin" className='text-[16px] cursor-pointer text-[#CECECE]' id='signin'>Sign In&nbsp;&nbsp; |</Link>
                            {/* <Link className='text-[16px] cursor-pointer text-[#CECECE]' id='signout'>Sign Out&nbsp;&nbsp; |</Link> */}
                            <span className='text-[16px] text-[#CECECE] cursor-pointer'>Wishlist</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar;