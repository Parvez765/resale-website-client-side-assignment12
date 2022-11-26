import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const [wishLists, setWishList] = useState([])

    

    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setBookings(data)
            })
        
    }, [user?.email])

    // WishList Api

    useEffect(() => {
        fetch(`http://localhost:5000/wishlist?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setWishList(data))
        
   }, [user?.email])


    return (
        <div>
            <h2 className='text-2xl font-bold mb-10'>My Orders</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                  
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Condition</th>
                        <th>Selling Price</th>
                        <th>Usages Time</th>
                    </tr>
                    </thead>
                    <tbody>
                 
                        {
                            bookings?.map((booking, i) => <>
                                
                                <tr>
                                    <th>{i+1}</th>
                                    <td>{booking.productName}</td>
                                    <td>{booking.conditions}</td>
                                    <td>{booking.sellingPrice} BDT</td>
                                    <td>{booking.usagesTime}</td>
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
                        <th>Name</th>
                        <th>Condition</th>
                        <th>Selling Price</th>
                        <th>Usages Time</th>
                    </tr>
                    </thead>
                    <tbody>
                 
                        {
                            wishLists?.map((wishlist, i) => <>
                                
                                <tr>
                                    <th>{i+1}</th>
                                    <td>{wishlist.adItem.productName}</td>
                                    <td>{wishlist.adItem.conditions}</td>
                                    <td>{wishlist.adItem.sellingPrice} BDT</td>
                                    <td>{wishlist.adItem.usagesTime}</td>
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