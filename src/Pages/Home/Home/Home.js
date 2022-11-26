import React from 'react';
import headerImg from "../../../assests/images/headerImg-01.png"
import ProductCategory from '../../ProductCategory/ProductCategory';
import Advertised from '../Advertised/Advertised';
import SerachSection from '../SerachSection/SerachSection';

const Home = () => {
    return (
        <div className="">
            <div className='flex items-center flex-col lg:flex-row-reverse justify-center  bg-gray-100 p-4'>
                <div>
                    <img src={headerImg} className="w-[800px]" alt="" />
                </div>
                <div>
                    <h2 className='text-4xl lg:text-6xl font-bold'>Buy And Sell</h2>
                    <h2 className='text-2xl font-bol mt-2'>WhatEver You Want, Whenever You Want</h2>
                    <button className='btn btn-primary mt-5'>Book Now</button>
                </div>
            </div>
            <SerachSection></SerachSection>
            <ProductCategory></ProductCategory>
            <Advertised></Advertised>
        </div>
    );
};

export default Home;