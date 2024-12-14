import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../App.css';
import NavBar from '../components/NavBar';

const SearchResults = () => {

    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const query = new URLSearchParams(location.search).get("query");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/apex_comp-backend/BasicSearchProducts?query=${encodeURIComponent(query)}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
                if (response.ok) {
                    const results = await response.json();
                    const Products = results.content.map((product) => ({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        available: product.product_status === "Available" ? "IN-STOCK" : "OUT-OF-STOCK",
                        image: product.image,
                        desc: product.description,
                    }));
                    setSearchResults(Products);
                } else {
                    console.error("Failed to fetch search results");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <NavBar />
            <div className='main-bodyContainer2'>
                <h2>Search Results for: "{query}"</h2>
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-5 gap-4">
                        {searchResults.map((product) => (
                            <div
                                key={product.id}
                                className="flex-shrink-0 w-[100%] bg-gradient-to-br from-[#2B3740] to-[#1F2B33] p-4 rounded-lg shadow-lg relative"

                            >
                                <span className="text-[#C2CBCE] font-normal text-[12px] block mb-2 text-right">
                                    {product.brand}
                                </span>
                                <div className="flex flex-col items-center">
                                    <div className="card-img-area mb-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="rounded-md object-cover"
                                        />
                                    </div>
                                    <span className="text-[#97E6FF] text-lg font-semibold text-center">
                                        {product.title}
                                    </span>
                                    <p className='text-[#a2b7bd] text-medium-txt mt-3'>{product.desc}</p>
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
                                    <div className='flex flex-row justify-end'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='size-6 mt-6' viewBox="0 0 24 24"><g fill="none" stroke="#ff0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path fill="#ff0" d="M19.5 22a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-10 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" /><path d="M5 4h17l-2 11H7zm0 0c-.167-.667-1-2-3-2m18 13H5.23c-1.784 0-2.73.781-2.73 2s.946 2 2.73 2H19.5" /></g></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </>
    )
}

export default SearchResults;
