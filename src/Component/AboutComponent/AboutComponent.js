import React from 'react';
import picture from "../../assests/images/myPicture.jpg"

const AboutComponent = () => {
    return (
        <div className='container mx-auto lg:mt-14 p-6'>
            <div className='flex flex-col lg:flex-row justify-around items-center'>
                <div className='mt-12'>
                    <h2 className='text-4xl text-left  font-bold'>About BuyAndSell</h2>
                    <p className='text-xl  mt-4 lg:w-[900px] text-left bolck mx-auto'>BuyAndSell is a platform where you can buy and sell your old phones. BuyAndSell is developed by Md. Parvez Hossain Sakib. He is a student of National University. He is a self taught web developer. He is a passionate web developer. He loves to develop web applications. Hope you will like his project. Thank you.</p>
                </div>
                <div className='text-center mt-10 '>
                  
                    <div className='container mx-auto flex justify-center items-center flex-col shadow-lg p-10 rounded-lg'>
                        <div>
                            <img src={picture} className="w-[150px] rounded-full mb-4" alt="" />
                        </div>
                        <div>
                            <h2 className='text-xl font-bold'>Md. Parvez Hossain Sakib</h2>
                            <h2>Junior Web Developer</h2>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    );
};

export default AboutComponent;