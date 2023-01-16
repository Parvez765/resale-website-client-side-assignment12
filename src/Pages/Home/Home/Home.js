import React from 'react';
import headerImg from "../../../assests/images/headerImg-01.png"
import Contact from '../../../Component/Contact/Contact';
import HomeComponent from '../../../Component/HomeComponent/HomeComponent';
import HowWorks from '../../../Component/HowWorks/HowWorks';
import ProductCategory from '../../ProductCategory/ProductCategory';
import Advertised from '../Advertised/Advertised';
import SerachSection from '../SerachSection/SerachSection';

const Home = () => {
    return (
        <div className="">
            <HomeComponent />
            <HowWorks />
            <ProductCategory/>
            <Advertised />
            <Contact/>
        </div>
    );
};

export default Home;