import React, { useState } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { FaCheck } from "react-icons/fa";

const AddedProduct = () => {

    const [products, setProducts] = useState([])

    axios.get(`http://localhost:5000/dashboard/addproducts`, {
        headers: {
            authorization : `bearer ${localStorage.getItem("accessToken")}`
        }
    })
        .then(response => {
            // console.log(response.data)
            setProducts(response.data)
        })
    
    
    // Category List

    const { data: categoryList } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(`http://localhost:5000/categories`)
                .then(res => res.json())
        
        
    })

    // User List
    const { data: sellerList } = useQuery({
        queryKey: ["seller"],
        queryFn: () =>
            fetch(`http://localhost:5000/seller`)
                .then(res => res.json())
        
        
    })

    return (
        <div>
            <h2 className='text-3xl font-bold mt-10'>List Of Products You Added</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 container mx-auto justify-items-center mt-12'>
                {
                    products.map(product => <>
                        <div className="card w-96 bg-base-100 shadow-xl" key={product._id}>
                            <figure><img src={product.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="text-center font-bold">{product.productName}</h2>
                                 <p>Category: {categoryList?.find(category => category._id === product.options).categoryName }</p>
                                <p className='flex items-center justify-evenly'>Seller: {sellerList?.find(seller => seller._id === product.sellerName).name} <FaCheck className='' style={sellerList?.find(seller => seller._id === product.sellerName).isVerified && { color: "green" }} /> </p> 
                                <h2 className="text-center font-bold">Orizinal Price: {product.originalPrice}</h2>
                                <h2 className="text-center font-bold">Selling Price: {product.sellingPrice}</h2>
                                <h2 className="text-center font-bold">Product Added Time: {product.postingTime}</h2>
                                <h2 className="text-center font-bold">Product Buying Time: {product.purchage}</h2>
                                <h2 className="text-center font-bold">Usages Time: {product.usagesTime}</h2>
                                <h2 className="text-center font-bold">Description: {product.productDescription}</h2>
                                <h2 className="text-center font-bold">Location: {product.location}</h2>
                                <div className="card-actions justify-end">
                                <button className="btn btn-primary">Advertize</button>
                                </div>
                            </div>
                        </div>
                                            
                    </>)
                }
            </div>
        </div>
    );
};

export default AddedProduct;