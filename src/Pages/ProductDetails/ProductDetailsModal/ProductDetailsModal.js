import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const ProductDetailsModal = ({ booking}) => {
    const { user } = useContext(AuthContext)

    const { originalPrice, sellingPrice, productDescription, usagesTime, postingTime, location, conditions, productName} = booking
    
    console.log("This is",booking)

    
    
    // console.log(product)

    const { data: categoryList } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(`http://localhost:5000/categories`)
                .then(res => res.json())
        
        
    })

  
    return (
        <div>
            {/* The button to open modal */}
            

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="product-details" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="product-details" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h2 className='text-xl font-bold mb-6'>{productName}</h2>
                Seller Name:  { user?.displayName ? <p className="py-4">{ user?.displayName}</p>
                    : "No Name Information Found"}
                    <p className="py-4">User Email: {user?.email}</p>
                    <p className="py-4">Description: {productDescription}</p>
                    <p className="py-4">Product Original Price: {originalPrice} BDT</p>
                    <p className="py-4">Product Selling Price: {sellingPrice} BDT</p>
                    <p className="py-4">Product Usages Time: {usagesTime}</p>
                    <p className="py-4">Condition: {conditions}</p>
                   <button className='btn btn-primary'>Submit</button>
            </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;