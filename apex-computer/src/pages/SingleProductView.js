import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';

function SingleProductView() {

    const [quantity, setQuantity] = useState(1);

    const product = {
        title: 'High-Performance Gaming Laptop',
        price: 495999,
        description: 'This high-performance gaming laptop comes with a powerful Intel i7 processor, 16GB RAM, and an NVIDIA RTX 3060 graphics card.',
        image: './images/collection1.png', // Replace this with an actual image URL
    };

    return (
        <>
            <NavBar />
            <div className='bg-SPV w-[100%] h-[92.8vh] flex flex-row justify-center items-center'>
                <div className='w-[95%] h-auto'>
                    <div className="max-w-3xl mx-auto p-6 bg-SCardV rounded-lg shadow-lg">
                        {/* Product Image */}
                        <div className='w-[100%] flex flex-row justify-center'>
                            <img
                                className="w-[300px] h-auto object-cover object-center mb-6 rounded-md"
                                src={product.image}
                                alt={product.title}
                            />
                        </div>

                        <h1 className="text-[#00C2FF] text-subHeading-txt font-[Inter] font-semibold mb-2">{product.title}</h1>

                        <p className="text-[#97E6FF] text-large-txt font-[Inter] font-medium mb-4">Rs:{product.price.toFixed(2)}</p>

                        <p className="text-[#A5B0B3] text-medium-txt font-[Inter] font-medium mb-6">{product.description}</p>

                        <div className="mb-6">
                            <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity:</label>
                            <select
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Add to Cart
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProductView;