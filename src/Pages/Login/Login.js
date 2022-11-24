import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Swal from 'sweetalert2'

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const {googleSignIn, userLogin} = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider()

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        const options = form.options.value

        userLogin(email, password)
            .then(result => {
                const user = result.user
                navigate(from, { replace: true })
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
                navigate(from, { replace: true })
                Swal.fire(
                    'Congratulation!',
                    'User Created Successfully!',
                    'success'
                )
               
            })
        .catch(err=> console.error(err))
    }

    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6"></p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin}>
                            <div className="card-body">
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                    
                                    <div className="form-control w-full max-w-xs mt-5">
                                        <label className="label">
                                            <span className="label-text">Select Account Type</span>
                                         
                                        </label>
                                        <select name="options" className="select select-bordered">
                                            <option   selected>Buyer</option>
                                            <option>Seller</option>
                                            
                                        </select>
                                       
                                    </div>
                                {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                                </div>
                                <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                                </div>
                                <div>
                                <button className='btn btn-outline' onClick={handleGoogleSignIn}>Sign In With Google</button>
                                </div>
                                <Link to="/signup"><button className='btn btn-link'>New To This Account? Please Sign Up</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;