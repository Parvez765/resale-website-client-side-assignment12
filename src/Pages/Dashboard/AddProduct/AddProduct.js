import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const AddProduct = () => {

    const [userDetail, setUserDetail] = useState({})
    
    const { user } = useContext(AuthContext)
    
    useEffect(() => {
        fetch(` https://assignment-12-server-side.vercel.app/user?email=${user.email}`)
            .then(res => res.json())
            .then(dal => {
                console.log("This is Data", dal)
                setUserDetail(dal)
            })
        

    }, [user?.email !== undefined])

    

    // console.log("User data", user.email)
    const { data: categoryList } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(` https://assignment-12-server-side.vercel.app/categories`)
                .then(res => res.json())
        
        
    })
    const { data: sellerList } = useQuery({
        queryKey: ["seller"],
        queryFn: () =>
            fetch(` https://assignment-12-server-side.vercel.app/seller`)
                .then(res => res.json())
        
        
    })

    // console.log(categoryList)
    const navigate = useNavigate()
    
    const handlePost = event => {



        event.preventDefault()
        const form = event.target
        const sellerName = form.name.value
        
        const options = form.options.value
        console.log("This is" ,options)
        const productName = form.productName.value
        const originalPrice = form.originalPrice.value
        const sellingPrice = form.sellingPrice.value
        const usagesTime = form.usagesTime.value
        const postingTime = new Date().toLocaleString()
        const conditions = form.condition.value
        console.log("conditions", conditions)
        const purchage = form.purchage.value
        const phone = form.number.value
        const productDescription = form.productDescription.value

        // console.log(postingTime)
        const location = form.location.value

        // const user = { sellerName, options, productName, originalPrice, sellingPrice, usagesTime, postingTime, location }
        // console.log(user)

        const image = form.img.files[0]

        const imgbbKey = process.env.REACT_APP_imgbb_host_key
        // console.log("This is" ,imgbbKey)
        
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
                    sellerName, options, productName, originalPrice, sellingPrice, usagesTime, postingTime, location, image : imgData.data.url,  isAdvertized : false, conditions, purchage, phone, productDescription
                    }
                    fetch(` https://assignment-12-server-side.vercel.app/dashboard/addproducts`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization : `bearer ${localStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify(products)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                Swal.fire(
                                   'Product Addedd Successfully',
                                    navigate("/dashboard/addproducts")
                                  )
                            }
                        })
                 }
            })

       
        


    }


    // console.log("aaaaaa", userDetail)
    return (
        <div>
            <h2 className='text-3xl font-bold'>Please Add Product You Want to Sell</h2>
            <div className='mt-10'>
                <form onSubmit={handlePost}>
                    
                <div className="form-control w-full max-w-xs container mx-auto mb-10">
                   
                        {
                            userDetail?.isSeller ? <>
                                <input type="hidden" name="name" value={userDetail._id} />
                                <p>{userDetail.name}</p>
                            
                            </> : 
                                <select name="name" className="select select-bordered">
                            
                                    {
                                        sellerList?.map(seller=> <>
                                            <option value = {seller._id}>{seller.name}</option>
                                
                                        </>)
                                    }
                                </select>
                                
                        } 
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
                            <span className="label-text">Product Descriptin</span>
                        </label>
                        <input type="text" name="productDescription" placeholder="description" className="input input-bordered  w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text">Original Price</span>
                        </label>
                        <input type="text" placeholder="Price" name="originalPrice" className="input input-bordered  w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text">Selling Price</span>
                        </label>
                        <input type="text" placeholder="Price" name="sellingPrice" className="input input-bordered  w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text">Product Condition</span>
                        </label>
                        <select name="condition" className="select select-bordered w-full max-w-xs">
                        <option selected>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                        </select>
                        </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text">Year of Purchages</span>
                        </label>
                        <input type="text" placeholder="Usages Time" name="purchage" className="input input-bordered  w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text" >Usages Time</span>
                        </label>
                        <input type="text" placeholder="Usages Time" name="usagesTime" className="input input-bordered  w-full max-w-xs" />
                    </div>
                  
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input type="text" placeholder="location" name="location" className="input input-bordered  w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs container mx-auto">
                        <label className="label">
                            <span className="label-text">Mobile Number</span>
                        </label>
                        <input type="number" placeholder="Phone" name="number" className="input input-bordered  w-full max-w-xs" />
                    </div>
                    <button className='btn btn-primary mt-10 mb-10'>Post</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;