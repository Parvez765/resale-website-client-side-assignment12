import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const [wishLists, setWishList] = useState([])

    const fecthBooking = () => {
        fetch(` https://assignment-12-server-side.vercel.app/bookings?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setBookings(data)
            })
    }
    
    // WishList Api
    const fetchWishlist = () => {
        fetch(` https://assignment-12-server-side.vercel.app/wishlist?email=${user?.email}`)
        .then(res => res.json())
        .then(data => setWishList(data))
    }
    useEffect(() => {
        fecthBooking()
        fetchWishlist()
        
    }, [user?.email])


    
    

    // Booking Delete Operation 
    const fetchDeleteBooking = (id) => {
        fetch(` https://assignment-12-server-side.vercel.app/bookings/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    Swal.fire(
                        'Congratulation!',
                        'Product Successfully Deleted From Orders!',
                        'success'
                      )
                }
            })
    }

    const handleBookingDelete = (id) => {
        fetchDeleteBooking(id)
        fecthBooking ()
        
        
    }




    // WishList Delete Operation
    const fetchDelete = (id) => {
        fetch(` https://assignment-12-server-side.vercel.app/wishlist/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    Swal.fire(
                        'Congratulation!',
                        'Product Successfully Deleted From Wishlist!',
                        'success'
                      )
                }
            })
    }
    const handleDelete = (id) => {
        fetchDelete(id)
        fetchWishlist()
        
    }
    
    
    return (
        <div>
            <h2 className='text-2xl font-bold mb-10'>My Orders</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                  
                    <thead>
                    <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Condition</th>
                            <th>Selling Price</th>
                            <th>Usages Time</th>
                            <th>Status</th>
                            <th>Delete</th>
                            <th>Payment</th>
                    </tr>
                    </thead>
                    <tbody>
                 
                        {
                            bookings?.map((booking, i) => <>
                                
                                <tr>
                                    <th>{i + 1}</th>
                                    <div className="avatar">
                                        <div className="w-[50px] ms-10 mt-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={booking.image} />
                                        </div>
                                    </div>
                                    <td>{booking.productName}</td>
                                    <td>{booking.conditions}</td>
                                    <td>{booking.sellingPrice} BDT</td>
                                    <td>{booking.usagesTime}</td>
                                    <td>{!booking?.isBooked ? <button className='btn btn-primary'>Avaiable</button> : <button className='btn btn-outline'>Sold</button>}</td>
                                    <td><button onClick={() => handleBookingDelete(booking._id)} className="btn btn-sm">Delete</button></td>
                                    <td><button className='btn btn-outline'>Pay</button></td>
                                </tr>
                            </>)  
                         }
                 
                 
                    </tbody>
                </table>
            </div>
            <div className='mt-14'>
                <h2 className='text-2xl font-bold mb-10'>WishList</h2>
                <div>
                <div className="overflow-x-auto">
                <table className="table w-full">
                  
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Name</th>
                        <th>Condition</th>
                        <th>Selling Price</th>
                        <th>Usages Time</th>
                        <th>Status</th>
                        <th>Delete</th>
                        <th>Payment</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                 
                        {
                            wishLists?.map((wishlist, i) => <>
                                
                                <tr>
                                    <th>{i + 1}</th>
                                    <div className="avatar">
                                        <div className="w-[50px] ms-10 mt-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={wishlist.adItem.image} alt=""/>
                                        </div>
                                    </div>
                                    <td>{wishlist.adItem.productName}</td>
                                    <td>{wishlist.adItem.conditions}</td>
                                    <td>{wishlist.adItem.sellingPrice} BDT</td>
                                    <td>{wishlist.adItem.usagesTime}</td>
                                    <td>{!wishlist?.adItem.isBooked ? <button className='btn btn-primary'>Avaiable</button> : <button className='btn btn-outline'>Sold</button>}</td>
                                    <td><button onClick={() => handleDelete(wishlist._id)} className="btn btn-sm">Delete</button></td>
                                    <td><button className='btn btn-outline'>Pay</button></td>
                                </tr>
                            </>)  
                         }
                 
                 
                    </tbody>
                </table>
            </div> 
                </div>
            </div>
        </div>
    );
};

export default Dashboard;