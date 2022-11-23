import React from 'react';
import { Link } from 'react-router-dom';
import logoIcon from "../../../src/assests/images/logo-01.png"

const Navbar = () => {
    return (
        <div className='container mx-auto'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <div className='flex items-center'>
                          
                            <div><Link className="btn btn-ghost normal-case text-xl">BuyandSell.com</Link></div>
                        </div>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="">Dashboard</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to=""><button className='btn btn-primary'>Log In</button></Link></li>
                    
                   
                    </ul>
                    </div>
                    <div className='hidden lg:flex items-center '>
                        <div><img src={logoIcon} className="w-[80px]" alt="" /></div>
                        <div><Link className="btn btn-ghost normal-case text-xl">BuyandSell.com</Link></div>
                    </div>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="">Dashboard</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to=""><button className='btn btn-primary'>Log In</button></Link></li>
                    
                    
                    </ul>
                </div>
               
            </div>
        </div>
    );
};

export default Navbar;