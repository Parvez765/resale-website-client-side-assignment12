import React from 'react';
import headerImg from "../../../assests/images/headerImg-01.png"

const Home = () => {
    return (
        <div className=' bg-gray-100 p-4'>
            <div className='flex items-center flex-col lg:flex-row-reverse justify-center'>
                <div>
                    <img src={headerImg} className="w-[800px]" alt="" />
                </div>
                <div>
                    <h2 className='text-4xl lg:text-6xl font-bold'>Buy And Sell</h2>
                    <h2 className='text-2xl font-bol mt-2'>WhatEver You Want, Whenever You Want</h2>
                    <button className='btn btn-primary mt-5'>Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Home;