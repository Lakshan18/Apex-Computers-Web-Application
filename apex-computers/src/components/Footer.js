import React from 'react'

function Footer() {

    const setions = [
        {
            title: "PRODUCTS",
            sct1: "Laptops",
            sct2: "PC Accessories",
            sct3: "PC Build",
            sct4: "Monitors",
            sct5: "Gaming Accessories",
            sct6: "CCTV Camera",
        },
        {
            title: "SERVICE",
            sct1: "About Us",
            sct2: "Delivery Information",
            sct3: "Privacy & Policy",
            sct4: "Discount",
            sct5: "Customer Service",
            sct6: "Terms & Condition",
        },
        {
            title: "INFORMATION",
            sct1: "News",
            sct2: "Delivery Information",
            sct3: "Contact Us",
            sct4: "Search",
            sct5: "About Us",
            sct6: "Online Support",
        },
    ];

    const quickLinks = [];

    const links = [
        "Laptops",
        "Desktops",
        "Monitors",
        "Storage",
        "VGA Card",
        "Processors",
        "Casings",
        "RGB Fans",
        "Motherboards",
        "Headphones",
        "Speakers",
        "Keyboard",
        "Mouse",
        "Power Supply",
        "UPS",
        "Pen Drives",
    ];

    links.forEach((link, index) => {
        quickLinks.push(
            <span key={index} className='text-[#8DACBE] px-[12px] text-small-txt font-[Inter] font-normal' style={{ borderRight: '1px solid #fff' }}>{link}</span>
        );
    });

    return (
        <>
            <div className='main-container'>
                <div className='w-[100%] h-auto bg-[#233234] px-[4%] pt-[2%] pb-[1.1%]'>
                    <div className='flex flex-row items-start justify-between'>
                        <div className='flex flex-col justify-center'>
                            <span className='text-[#2BA6EB] text-subHeading-txt font-medium font-[Inter] mb-2'>CONTACT US</span>
                            <span className='text-[#8DACBE] text-medium-txt font-[Inter] font-medium'>No.231, 4th Floor, Havlock Street, Colombo 10.</span>
                            <span className='text-[#8DACBE] text-medium-txt font-[Inter] font-medium'>+94 112 300 200</span>
                            <span className='text-[#8DACBE] text-medium-txt font-[Inter] font-medium'>+94 112 300 200</span>
                            <span className='text-[#8DACBE] text-medium-txt font-[Inter] font-medium'>apexcomputers@email.com</span>
                            <div className='flex flex-row items-center gap-x-5 pt-[12%]'>
                                <div className='w-[34px] h-[34px] object-cover cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 258"><defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#1faf38" /><stop offset="100%" stop-color="#60d669" /></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#f9f9f9" /><stop offset="100%" stop-color="#fff" /></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004" /><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z" /><path fill="#fff" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64" /></svg>
                                </div>
                                <div className='w-[34px] h-[34px] object-cover cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445" /><path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z" /></svg>
                                </div>
                                <div className='w-[34px] h-[34px] object-cover cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="url(#skillIconsInstagram0)" rx="60" /><rect width="256" height="256" fill="url(#skillIconsInstagram1)" rx="60" /><path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334" /><defs><radialGradient id="skillIconsInstagram0" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse"><stop stop-color="#fd5" /><stop offset=".1" stop-color="#fd5" /><stop offset=".5" stop-color="#ff543e" /><stop offset="1" stop-color="#c837ab" /></radialGradient><radialGradient id="skillIconsInstagram1" cx="0" cy="0" r="1" gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)" gradientUnits="userSpaceOnUse"><stop stop-color="#3771c8" /><stop offset=".128" stop-color="#3771c8" /><stop offset="1" stop-color="#60f" stop-opacity="0" /></radialGradient></defs></g></svg>
                                </div>
                                <div className='w-[34px] h-[34px] object-cover cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60" /><rect width="256" height="256" fill="#1d9bf0" rx="60" /><path fill="#fff" d="M199.572 91.411c.11 1.587.11 3.174.11 4.776c0 48.797-37.148 105.075-105.075 105.075v-.03A104.54 104.54 0 0 1 38 184.677q4.379.525 8.79.533a74.15 74.15 0 0 0 45.865-15.839a36.98 36.98 0 0 1-34.501-25.645a36.8 36.8 0 0 0 16.672-.636c-17.228-3.481-29.623-18.618-29.623-36.198v-.468a36.7 36.7 0 0 0 16.76 4.622c-16.226-10.845-21.228-32.432-11.43-49.31a104.8 104.8 0 0 0 76.111 38.582a36.95 36.95 0 0 1 10.683-35.283c14.874-13.982 38.267-13.265 52.249 1.601a74.1 74.1 0 0 0 23.451-8.965a37.06 37.06 0 0 1-16.234 20.424A73.5 73.5 0 0 0 218 72.282a75 75 0 0 1-18.428 19.13" /></g></svg>
                                </div>
                                <div className='w-[34px] h-[34px] object-cover cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60" /><rect width="256" height="256" fill="#0a66c2" rx="60" /><path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4" /></g></svg>
                                </div>
                            </div>
                        </div>
                        {setions.map((sector) => (
                            <div className='flex flex-col justify-center'>
                                <span className='text-[#2BA6EB] text-subHeading-txt font-medium font-[Inter] mb-2'>{sector.title}</span>
                                <span className='text-[#8DACBE] text-medium-txt font-[Inter] font-medium'>{sector.sct1}</span>
                                <span className='text-[#8DACBE] text-medium-txt font-[Inter] font-medium'>{sector.sct2}</span>
                                <span className='text-[#8DACBE] text-medium-txt font-[Inter] font-medium'>{sector.sct3}</span>
                                <span className='text-[#8DACBE] text-medium-txt font-[Inter] font-medium'>{sector.sct4}</span>
                                <span className='text-[#8DACBE] text-medium-txt font-[Inter] font-medium'>{sector.sct5}</span>
                                <span className='text-[#8DACBE] text-medium-txt font-[Inter] font-medium'>{sector.sct6}</span>
                            </div>
                        ))}
                    </div>
                    <hr className='w-[100%] mt-[2.5%]' style={{ border: '1px solid #3F5A69' }} />
                    <div className='w-[95%] my-[1.5%] h-auto flex flex-row justify-center items-center py-[1%]'>
                        {quickLinks}
                    </div>
                    <div className='w-[100%] h-auto flex flex-row justify-between items-center'>
                        <span className='text-[#fff] text-small-txt font-normal font-[Inter]'>© apex computers  | 2024 All right Reserved.</span>
                        <div className='flex flex-row items-center gap-x-4'>
                            <div className='w-[30px] h-auto object-cover'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 576 512"><path fill="#72c1fd" d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5c-.2.3 3.3-9.1 5.3-14.9zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48M152.5 331.2L215.7 176h-42.5l-39.3 106l-4.3-21.5l-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135zm94.4.2L272.1 176h-40.2l-25.1 155.4zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3c-14.1-7.1-22.7-11.9-22.7-19.2c.2-6.6 7.3-13.4 23.1-13.4c13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7l5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6c-39.7 0-67.6 21.2-67.8 51.4c-.3 22.3 20 34.7 35.2 42.2c15.5 7.6 20.8 12.6 20.8 19.3c-.2 10.4-12.6 15.2-24.1 15.2c-16 0-24.6-2.5-37.7-8.3l-5.3-2.5l-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3c42.2.1 69.7-20.8 70-53M528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3z" /></svg>
                            </div>
                            <div className='w-[30px] h-auto object-cover'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 199"><path d="M46.54 198.011V184.84c0-5.05-3.074-8.342-8.343-8.342c-2.634 0-5.488.878-7.464 3.732c-1.536-2.415-3.731-3.732-7.024-3.732c-2.196 0-4.39.658-6.147 3.073v-2.634h-4.61v21.074h4.61v-11.635c0-3.731 1.976-5.488 5.05-5.488c3.072 0 4.61 1.976 4.61 5.488v11.635h4.61v-11.635c0-3.731 2.194-5.488 5.048-5.488c3.074 0 4.61 1.976 4.61 5.488v11.635zm68.271-21.074h-7.463v-6.366h-4.61v6.366h-4.171v4.17h4.17v9.66c0 4.83 1.976 7.683 7.245 7.683c1.976 0 4.17-.658 5.708-1.536l-1.318-3.952c-1.317.878-2.853 1.098-3.951 1.098c-2.195 0-3.073-1.317-3.073-3.513v-9.44h7.463zm39.076-.44c-2.634 0-4.39 1.318-5.488 3.074v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.536-5.488 4.39-5.488c.878 0 1.976.22 2.854.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-59.052 2.196c-2.196-1.537-5.269-2.195-8.562-2.195c-5.268 0-8.78 2.634-8.78 6.805c0 3.513 2.634 5.488 7.244 6.147l2.195.22c2.415.438 3.732 1.097 3.732 2.195c0 1.536-1.756 2.634-4.83 2.634s-5.488-1.098-7.025-2.195l-2.195 3.512c2.415 1.756 5.708 2.634 9 2.634c6.147 0 9.66-2.853 9.66-6.805c0-3.732-2.854-5.708-7.245-6.366l-2.195-.22c-1.976-.22-3.512-.658-3.512-1.975c0-1.537 1.536-2.415 3.951-2.415c2.635 0 5.269 1.097 6.586 1.756zm122.495-2.195c-2.635 0-4.391 1.317-5.489 3.073v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.537-5.488 4.39-5.488c.879 0 1.977.22 2.855.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-58.833 10.976c0 6.366 4.39 10.976 11.196 10.976c3.073 0 5.268-.658 7.463-2.414l-2.195-3.732c-1.756 1.317-3.512 1.975-5.488 1.975c-3.732 0-6.366-2.634-6.366-6.805c0-3.951 2.634-6.586 6.366-6.805c1.976 0 3.732.658 5.488 1.976l2.195-3.732c-2.195-1.757-4.39-2.415-7.463-2.415c-6.806 0-11.196 4.61-11.196 10.976m42.588 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.073 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.904 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805m-55.1-10.976c-6.147 0-10.538 4.39-10.538 10.976s4.39 10.976 10.757 10.976c3.073 0 6.147-.878 8.562-2.853l-2.196-3.293c-1.756 1.317-3.951 2.195-6.146 2.195c-2.854 0-5.708-1.317-6.367-5.05h15.587v-1.755c.22-6.806-3.732-11.196-9.66-11.196m0 3.951c2.853 0 4.83 1.757 5.268 5.05h-10.976c.439-2.854 2.415-5.05 5.708-5.05m114.372 7.025v-18.879h-4.61v10.976c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.903 0c0-3.732 2.414-6.805 6.366-6.805c3.732 0 6.366 2.854 6.366 6.805c0 3.732-2.634 6.805-6.366 6.805c-3.952-.22-6.366-3.073-6.366-6.805m-154.107 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-17.123 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805" /><path fill="#ff5f00" d="M93.298 16.903h69.15v124.251h-69.15z" /><path fill="#eb001b" d="M97.689 79.029c0-25.245 11.854-47.637 30.074-62.126C114.373 6.366 97.47 0 79.03 0C35.343 0 0 35.343 0 79.029s35.343 79.029 79.029 79.029c18.44 0 35.343-6.366 48.734-16.904c-18.22-14.269-30.074-36.88-30.074-62.125" /><path fill="#f79e1b" d="M255.746 79.029c0 43.685-35.343 79.029-79.029 79.029c-18.44 0-35.343-6.366-48.734-16.904c18.44-14.488 30.075-36.88 30.075-62.125s-11.855-47.637-30.075-62.126C141.373 6.366 158.277 0 176.717 0c43.686 0 79.03 35.563 79.03 79.029" /></svg>
                            </div>
                            <div className='w-[30px] h-auto object-cover'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 36 24"><path fill="#1179e8" d="M33.6 24H2.4A2.4 2.4 0 0 1 0 21.6V11.504h1.729l.39-.944h.873l.389.94h3.402v-.715l.304.72h1.766l.304-.732v.73h8.453V9.959h.16c.114.004.147.014.147.204v1.342h4.373v-.359c.447.227.974.36 1.533.36l.095-.001h-.005h1.84l.394-.94h.873l.385.94h3.546v-.894l.536.894h2.836V5.601h-2.807v.697l-.393-.697h-2.886v.697l-.361-.697h-3.897a3.5 3.5 0 0 0-1.709.353l.021-.009v-.344h-2.688v.344a1.63 1.63 0 0 0-1.149-.343h.006h-9.823l-.659 1.525l-.677-1.525H4.207v.697l-.341-.697h-2.64l-1.223 2.8v-6a2.4 2.4 0 0 1 2.4-2.4h31.2a2.4 2.4 0 0 1 2.4 2.4v10.48H34.13q-.047-.002-.101-.002c-.434 0-.837.13-1.173.353l.008-.005v-.346h-2.77a1.92 1.92 0 0 0-1.215.349l.006-.004v-.346h-4.946v.346a2.7 2.7 0 0 0-1.327-.346h-.039h.002h-3.263v.346a2.25 2.25 0 0 0-1.436-.345l.009-.001h-3.651l-.836.904l-.782-.904H7.162v5.908h5.352l.861-.918l.811.918h3.299v-1.383h.46a3.2 3.2 0 0 0 1.296-.217l-.022.008v1.594h2.72v-1.539h.131c.166 0 .183.006.183.174v1.366h8.266l.101.002c.474 0 .916-.142 1.284-.385l-.009.005v.378h2.622l.125.002c.491 0 .958-.101 1.382-.284l-.023.009v3.082a2.4 2.4 0 0 1-2.4 2.4zm-12.495-6.039h-1.018v-4.235h2.336a2.45 2.45 0 0 1 1.233.206l-.016-.006c.313.172.522.5.522.876l-.002.067v-.003l.001.038c0 .486-.293.904-.713 1.086l-.008.003c.201.072.369.195.494.354l.002.002a1.23 1.23 0 0 1 .168.779l.001-.006v.838h-1.016v-.53a1.2 1.2 0 0 0-.163-.834l.003.005a.98.98 0 0 0-.748-.187l.006-.001h-1.082v1.547zm0-3.36v.951h1.23a.97.97 0 0 0 .506-.09l-.006.003a.46.46 0 0 0 .21-.385l-.001-.023v.001a.4.4 0 0 0-.207-.38l-.002-.001a1 1 0 0 0-.484-.08h.004zM12.08 17.96H8.073v-4.234h4.07l1.245 1.388l1.287-1.388h3.233c1.148 0 1.706.457 1.706 1.395c0 .955-.577 1.419-1.76 1.419h-1.265v1.419h-1.967l-1.246-1.399zm3.501-3.78l-1.554 1.67l1.554 1.724zm-6.499 2.055v.842h2.488l1.15-1.242l-1.106-1.234H9.081v.77h2.222v.863zm7.507-1.633v1.078h1.307c.4 0 .63-.204.63-.56c0-.34-.214-.519-.619-.519zm18.038 3.36h-1.954v-.91h1.946a.56.56 0 0 0 .411-.106l-.001.001a.37.37 0 0 0 .119-.273v-.016a.35.35 0 0 0-.123-.266a.5.5 0 0 0-.358-.094h.002l-.187-.006c-.914-.024-1.949-.052-1.949-1.305c0-.61.382-1.261 1.451-1.261h2.017v.902h-1.845a.7.7 0 0 0-.412.082l.004-.002a.33.33 0 0 0-.147.302v-.001v.011a.32.32 0 0 0 .22.304l.002.001a1.1 1.1 0 0 0 .392.048h-.003l.549.014a1.58 1.58 0 0 1 1.151.343l-.003-.002q.045.036.079.079l.001.001l.012 1.612a1.58 1.58 0 0 1-1.381.541zm-3.949 0h-1.972v-.91h1.962a.58.58 0 0 0 .415-.106l-.002.001a.37.37 0 0 0 .118-.273v-.01a.36.36 0 0 0-.123-.272a.53.53 0 0 0-.363-.094h.002l-.186-.006c-.911-.024-1.945-.052-1.945-1.305c0-.61.38-1.261 1.447-1.261h2.028v.902h-1.856a.7.7 0 0 0-.409.082l.004-.002a.354.354 0 0 0 .066.619l.002.001a1.1 1.1 0 0 0 .397.048h-.003l.545.014a1.6 1.6 0 0 1 1.158.344l-.003-.003a1.18 1.18 0 0 1 .302.901v-.005c.003.883-.532 1.333-1.587 1.333zm-2.578 0h-3.38v-4.237h3.377v.875H25.73v.77h2.312v.863H25.73v.842l2.37.004v.88zm1.97-7.286h-2.061l-.394-.944h-2.102l-.382.944h-1.184a2.18 2.18 0 0 1-1.472-.471l.005.003a2.12 2.12 0 0 1-.54-1.625l-.001.008a2.2 2.2 0 0 1 .548-1.657l-.002.002a2.03 2.03 0 0 1 1.545-.492l-.008-.001h.98v.903h-.96a.96.96 0 0 0-.78.251l.001-.001a1.4 1.4 0 0 0-.291.964v-.005a1.46 1.46 0 0 0 .281.998l-.003-.004a.98.98 0 0 0 .709.218h-.004h.454l1.431-3.33h1.52l1.713 4v-4h1.541l1.778 2.948V6.437h1.04v4.232h-1.444l-1.92-3.178v3.178zm-3.499-3.518l-.697 1.688h1.397zm-9.799 3.516H15.76V6.44h2.328a2.36 2.36 0 0 1 1.241.209l-.015-.006a1 1 0 0 1 .514.871l-.002.07v-.003v.031a1.2 1.2 0 0 1-.706 1.094l-.008.003c.201.076.37.198.499.354l.002.002a1.2 1.2 0 0 1 .167.783l.001-.006v.831H18.76l-.004-.534v-.08a1.1 1.1 0 0 0-.163-.749l.003.005a1 1 0 0 0-.744-.181l.006-.001h-1.085v1.54zm0-3.353v.94H18a.9.9 0 0 0 .505-.09l-.005.002a.44.44 0 0 0 .21-.373l-.001-.028v.001a.39.39 0 0 0-.211-.373l-.002-.001a1 1 0 0 0-.483-.08h.003zM6.056 10.674H4l-.389-.944H1.503l-.392.944h-1.1L1.824 6.44h1.503l1.721 4.007V6.44h1.651l1.324 2.871L9.24 6.44h1.685v4.232h-1.04L9.883 7.36l-1.467 3.313h-.888L6.057 7.355v3.318zM2.552 7.158l-.689 1.688h1.382zm18.888 3.515h-1.032V6.44h1.033v4.232zm-6.386 0H11.68V6.44h3.38v.88h-2.368v.763h2.311v.869H12.69v.846h2.368v.874z" /></svg>
                            </div>
                            <div className='w-[30px] h-auto object-cover'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 302"><path fill="#27346a" d="M217.168 23.507C203.234 7.625 178.046.816 145.823.816h-93.52A13.39 13.39 0 0 0 39.076 12.11L.136 259.077c-.774 4.87 2.997 9.28 7.933 9.28h57.736l14.5-91.971l-.45 2.88c1.033-6.501 6.593-11.296 13.177-11.296h27.436c53.898 0 96.101-21.892 108.429-85.221c.366-1.873.683-3.696.957-5.477q-2.334-1.236 0 0c3.671-23.407-.025-39.34-12.686-53.765" /><path fill="#27346a" d="M102.397 68.84a11.7 11.7 0 0 1 5.053-1.14h73.318c8.682 0 16.78.565 24.18 1.756a102 102 0 0 1 6.177 1.182a90 90 0 0 1 8.59 2.347c3.638 1.215 7.026 2.63 10.14 4.287c3.67-23.416-.026-39.34-12.687-53.765C203.226 7.625 178.046.816 145.823.816H52.295C45.71.816 40.108 5.61 39.076 12.11L.136 259.068c-.774 4.878 2.997 9.282 7.925 9.282h57.744L95.888 77.58a11.72 11.72 0 0 1 6.509-8.74" /><path fill="#2790c3" d="M228.897 82.749c-12.328 63.32-54.53 85.221-108.429 85.221H93.024c-6.584 0-12.145 4.795-13.168 11.296L61.817 293.621c-.674 4.262 2.622 8.124 6.934 8.124h48.67a11.71 11.71 0 0 0 11.563-9.88l.474-2.48l9.173-58.136l.591-3.213a11.71 11.71 0 0 1 11.562-9.88h7.284c47.147 0 84.064-19.154 94.852-74.55c4.503-23.15 2.173-42.478-9.739-56.054c-3.613-4.112-8.1-7.508-13.327-10.28c-.283 1.79-.59 3.604-.957 5.477" /><path fill="#1f264f" d="M216.952 72.128a90 90 0 0 0-5.818-1.49a110 110 0 0 0-6.177-1.174c-7.408-1.199-15.5-1.765-24.19-1.765h-73.309a11.6 11.6 0 0 0-5.053 1.149a11.68 11.68 0 0 0-6.51 8.74l-15.582 98.798l-.45 2.88c1.025-6.501 6.585-11.296 13.17-11.296h27.444c53.898 0 96.1-21.892 108.428-85.221c.367-1.873.675-3.688.958-5.477q-4.682-2.47-10.14-4.279a83 83 0 0 0-2.77-.865" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;