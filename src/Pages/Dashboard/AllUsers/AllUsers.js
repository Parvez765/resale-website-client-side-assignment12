import React, { useEffect, useState } from 'react';

const AllUsers = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUsers(data)
            })
        
    }, [])

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
                        users.map((user, i) => <>
                            <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isSeller}</td>
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