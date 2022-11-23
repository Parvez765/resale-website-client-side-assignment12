import React, { useContext, useState } from 'react';

import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import Swal from 'sweetalert2'
import { GoogleAuthProvider } from 'firebase/auth';
import { Link } from 'react-router-dom';


const Signup = () => {

    const [seller, setSeller] = useState(false)

    const setIsSeller = () => {
        setSeller(!seller)
    }

    const { createUser, user, googleSignIn } = useContext(AuthContext)
    
    const googleProvider = new GoogleAuthProvider()

    const handleOnSubmit = event => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const seller = String(form.seller.value) === '1' || String(form.seller.value).toLowerCase() === 'true' 
        

        createUser(email, password)
            .then(result => {
                signupuserInfo(name, email, seller)
                Swal.fire(
                    'Congratulation!',
                    'User Created Successfully!',
                    'success'
                  )
               
            })
        .catch(err=> console.error(err))
    }
    
    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
           
                .then(result => {
                    const user = result.user
                    googleuserInfo(user.displayName, user.email)
                Swal.fire(
                    'Congratulation!',
                    'User Created Successfully!',
                    'success'
                  )
            })
        .catch(err=> console.error(err))
    }


    // Sending User Info At Databse
    const signupuserInfo = (name, email, isSeller, isVerified = false) => {
        const user = { name, email, isSeller, isVerified }
        fetch(`http://localhost:5000/users`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(user)
        })
    }
    
    const googleuserInfo = (displayName, email) => {
        const user = { displayName, email }
        fetch(`http://localhost:5000/users`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(user)
        })
    }


    return (
        <div>
           <div className="hero">
                <div className="hero-content flex-col">
                    <div className="text-center">
                    <h1 className="text-5xl font-bold">SignUp!</h1>
                   
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleOnSubmit}>
                            <div className="card-body">
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name="name" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                
                                </div>
                                 <label className='label'><input type="checkbox" name="seller" value={seller} checked={seller} onChange={setIsSeller} className="checkbox" /> Seller</label>
                               
                                <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                                </div>
                            </div>
                        </form>
                        <div className='mb-6'>
                        <button className='btn btn-outline' onClick={handleGoogleSignIn}>Sign In With Google</button>
                        </div>
                        <Link to="/login"><button className='btn btn-link'>Already Have An Account? Please Login</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;