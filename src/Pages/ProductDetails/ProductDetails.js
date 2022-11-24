import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const ProductDetails = () => {

    const products = useLoaderData()
    console.log(products)
    const {productPicture, productName, sellerName, originalPrice, resalePrice,

    } = products

    
   

    return (
        <div>
            <h2 className='text-3xl font-bold'>Welocme to  {products[0].categoryName} Store</h2>
        </div>
    );
};

export default ProductDetails;