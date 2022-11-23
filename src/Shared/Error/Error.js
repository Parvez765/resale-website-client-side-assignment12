import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from "../../assests/images/error-01.png"

const Error = () => {
    return (
        <div>
            <img src={errorImg} className="w-[1000px] block mx-auto mt-6" alt="" />
            <Link to="/"><button className='btn btn-primary mb-12 mt-6'>Go To Home</button></Link>
        </div>
    );
};

export default Error;