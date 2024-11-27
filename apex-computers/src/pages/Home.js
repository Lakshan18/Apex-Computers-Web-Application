import { React, useEffect, useRef, useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {

    const navigate = useNavigate();

    const singleProductView = () => {
        navigate("/singleProductView");
    };

    const goToCart = () => {
        navigate("/cart");
    }

    const slides = [
        {
            id: 1,
            image: './images/collection1.png',
            title: 'New MacBook Pro',
            subtitle: 'Up To 40% Off in This Season',
        },
        {
            id: 2,
            image: './images/VGA-Card.png',
            title: 'NVIDIA RTX 4070',
            subtitle: 'Latest Gadgets Available',
        },
        {
            id: 3,
            image: './images/headphone.png',
            title: 'JBL Ex7G Pro Matrix',
            subtitle: 'Grab them while stock lasts!',
        },
        {
            id: 4,
            image: './images/collection_2.png',
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
    }, []);

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

    const topProducts = [
        {
            pid: "1",
            category: "Laptop",
            image: "./images/collection1.png",
            pr_title: "Mackbook Pro",
            price: "429999",
            available: "IN-STOCK",
        },
        {
            pid: "2",
            category: "Laptop",
            image: "./images/collection_2.png",
            pr_title: "i7 PC Build",
            price: "219999",
            available: "IN-STOCK",
        },
        {
            pid: "3",
            category: "Laptop",
            image: "./images/VGA-Card.png",
            pr_title: "NVIDIA RTX 4070",
            price: "319999",
            available: "OUT-STOCK",
        },
        {
            pid: "4",
            category: "Laptop",
            image: "./images/headphone.png",
            pr_title: "JBL Ex7G Matrix",
            price: "32000",
            available: "IN-STOCK",
        },
        {
            pid: "5",
            category: "Laptop",
            image: "./images/collection_2.png",
            pr_title: "i7 12th Gen PC Build",
            price: "240999",
            available: "OUT-STOCK",
        },
        {
            pid: "6",
            category: "Laptop",
            image: "./images/collection1.png",
            pr_title: "Asus ROG Zephyrus",
            price: "475999",
            available: "IN-STOCK",
        },
    ];

    const sliderRef = useRef(null);

    const handleScroll = (direction) => {
        const cardWidth = sliderRef.current.children[0].offsetWidth; // Get the width of a single card
        const gapWidth = 16; // Gap between cards (in pixels)
        const scrollAmount = cardWidth + gapWidth; // Total scroll for one card

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

    // active products for budget packs..........

    // const [activeProduct, setActiveProduct] = useState(null);
    // const [direction, setAnimationDirection] = useState('');

    // const productData1 = {
    //     title: "New Brand Headphones",
    //     desc: "High-quality sound, noise cancellation, and lightweight design.",
    //     price: "15000",
    //     image: "./images/headphone.png",
    // };

    // const productData2 = {
    //     title: "New Sound System",
    //     desc: "5.1 Surround sound, high bass, and easy-to-install.",
    //     price: "35000",
    //     image: "./images/collection_2.png",
    // };

    // const setHandleProduct = (acProduct, direction) => {
    //     setAnimationDirection(direction);
    //     setActiveProduct(null); // Clear current product
    //     setTimeout(() => {
    //         setActiveProduct(acProduct); // Set the new product after the animation
    //     }, 300);
    // };

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

    return (

        <>

            <NavBar />

            <body className='main-bodyContainer' >  {/*onLoad={checkSigning}*/}


                <div className='main-container'>

                    <div className='w-[95%] flex flex-col items-center'>
                        <div className='w-full h-auto flex flex-row items-center justify-between mt-[2%] mb-[2.5%]'>
                            <div className='main-logo-box'>
                                <img src="./images/Apex-main-logo.png" alt="Apex Logo" className='main-logo-view' />
                            </div>
                            <div className='w-auto flex flex-row'>
                                <div class="search-container me-5">
                                    <input type="text" placeholder="Search..." className="search-input" />
                                    <button class="search-button">Search</button>
                                    {/* <Link to='/signin' className='search-button'>Go To Sign Up</Link> */}
                                </div>
                                <div class="icon-container">
                                    <div class="shopping-icon cursor-pointer" onClick={goToCart}>
                                        <img src="./images/shopping.png" alt="shopping-icon" className='cart-icon-view' />
                                    </div>
                                    <div class="badge">3</div>
                                </div>
                            </div>
                            <div className=' flex flex-row items-center'>
                                <span className='text-medium-txt text-[#CECECE] font-semibold font-[Quicksand] pe-3'> User112@</span>
                                <div className='icon-box'>
                                    <img src="./images/User.png" alt="User-Img" className='icon-view' />
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
                                    <img src="./images/collection1.png" alt="notify1" className='notify-img-view' />
                                </div>
                                <div className='notify-img1'>
                                    <img src="./images/collection_2.png" alt="notify1" className='notify-img-view' />
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-y-2'>
                                <span className='text-[#fff] font-[Inter] font-semibold text-large-txt text-center'>New Collection 2024</span>
                                <span className='text-medium-txt text-[#EBFF00] font-[Inter] font-medium text-center'>UP TO 25% DISCOUNT</span>
                            </div>
                            <div className='flex flex-row items-center'>
                                <div className='notify-img1'>
                                    <img src="./images/VGA-card.png" alt="notify1" className='notify-img-view' />
                                </div>
                                <div className='notify-img1'>
                                    <img src="./images/headphone.png" alt="notify1" className='notify-img-view' />
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
                                    <a href="#s" className='text-medium-txt font-[Roboto] text-[#FFFFFF]'>Top Products</a>
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
                <div className="main-container bg-[#1F2B33] py-6 px-4">
                    <div className="w-[95%] mx-auto overflow-hidden">
                        {/* Header Section */}
                        <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-[#7E9DA6]">
                            <span
                                className="text-[#fff] text-xl font-semibold"
                                style={{ borderBottom: "2px solid #00C2FF" }}
                            >
                                Top Products
                            </span>
                            <div className="flex gap-x-10">
                                <span className="text-[#fff] text-lg cursor-pointer">Featured</span>
                                <span className="text-[#fff] text-lg cursor-pointer">Latest</span>
                                <span className="text-[#fff] text-lg cursor-pointer">Best Sellers</span>
                            </div>
                        </div>

                        {/* Slider Section */}
                        <div className="relative">
                            {/* Left Button */}
                            <button
                                onClick={() => handleScroll("left")}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#00C2FF] text-white p-3 rounded-full shadow-lg z-10 hover:bg-[#009ACE]"
                            >
                                &#8249;
                            </button>

                            {/* Slider */}
                            <div
                                ref={sliderRef}
                                className="flex overflow-x-auto no-scrollbar gap-x-4 scroll-smooth"
                            >
                                {topProducts.map((product) => (
                                    <div
                                        key={product.pid}
                                        className="w-[300px] flex-shrink-0 bg-gradient-to-br from-[#2B3740] to-[#1F2B33] p-4 rounded-lg shadow-lg relative"
                                    >
                                        <span className="text-[#C2CBCE] font-medium text-sm block mb-2 text-right">
                                            {product.category}
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
                                                className={`block mt-2 font-medium ${product.available === "IN-STOCK"
                                                        ? "text-[#4FF974]"
                                                        : "text-[#e33d3d]"
                                                    }`}
                                            >
                                                {product.available}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Button */}
                            <button
                                onClick={() => handleScroll("right")}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#00C2FF] text-white p-3 rounded-full shadow-lg z-10 hover:bg-[#009ACE]"
                            >
                                &#8250;
                            </button>
                        </div>
                    </div>
                </div>
                <div className='main-container'>
                    <div className='w-[95%] my-[3%] py-[1%] h-auto flex flex-row justify-between items-center bg-[#3A4549] rounded-md px-[1%]'>
                        <div className='colImg1-box'>
                            <img src="./images/tuf_G1.png" className='colImg-view' alt="" />
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-1'>
                            <span className='text-[#97E6FF] font-[Inter] text-heading-txt'>NEW COLLECTION</span>
                            <span className='text-[#E7F976] font-[Inter] text-large-txt'>UP TO 50% DISCOUNT</span>
                            <span className='text-[#C1C1C1] font-[Inter] text-medium-txt'>IN THIS SEASON</span>
                            <button className='bg-[#7CCBDC] py-[6px] px-[15px] rounded-md mt-4 font-medium'>Shop Now</button>
                        </div>
                        <div className='colImg1-box'>
                            <img src="./images/tuf_G2.png" className='colImg-view' alt="" />
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
                                    <img src="./images/g_headphone.png" className='w-[100%] h-[100%] relative z-0' style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} alt="" />
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
                                    <img src="./images/Collection_2.png" className='w-[100%] h-[100%]' style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} alt="" />
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
                                    <img src="./images/SSD2.png" className='w-[100%] h-[100%] relative z-0' style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} alt="" />
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

                            {/* <div className="flex justify-center items-center h-screen bg-gray-900 text-white">

<div
                                    onClick={() => setHandleProduct(productData1, 'from-left')}
                                    className="w-1/3 cursor-pointer p-4 hover:scale-105 transform transition-all duration-500"
                                >
                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <h3 className="text-xl font-bold">{productData1.title}</h3>
                                        <p className="text-blue-400 mt-2">Shop now →</p>
                                    </div>
                                </div>

                                <div className={`relative w-1/3 p-4`}>
                                    <div
                                        className={`absolute inset-0 bg-gray-700 p-6 rounded-lg transition-transform transition-opacity duration-700 ease-in-out transform ${direction === 'from-left' && activeProduct
                                                ? 'translate-x-0 opacity-100'
                                                : direction === 'from-left'
                                                    ? '-translate-x-12 opacity-0'
                                                    : ''
                                            } ${direction === 'from-right' && activeProduct
                                                ? 'translate-x-0 opacity-100'
                                                : direction === 'from-right'
                                                    ? 'translate-x-12 opacity-0'
                                                    : ''
                                            }`}
                                    >
                                        {activeProduct ? (
                                            <div className="flex flex-col items-center text-center">
                                                <img
                                                    src={activeProduct.image}
                                                    alt={activeProduct.title}
                                                    className="w-full h-32 object-cover mb-4"
                                                />
                                                <h3 className="text-2xl font-bold">{activeProduct.title}</h3>
                                                <p className="mt-2">{activeProduct.description}</p>
                                                <p className="mt-2 font-bold text-blue-300">
                                                    {activeProduct.price}
                                                </p>
                                                <p className="mt-4 text-blue-400">Shop Now →</p>
                                            </div>
                                        ) : (
                                            <div className="text-gray-400">Select a product to view details</div>
                                        )}
                                    </div>
                                </div>

                            <div
                                onClick={() => setHandleProduct(productData2, 'from-right')}
                                className="w-1/3 cursor-pointer p-4 hover:scale-105 transform transition-all duration-500"
                            >
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-xl font-bold">{productData2.title}</h3>
                                    <p className="text-blue-400 mt-2">Shop now →</p>
                                </div>
                            </div>
                        </div> */}

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