import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const ProductDetailsModal = ({ booking }) => {
    const navigate = useNavigation()
    const { user } = useContext(AuthContext)

    const { originalPrice, sellingPrice, productDescription, usagesTime, location, conditions, productName, image} = booking
    
    console.log("This is",booking)

    
    
    // console.log(product)

    const { data: categoryList } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(` https://assignment-12-server-side.vercel.app/categories`)
                .then(res => res.json())
        
        
    })

    const handleBookProduct = () => {
        Swal.fire(
            'Congratulation!',
            'Product Booking Successfull!',
            'success'
        )
        bookingConfirmation()
        navigate("/dashboard")
          
    }

    const bookingConfirmation = () => {
        const bookedPhone = {
            originalPrice, sellingPrice, productDescription, usagesTime, location, conditions, productName,
            email: user?.email, image
        }
        fetch(` https://assignment-12-server-side.vercel.app/bookings`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(bookedPhone)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                
        })
    }

  
    return (
        <div>
            {/* The button to open modal */}
            

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="product-details" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="product-details" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    
                    <p className="py-4">Seller Email: {user?.email}</p>
                    <p className="py-4">Description: {productDescription}</p>
                    <p className="py-4">Product Original Price: {originalPrice} BDT</p>
                    <p className="py-4">Product Selling Price: {sellingPrice} BDT</p>
                    <p className="py-4">Product Usages Time: {usagesTime}</p>
                    <p className="py-4">Condition: {conditions}</p>
                    <div className="form-control w-full block m-auto">
                        <label className="mb-5">
                            <span className="label-text flex justify-center">Location</span>
                          
                        </label>
                        <input type="text" name="location" placeholder="Type Your Location Here" className="input input-bordered w-full max-w-xs mb-6" />
                       
                    </div>
                    <div className="form-control w-full block m-auto">
                        <label className="">
                            <span className="label-text flex justify-center">Mobile Number</span>
                          
                        </label>
                        <input type="number" name="phone" placeholder="Type Your Phone Number" className="input input-bordered w-full max-w-xs mb-10" />
                       
                    </div>
                   <button onClick={handleBookProduct} className='btn btn-primary'>Book Your Desire Product</button>
            </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;