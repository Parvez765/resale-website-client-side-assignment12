import React from 'react';
import { Outlet } from 'react-router-dom';
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
                  
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                    </ul>
                
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;