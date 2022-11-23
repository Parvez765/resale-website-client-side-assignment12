import React from 'react';

const SerachSection = () => {
    return (
        <div className='mt-14'>
            <h2 className='text-3xl font-bold'>Search Your Desire Product</h2>
            <div className='mt-6'>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mr-2" />
                <button className='btn btn-primary'>Search</button>
            </div>
        </div>
    );
};

export default SerachSection;