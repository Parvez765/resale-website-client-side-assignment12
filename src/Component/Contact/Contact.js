import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className='p-10'>
            <div className='bg-black container mx-auto p-14 text-white mb-10 rounded-lg'>
                <h2 className='text-3xl lg:text-5xl font-bold'>Want To Become A Seller</h2>
            <Link to="/contact"> <button className='btn btn-warning mt-4'>Contact Us</button></Link>
            </div>
        </div>
    );
};

export default Contact;