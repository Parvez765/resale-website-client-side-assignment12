import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const AddProduct = () => {

    
    const {user} = useContext(AuthContext)

    console.log("User data", user)
    const { data: categoryList } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(`http://localhost:5000/categories`)
                .then(res => res.json())
        
        
    })
    const { data: sellerList } = useQuery({
        queryKey: ["seller"],
        queryFn: () =>
            fetch(`http://localhost:5000/seller`)
                .then(res => res.json())
        
        
    })
    // console.log(categoryList)
    
    const handlePost = event => {


        event.preventDefault()
        const form = event.target
        const sellerName = form.name.value
        const options = form.options.value
        const productName = form.productName.value
        const originalPrice = form.originalPrice.value
        const sellingPrice = form.sellingPrice.value
        const usagesTime = form.usagesTime.value
        const postingTime = new Date().toLocaleString()
        console.log(postingTime)
        const location = form.location.value

        // const user = { sellerName, options, productName, originalPrice, sellingPrice, usagesTime, postingTime, location }
        // console.log(user)

        const image = form.img.files[0]

        const imgbbKey = process.env.REACT_APP_imgbb_host_key
        console.log("This is" ,imgbbKey)
        
        const formData = new FormData()
        formData.append("image", image)

       

        fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const products = {
                    sellerName, options, productName, originalPrice, sellingPrice, usagesTime, postingTime, location, image : imgData.data.url
                    }
                    fetch(`http://localhost:5000/dashboard/addproducts`, {
                        method: "POST",
                        headers: {
                            "content-type" : "application/json"
                        },
                        body: JSON.stringify(products)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                Swal.fire(
                                    
                                    'Product Addedd Successfully',
                                  
                                  )
                            }
                        })
                 }
            })

       
        


    }


    return (
        <div>
            <h2 className='text-3xl font-bold'>Please Add Product You Want to Sell</h2>
            <div className='mt-10'>
                <form onSubmit={handlePost}>
                    
                <div className="form-control w-full max-w-xs container mx-auto">
                   
                        {
                            user?.isSeller && <input type="text" name="name" value={user._id}/>
                        } 
                        <select name="name" className="select select-bordered">
                       
                            {
                                sellerList?.map(seller=> <>
                                    <option value = {seller._id}>{seller.name}</option>
                        
                                </>)
                       }
                    </select>
                </div>
                <div className="form-control w-full max-w-xs container mx-auto">
                    <label className="label">
                        <span className="label-text">Please Choose Category</span>
                    </label>
                    <select name="options" className="select select-bordered">
                       
                            {
                                categoryList?.map(category => <>
                                    <option value = {category._id}>{category.categoryName}</option>
                        
                                </>)
                       }
                    </select>
                    </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                    <label className="label">
                        <span className="label-text">Product Image</span>
                    </label>
                   <input type="file" name="img" className='select-bordered' />
                </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text" name="productName" placeholder="Product Name" className="input input-bordered  w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text">Original Price</span>
                        </label>
                        <input type="text" placeholder="Price" name="originalPrice" className="input input-bordered  w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text">Selling Price Price</span>
                        </label>
                        <input type="text" placeholder="Price" name="sellingPrice" className="input input-bordered  w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text" name="sellingPrice">Usages Time</span>
                        </label>
                        <input type="text" placeholder="Usages Time" name="usagesTime" className="input input-bordered  w-full max-w-xs" />
                    </div>
                  
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input type="text" placeholder="location" name="location" className="input input-bordered  w-full max-w-xs" />
                    </div>
                    <button className='btn btn-primary mt-10'>Post</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;