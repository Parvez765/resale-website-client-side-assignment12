import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./HomeComponent.css"

import 'swiper/css'

// import required modules
import { Navigation } from "swiper";
import { bannerdatas } from '../../data/bannerdata';


const HomeComponent = () => {
    return (
        <>
        <Swiper
          rewind={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
            <div className=''>
                {
                    bannerdatas.map(bannerdata => <>
                        <SwiperSlide className='bannerContainer p-10 lg:p-36 text-white'>
                            <div className='shadow-lg p-14 rounded-lg'>
                                <h2 className='text-3xl lg:text-5xl font-bold mb-3'> {bannerdata.name}</h2>
                                <p className='text-xl lg:w-[600px] block mx-auto'>{bannerdata.details}</p>
                            </div>
                        </SwiperSlide>
                        
                    </>)
                }
           </div>
        </Swiper>
      </>
    );
};

export default HomeComponent;