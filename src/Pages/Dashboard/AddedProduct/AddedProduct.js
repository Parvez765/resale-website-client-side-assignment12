import React, { useState } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { FaCheck } from "react-icons/fa";
import Swal from 'sweetalert2';

const AddedProduct = () => {

    const [products, setProducts] = useState([])
    

    axios.get(` https://assignment-12-server-side.vercel.app/dashboard/addproducts`, {
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
            fetch(` https://assignment-12-server-side.vercel.app/categories`)
                .then(res => res.json())
        
        
    })

    // User List
    const { data: sellerList } = useQuery({
        queryKey: ["seller"],
        queryFn: () =>
            fetch(` https://assignment-12-server-side.vercel.app/seller`)
                .then(res => res.json())
        
        
    })


    // Advertised Product
    
        
        const handleupdate = (id) => {
            fetch(` https://assignment-12-server-side.vercel.app/advertised/${id}`, {
                method: "PUT",
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged === true) {
                        Swal.fire(
                            'Congratulation!',
                            'Product Successfully Advertised!',
                            'success'
                          )
                   }
                    
            })
    }

    const fetchDelete = (id) => {
        fetch(` https://assignment-12-server-side.vercel.app/products/${id}`, {
            method: "DELETE", 
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    Swal.fire(
                        'Congratulation!',
                        'Product Successfully Advertised!',
                        'success'
                      )
                }
        })
    }
    
    // Delete Product
    const handleDelete = (id) => {
       fetchDelete(id)
    }
    

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
                                    <div className='flex items-center justify-around'>
                                        <div>
                                        {!product?.isBooked ? <button onClick={()=>handleupdate(product._id)} className="btn btn-primary mr-10">Advertize</button> :  <button className="btn btn-primary mr-10" disabled>Sold</button>}
                                        </div>
                                        <div>
                                            <button className="btn btn-outline" onClick={()=> handleDelete(product._id)}>Delete</button>     
                                        </div>
                                    </div>
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