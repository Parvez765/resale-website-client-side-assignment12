import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBookings(data)
            })
        
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
                            bookings.map((booking, i )=> <>
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
        </div>
    );
};

export default Dashboard;