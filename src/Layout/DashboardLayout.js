import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile container mx-auto">
            <input id="product-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                   <Outlet></Outlet>
                  
                
                </div> 
                <div className="drawer-side">
                    <label htmlFor="product-drawer" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                  
                    <li><Link to="/dashboard">My Order</Link></li>
                    <li><Link to="/dashboard/addproduct">Add Product</Link></li>
                    <li><Link to="/dashboard/addproducts">Product List</Link></li>
                    <li><Link to="/dashboard/allusers">All Users</Link></li>
                    </ul>
                
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;