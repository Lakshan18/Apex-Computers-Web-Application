import { React, useEffect, useRef, useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {

    const navigate = useNavigate();

    // const singleProductView = () => {
    //     navigate("/singleProductView");
    // };

    const goToCart = () => {
        navigate("/cart");
    }

    const slides = [
        {
            id: 1,
            image: './images/product-images/collection1.png',
            title: 'New MacBook Pro',
            subtitle: 'Up To 40% Off in This Season',
        },
        {
            id: 2,
            image: './images/product-images/VGA-Card.png',
            title: 'NVIDIA RTX 4070',
            subtitle: 'Latest Gadgets Available',
        },
        {
            id: 3,
            image: './images/product-images/headphone.png',
            title: 'JBL Ex7G Pro Matrix',
            subtitle: 'Grab them while stock lasts!',
        },
        {
            id: 4,
            image: './images/product-images/collection_2.png',
            title: 'Super Nova PC Build',
            subtitle: 'Best for Gamers..!',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    // Auto-slide effect
    useEffect(() => {
        const slideInterval = setInterval(() => {
            goNextSlide();
        }, 5000); // Change slide every 3 seconds

        return () => clearInterval(slideInterval); // Cleanup on unmount
    });

    // Handle slide change with fade animation
    const goNextSlide = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            setIsFading(false);
        }, 500); // Match this with the transition duration
    };

    // Handler for dot click to navigate
    const goToSlide = (index) => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsFading(false);
        }, 500); // Match this with the transition duration
    };

    // new collection cards create....

    const collectionCard = [];

    for (let c = 1; c < 4; c++) {
        collectionCard.push(
            <div className='w-[460px] h-[280px] bg-[#3A4549] rounded-[8px]'>
                <div className='w-[100%] h-[100%] flex items-center justify-center'>
                    <div className='w-[80%] h-auto flex flex-col justify-center gap-y-4'>
                        <span className='text-[#7DB2C2] text-subHeading-txt font-[Inter] font-medium' key={c}>NEW COLLECTION {c}</span>
                        <span className='text-[#C2CBCE] text-large-txt font-[Inter] font-medium'>UP TO 25% DISCOUNT</span>
                        <div className='flex items-center gap-x-1 mt-[15%]'>
                            <span className='text-[#00C2FF] text-[16px] font-[Inter] font-medium'>Shop Now</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#00C2FF" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00C2FF" class="mt-1 w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // const [product, setProducts] = useState("");
    // top products card create......

    const sliderRef = useRef(null);

    const handleScroll = (direction) => {
        const cardWidth = sliderRef.current.children[0].offsetWidth; // Get the width of a single card (including gap)
        const scrollAmount = cardWidth * 5; // Scroll 5 cards at a time

        if (direction === "left") {
            sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    // services icon.........

    const services = [
        {
            icon: "./images/support-icon.png",
            name: "24 X 7 Customer Support",
            option: "Online Support",
        },
        {
            icon: "./images/coin-icon.png",
            name: "Money Bank Guarantee",
            option: "100% Secure Payment",
        },
        {
            icon: "./images/delivery-icon.png",
            name: "Free Worldwide Shipping",
            option: "On Order Over $99 ",
        },
        {
            icon: "./images/gift-icon.png",
            name: "Special Gift Cards",
            option: "Give the Perfect Gift",
        },
    ];

    const loadCategory = async () => {

        const response = await fetch("http://localhost:8080/apex_comp-backend/Load_Category",
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
                populateDropdown(respObj.content);
            } else {
                console.error("No categories available.");
            }
        } else {
            console.log(response);
        }

    }

    const brandIcons = [
        {
            image: "./images/AsusIC1.png",
        },
        {
            image: "./images/appleIcon1.png",
        },
        {
            image: "./images/hpIC1.png",
        },
        {
            image: "./images/msiIC1.png",
        },
        {
            image: "./images/dellIC1.png",
        },
    ];

    // this area used onloading functions

    // const [contactInfo,setContactInfo] = useState("");

    // const checkSigning = async () => {
    //     const response = await fetch("http://localhost:8080/apex_comp-backend/Check_Signin",
    //         {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             credentials: "include",
    //         }
    //     );

    //     if (response.ok) {
    //         const respObj = await response.json();
    //         let contactInfo = respObj.response_dto.content;
    //         setProfileStatus(contactInfo.first_name + " " + contactInfo.last_name);
    //     } else {
    //         setProfileStatus("");
    //     }
    // }

    useEffect(() => {
        // checkSigning();

        // const userNameFromSession = sessionStorage.getItem("user_info");
        // if (userNameFromSession) {
        //     setContactInfo(userNameFromSession);
        // }

        loadCategory();
        loadProducts();
    }, []);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');

        if (firstLogin === 'true') {
            localStorage.removeItem('firstLogin');

            window.location.reload();
        }
    }, []);

    // this area used onloading functions

    const populateDropdown = (categories) => {
        const dropdown = document.querySelector('.dropdown');
        dropdown.innerHTML = `<option className='text-medium-txt'>All Categories</option>`;

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            dropdown.appendChild(option);
        });
    };

    // state for set a productslist.....
    const [topProducts, setTopProducts] = useState([]);

    const loadProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/apex_comp-backend/Load_AllProducts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const respObject = await response.json();
                const products = respObject.content.map((product) => ({
                    id: product.id,
                    pr_title: product.title,
                    brand: product.brand,
                    price: product.price,
                    qty: product.quantity,
                    // available: product.product_status === "Available" ? "IN-STOCK" : "OUT-OF-STOCK",
                    image: product.image,
                    desc: product.description,
                }));
                setTopProducts(products);
            } else {
                console.error("Failed to load products:", response);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    // state for search area....
    const [searchDetails, setSearchDetails] = useState("");

    const handleBasicSearch = () => {
        if (searchDetails.trim()) {
            navigate(`/search-results?query=${encodeURIComponent(searchDetails)}`);
        }
    };

    const handleProfileClick = () => {
        const userInfo = JSON.parse(sessionStorage.getItem("user_info"));
        if (userInfo && userInfo.id) {
            navigate(`/my-profile/${userInfo.id}`);
        } else {
            alert("User not signed in!");
        }
    };

    return (

        <>

            <NavBar />

            <body className='main-bodyContainer'>


                <div className='main-container'>

                    <div className='w-[95%] flex flex-col items-center'>
                        <div className='w-full h-auto flex flex-row items-center justify-between mt-[2%] mb-[2.5%]'>
                            <div className='main-logo-box'>
                                <img src="./images/Apex-main-logo.png" alt="Apex Logo" className='main-logo-view' />
                            </div>
                            <div className='w-auto flex flex-row'>
                                <div class="search-container me-5">
                                    <input type="text" placeholder="Search..." className="search-input"
                                        value={searchDetails}
                                        onChange={(e) => setSearchDetails(e.target.value)}
                                    />
                                    <button class="search-button" onClick={handleBasicSearch}>Search</button>
                                    {/* <Link to='/signin' className='search-button'>Go To Sign Up</Link> */}
                                </div>
                                <div class="icon-container">
                                    <div class="shopping-icon cursor-pointer" onClick={goToCart}>
                                        <img src="./images/shopping.png" alt="shopping-icon" className='cart-icon-view' />
                                    </div>
                                    {/* <div class="badge">3</div> */}
                                </div>
                            </div>
                            <div className=' flex flex-row items-center'>
                                {/* <span className='text-medium-txt text-[#CECECE] font-semibold font-[Quicksand] pe-3'>{contactInfo}</span> */}
                                <div className='icon-box'>
                                    <img src="./images/User.png" alt="User-Img" className='icon-view'
                                        onClick={handleProfileClick}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='main-container relative bg-[#314248] mt-[1.8%]'>

                    <div className='w-[95%] h-auto py-[0.3%] bg-[#627E84] absolute -top-14 rounded-[6px]'>
                        <div className='w-[100%] flex flex-row justify-between items-center'>
                            <div className='flex flex-row items-center'>
                                <div className='notify-img1'>
                                    <img src="./images/product-images/collection1.png" alt="notify1" className='notify-img-view' />
                                </div>
                                <div className='notify-img1'>
                                    <img src="./images/product-images/collection_2.png" alt="notify1" className='notify-img-view' />
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-y-2'>
                                <span className='text-[#fff] font-[Inter] font-semibold text-large-txt text-center'>New Collection 2024</span>
                                <span className='text-medium-txt text-[#EBFF00] font-[Inter] font-medium text-center'>UP TO 25% DISCOUNT</span>
                            </div>
                            <div className='flex flex-row items-center'>
                                <div className='notify-img1'>
                                    <img src="./images/product-images/VGA-card.png" alt="notify1" className='notify-img-view' />
                                </div>
                                <div className='notify-img1'>
                                    <img src="./images/product-images/headphone.png" alt="notify1" className='notify-img-view' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-[95%] flex flex-col items-center pt-[3.4%] pb-[1%]'>
                        <div className='w-full h-auto flex flex-row items-center justify-between '>
                            <div className='dropdown-area'>
                                <select className='dropdown'>
                                    <option className='text-medium-txt'>All Categories</option>
                                </select>
                            </div>
                            <div className='flex flex-row items-center gap-x-20'>
                                <div className='nav-item'>
                                    <a href="#a" className='text-medium-txt font-[Roboto] text-[#FFFFFF]'>Top Products</a>
                                </div>
                                <div className='nav-item'>
                                    <a href="#s" className='text-medium-txt font-[Roboto] text-[#FFFFFF]'>Best Products</a>
                                </div>
                                <div className='nav-item'>
                                    <a href="#a" className='text-medium-txt font-[Roboto] text-[#FFFFFF]'>Blogs</a>
                                </div>
                                <div className='nav-item'>
                                    <a href="#w" className='text-medium-txt font-[Roboto] text-[#FFFFFF]'>About Us</a>
                                </div>
                                <div className='nav-item'>
                                    <a href="#e" className='text-medium-txt font-[Roboto] text-[#FFFFFF]'>Contact Us</a>
                                </div>
                            </div>
                            <div className='flex flex-row items-center gap-x-3'>
                                <div className='support-icon-box'>
                                    <img src="./images/support.png" className='support-icon-view' alt="support" />
                                </div>
                                <div className='support-det flex flex-col justify-center'>
                                    <span className='text-small-txt font-[Quicksand] text-[#fff]'>+94112300500</span>
                                    <span className='text-[10px] font-[Quicksand] text-[#fff]'>Online Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='main-container'>
                    <div className='w-[95%] h-auto py-[3%]'>
                        <div className='w-[100%] h-[80vh]'>
                            <div className='w-[100%] h-[100%] flex flex-row items-center'>
                                <div className='w-[50%] h-[100%]'>
                                    <div className={`w-[100%] h-[100%] flex flex-col justify-center ps-[10%] transition-opacity duration-500 
                                     ${isFading ? 'opacity-0' : 'opacity-100'}`}
                                    >
                                        <span className='text-[#A0EBF5] font-[Inter] text-large-txt'>SEASON OF SALE</span>
                                        <span className='text-[#09E1FF] text-[52px] font-[Roboto] font-bold mt-2'>{slides[currentIndex].title}</span>
                                        <span className='text-[#A2AFB1] text-subHeading-txt font-[Inter] font-medium'>{slides[currentIndex].subtitle}</span>
                                        <button className='bg-[#7CCBDC] text-[#090909] w-[150px] p-[8px] rounded-[5px] mt-[5%] font-[Inter] text-medium-txt'>Shop Now</button>
                                    </div>
                                </div>
                                <div className='w-[50%] h-[100%] flex flex-row justify-center items-center'>
                                    <div className='prd_img-area'>
                                        <img src={slides[currentIndex].image}
                                            className={`prd_img-view transition-opacity duration-500 
                                            ${isFading ? 'opacity-0' : 'opacity-100'
                                                }`}
                                            alt="product images" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center mt-4">
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.id}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${currentIndex === index ? 'bg-[#21BDDF]' : 'bg-gray-400'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='main-container'>
                    <div className='w-[95%] h-auto flex flex-row items-center justify-between my-[3%]'>
                        {collectionCard}
                    </div>
                </div>
                <div className='main-container'>
                    <div className='w-[95%] h-auto'>
                        <div className='w-[100%] h-auto flex flex-row justify-between items-center my-[1.5%]' style={{ borderBottom: '2px solid #7E9DA6' }}>
                            <span className='text-[#fff] text-heading-txt font-[Inter]' style={{ borderBottom: '2px solid #00C2FF' }}>Top Products</span>
                            <div className='inline-flex gap-x-14'>
                                <span className='text-[#fff] text-large-txt font-[Inter] cursor-pointer'>Featured</span>
                                <span className='text-[#fff] text-large-txt font-[Inter] cursor-pointer'>Latest</span>
                                <span className='text-[#fff] text-large-txt font-[Inter] cursor-pointer'>Best Sellers</span>
                            </div>
                        </div>
                        {/* Slider Section */}
                        <div className="relative overflow-hidden">
                            {/* Left Button */}
                            <button
                                onClick={() => handleScroll("left")}
                                className="absolute h-[50px] left-0 top-1/2 transform -translate-y-1/2 bg-[#00C2FF] text-white p-3 rounded-full shadow-lg z-10 hover:bg-[#009ACE]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            {/* Slider */}
                            <div
                                ref={sliderRef}
                                className="flex overflow-hidden gap-x-4 scroll-smooth"
                                style={{
                                    width: "100%", // Ensure the container fits within the parent
                                }}
                            >
                                {topProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex-shrink-0 w-[calc(20%-1rem)] bg-gradient-to-br from-[#2B3740] to-[#1F2B33] p-4 rounded-lg shadow-lg relative"
                                        style={{
                                            minWidth: "calc(20% - 1rem)", // Adjust card width dynamically
                                            maxWidth: "calc(20% - 1rem)",
                                        }}
                                    >
                                        <span className="text-[#C2CBCE] font-normal text-[12px] block mb-2 text-right">
                                            {product.brand}
                                        </span>
                                        <div className="flex flex-col items-center">
                                            <div className="card-img-area mb-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.pr_title}
                                                    className="rounded-md object-cover"
                                                />
                                            </div>
                                            <span className="text-[#97E6FF] text-lg font-semibold text-center">
                                                {product.pr_title}
                                            </span>
                                        </div>
                                        <div className="mt-4">
                                            <span className="block text-[#e1e4e5] font-medium">
                                                Rs: {product.price}.00
                                            </span>

                                            <span
                                                className={`block mt-2 font-medium ${product.qty === 0
                                                    ? "text-[#e33d3d]"
                                                    : "text-[#4FF974]"
                                                    }`}
                                            >
                                                {product.qty === 0 ? (
                                                    "OUT-OF-STOCK"
                                                ) : (
                                                    "IN-STOCK"
                                                )}
                                            </span>
                                            <div className='flex flex-row items-center justify-between mt-6'>
                                                {product.qty === 0 ? (
                                                    <button className='text-white bg-green-800 rounded-md border-none px-4 py-1'
                                                        disabled={true}
                                                    // onClick={() => navigate(`/SingleProductView`, { state: { product } })}
                                                    >buy now</button>
                                                ) : (
                                                    <button className='text-white bg-green-600 rounded-md border-none px-4 py-1'
                                                        onClick={
                                                            () => {
                                                                const userInfo = JSON.parse(sessionStorage.getItem("user_info"));
                                                                if (userInfo && userInfo.id) {
                                                                    navigate(`/SingleProductView`, { state: { product } })
                                                                } else {
                                                                    alert("user not sign in.");
                                                                }
                                                            }
                                                        }
                                                    >buy now</button>
                                                )}


                                                <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 cursor-pointer' viewBox="0 0 24 24"
                                                    onClick={
                                                        async () => {
                                                            const response = await fetch(`http://localhost:8080/apex_comp-backend/AddToCart?pid=${product.id}&qty=${product.qty}`,
                                                                {
                                                                    method: "GET",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                    },
                                                                    credentials: "include",
                                                                }
                                                            );

                                                            if (response.ok) {
                                                                const responseObj = await response.json();
                                                                if(responseObj.success){
                                                                   alert("Product added to the cart.");
                                                                }else{
                                                                    alert("This product in already added!");
                                                                }
                                                            } else {
                                                                console.log(response);
                                                            }
                                                        }
                                                    }
                                                ><g fill="none" stroke="#ff0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path fill="#ff0" d="M19.5 22a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-10 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" /><path d="M5 4h17l-2 11H7zm0 0c-.167-.667-1-2-3-2m18 13H5.23c-1.784 0-2.73.781-2.73 2s.946 2 2.73 2H19.5" /></g></svg>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Button */}
                            <button
                                onClick={() => handleScroll("right")}
                                className="absolute h-[50px] right-0 top-1/2 transform -translate-y-1/2 bg-[#00C2FF] text-white p-3 rounded-full shadow-lg z-10 hover:bg-[#009ACE]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
                <div className='main-container'>
                    <div className='w-[95%] my-[3%] py-[1%] h-auto flex flex-row justify-between items-center bg-[#3A4549] rounded-md px-[1%]'>
                        <div className='colImg1-box'>
                            <img src="./images/product-images/tuf_G1.png" className='colImg-view' alt="" />
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-1'>
                            <span className='text-[#97E6FF] font-[Inter] text-heading-txt'>NEW COLLECTION</span>
                            <span className='text-[#E7F976] font-[Inter] text-large-txt'>UP TO 50% DISCOUNT</span>
                            <span className='text-[#C1C1C1] font-[Inter] text-medium-txt'>IN THIS SEASON</span>
                            <button className='bg-[#7CCBDC] py-[6px] px-[15px] rounded-md mt-4 font-medium'>Shop Now</button>
                        </div>
                        <div className='colImg1-box'>
                            <img src="./images/product-images/tuf_G2.png" className='colImg-view' alt="" />
                        </div>
                    </div>
                </div>
                <div className='main-container'>
                    <div className='w-[95%] h-auto rounded-lg my-[1.5%]' style={{ border: '1px solid #38616A' }}>
                        <div className='w-[100%] h-[100%] flex flex-row justify-between items-center p-[1.5%]'>

                            {services.map((service) => (
                                <div className='flex flex-row justify-between items-center gap-x-2'>
                                    <div className='serv_icon-area'>
                                        <img src={service.icon} className='serv_icon-view' alt="" />
                                    </div>
                                    <div className='flex flex-col items-center justify-center'>
                                        <span className='text-[16px] text-[#69D4F5] font-[Inter] font-medium'>{service.name}</span>
                                        <span className='text-medium-txt text-[#A5B0B3] font-[Inter] font-medium text-center'>{service.option}</span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className='main-container'>
                    <div className='w-[95%] h-auto'>
                        <div className='w-[100%] h-auto flex my-[1.5%]' style={{ borderBottom: '2px solid #7E9DA6' }}>
                            <span className='text-[#fff] text-heading-txt font-[Inter]' style={{ borderBottom: '2px solid #00C2FF' }}>Budget Packs</span>
                        </div>
                        <div className='w-[100%] h-auto relative flex flex-row gap-x-4 items-center my-[4%]'>

                            <div className='w-[25%] h-[340px] flex flex-col bg-[#3A4549] rounded-md'>
                                <div className='w-[100%] h-[100%]'>
                                    <img src="./images/product-images/g_headphone.png" className='w-[100%] h-[100%] relative z-0' style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} alt="" />
                                </div>
                                <div className='absolute h-[100%] p-[1.5%] flex flex-col z-10 justify-between'>
                                    <span className='text-[#A1DAEC] text-subHeading-txt font-semibold font-[Inter]'>Brand New Headphone</span>
                                    <div className='flex items-center gap-x-1'>
                                        <span className='text-[#00C2FF] text-[16px] font-[Inter] font-medium'>Shop Now</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#00C2FF" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00C2FF" class="mt-1 w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[50%] h-[340px] p-[2%] flex flex-row justify-center items-center bg-[#18414b] rounded-md' style={{ border: '1px solid #50818C' }}>
                                <div className='w-[45%] h-[300px] object-cover'>
                                    <img src="./images/product-images/Collection_2.png" className='w-[100%] h-[100%]' style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} alt="" />
                                </div>
                                <div className='w-[55%] flex flex-col gap-y-2 justify-center'>
                                    <span className='text-[#9FE8FF] text-subHeading-txt font-[Inter] font-medium mb-[2%]'>Monthly Budget Pack</span>
                                    <span className='text-[#B4CCE2] text-large-txt font-[Inter]'>I7 12th Gen PC Build</span>
                                    <span className='text-[#fff] text-medium-txt font-[Inter]'>Rs:195500.00</span>
                                    <p className='text-[#cfcfcf] text-small-txt font-[Inter]'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Quis neque earum voluptatibus nam beatae, iure magnam, quisquam
                                        fugiat, fugit numquam aliquid dicta. Provident, ducimus. Culpa.
                                    </p>
                                    <hr className='my-[3%]' style={{ border: '1px solid #465B5E', width: '100%' }} />
                                    <div className='flex items-center gap-x-1'>
                                        <span className='text-[#00C2FF] text-[16px] font-[Inter] font-medium'>Shop Now</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#00C2FF" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00C2FF" class="mt-1 w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[25%] h-[340px] flex flex-col bg-[#3A4549] rounded-md'>
                                <div className='w-[100%] h-[100%]'>
                                    <img src="./images/product-images/SSD2.png" className='w-[100%] h-[100%] relative z-0' style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} alt="" />
                                </div>
                                <div className='absolute h-[100%] p-[1.5%] flex flex-col z-10 justify-between'>
                                    <span className='text-[#A1DAEC] text-subHeading-txt font-semibold font-[Inter]'>Brand New SSD</span>
                                    <div className='flex items-center gap-x-1'>
                                        <span className='text-[#00C2FF] text-[16px] font-[Inter] font-medium'>Shop Now</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#00C2FF" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00C2FF" class="mt-1 w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='main-container'>
                    <div className='w-[95%] h-auto my-[3%]'>
                        <div className='w-[100%] h-auto grid grid-rows-1 grid-cols-5 bg-brandIC py-[0.9%] px-[2%]'>
                            {brandIcons.map((icon) => (
                                <div className='w-[100%] h-[100%] flex justify-center object-cover'>
                                    <img src={icon.image} className='w-[90px] h-[80px]' style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </body >

        </>

    )
}

export default Home;