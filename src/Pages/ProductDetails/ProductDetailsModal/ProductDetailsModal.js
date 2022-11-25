import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const ProductDetailsModal = ({ booking }) => {
    const navigate = useNavigation()
    const { user } = useContext(AuthContext)

    const { originalPrice, sellingPrice, productDescription, usagesTime, location, conditions, productName} = booking
    
    console.log("This is",booking)

    
    
    // console.log(product)

    const { data: categoryList } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(`http://localhost:5000/categories`)
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
            email: user?.email
        }
        fetch(`http://localhost:5000/bookings`, {
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
                    <h2 className='text-xl font-bold mb-6'>{productName}</h2>
                Seller Name:  { user?.displayName ? <p className="py-4">{ user?.displayName}</p>
                    : "No Name Information Found"}
                    <p className="py-4">User Email: {user?.email}</p>
                    <p className="py-4">Description: {productDescription}</p>
                    <p className="py-4">Product Original Price: {originalPrice} BDT</p>
                    <p className="py-4">Product Selling Price: {sellingPrice} BDT</p>
                    <p className="py-4">Product Usages Time: {usagesTime}</p>
                    <p className="py-4">Condition: {conditions}</p>
                    <p className="py-4">Location: {location}</p>
                   <button onClick={handleBookProduct} className='btn btn-primary'>Book Your Desire Product</button>
            </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;