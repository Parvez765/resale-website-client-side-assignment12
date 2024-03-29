import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const Advertised = () => {

    const {user} = useContext(AuthContext)

    const [advertised, setAdvertised] = useState([])

    useEffect(() => {
        fetch(` https://assignment-12-server-side.vercel.app/advertiseProduct`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAdvertised(data)
            })
    }, [])


    // Add To WishList
    const handleAddToWishList = (adItem) => {

        const addedProducts = {adItem, email: user?.email}

        fetch(` https://assignment-12-server-side.vercel.app/wishlist`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(addedProducts)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    Swal.fire(
                        'Congratulation!',
                        'Product Successfully Added To WishList!',
                        'success'
                      )
               }
                
        })
    }
    
    return (
        <div className='p-10'>
            {advertised.length > 0 && <>
                <h2 className='text-3xl lg:text-5xl font-bold mb-10'>Advertised Product</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto justify-items-center mt-10 mb-10'>
                {
                    advertised?.map(adItem => <>
                        <div className="card lg:w-96 bg-base-100 shadow-xl">
                            <figure><img src={adItem.image} alt="Shoes" className='mt-6 p-14'/></figure>
                            <div className="card-body">
                                <h2 className="text-center font-bold text-2xl">{adItem.productName}</h2>
                                <p>{adItem.productDescription}</p>
                                <p>Purchage Year: {adItem.purchage}</p>
                                <p>Original Price: {adItem.originalPrice}</p>
                                <p>Selling Price: {adItem.sellingPrice}</p>
                                <div className="card-actions justify-center">
                                <button className="btn btn-primary"onClick={()=> handleAddToWishList(adItem)} >Add To WishList</button>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>
            
            </>}
        </div>
    );
};

export default Advertised;