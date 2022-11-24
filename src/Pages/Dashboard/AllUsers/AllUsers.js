import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const AllUsers = () => {

    


    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => 
            fetch(`http://localhost:5000/users`)
                .then(res => res.json())

                // , {
                //     headers: {
                //         authorization : `bearer ${localStorage.getItem("accessToken")}`
                //     }
                // }
        
    })

    if (isLoading) {
        return <button type="button" class="bg-indigo-500 ..." disabled>
        <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
         
        </svg>
        Processing...
      </button>
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
                                <td><button className='btn btn-primary btn-sm'>Verify</button></td>
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