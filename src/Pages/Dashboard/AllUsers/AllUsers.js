import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AllUsers = () => {

    
    const [users, setUsers] = useState([])

    
    const fetchUser = () => {
        fetch(` https://assignment-12-server-side.vercel.app/users`)
            .then(res => res.json())
            .then(data => {
            setUsers(data)
        })
    }
    
    useEffect(() => {
        fetchUser()
    }, [])
    
    const handleDelete = (id) => {
        fetch(` https://assignment-12-server-side.vercel.app/users/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    Swal.fire(
                        'Congratulation!',
                        'User Deleted Successfully!',
                        'success'
                    )
                    fetchUser()
                }
            })
        
    }

    // Update Seller
    const handleUpdate = (id) => {
        fetch(` https://assignment-12-server-side.vercel.app/users/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                   
                        Swal.fire(
                            'Congratulation!',
                            'Seller Verified Successfully!',
                            'success'
                        )
                        fetchUser()
                    
            }
        })
    }

    console.log("userdata" ,users)

    return (
        <div>
            <h2 className='text-3xl font-bold mb-10'>User List</h2>
            <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                  
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Seller</th>
                        <th>Status</th>
                        <th>Activity</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                   
                    { 
                        users?.map((user, i) => <>
                            <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.isSeller && <p>Seller</p>}</td>
                                <td>{user?.isSeller && !user?.isVerified &&  <button className='btn btn-primary btn-sm' onClick={()=> handleUpdate(user._id)}>Verify</button>}</td>
                                <td><button className='btn btn-primary btn-sm' onClick={()=> handleDelete(user._id)}>Delete</button></td>
                            </tr>
                  
                        </>)
                    }
                    
                    </tbody>
                </table>
                </div>
               
            </div>
        </div>
    );
};

export default AllUsers;