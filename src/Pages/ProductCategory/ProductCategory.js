import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategory = () => {

    const { data: categoryList } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(` https://assignment-12-server-side.vercel.app/categories`)
                .then(res => res.json())
        
        
    })

    return (
        <div className='bg-slate-100 lg:p-14'>
            <div className='text-3xl lg:text-5xl font-bold p-6'>
                <h2>Product Category</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto justify-items-center mt-10 mb-10 gap-6'>
                    {
                        categoryList?.map(category => <>
                            <div key={category._id} className="card lg:w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                
                                    <img src={category.categoryImage} alt="" className='lg:w-[600px] lg:h-[200px]'/>
                                    <div className="card-actions justify-center">
                                <Link to={`/categories/${category._id}`}><button className="btn btn-primary mt-6">Visit Products</button></Link>
                                    </div>
                                </div>
                            </div>
                        </>)
                    }
                </div>
            </div>
       </div>
    );
};

export default ProductCategory;