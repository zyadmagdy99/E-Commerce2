import React from 'react';
import Slider from 'react-slick';
import main from "../../assets/slider-image-1.jpeg";
import main1 from "../../assets/slider-image-2.jpeg";
import main2 from "../../assets/slider-image-3.jpeg";
import main3 from "../../assets/clem-onojeghuo-206832-600x500.jpg";
import main4 from "../../assets/drew-coffman-1872.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className='flex flex-col lg:flex-row justify-center'>
    
      <div className='w-full lg:w-3/5 mb-4 lg:mb-0'>
        <Slider {...settings}>
          <img src={main2} alt="" className='h-[250px] sm:h-[300px] lg:h-[400px] w-full object-cover' />
          <img src={main3} alt="" className='h-[250px] sm:h-[300px] lg:h-[400px] w-full object-cover' />
          <img src={main4} alt="" className='h-[250px] sm:h-[300px] lg:h-[400px] w-full object-cover' />
        </Slider>
      </div>

     
      <div className='w-full lg:w-1/4 flex flex-row lg:flex-col flex-wrap justify-between'>
        <img className='h-[150px] sm:h-[200px] w-[49%] lg:w-full object-cover' src={main1} alt="" />
        <img src={main} alt="" className='h-[150px] sm:h-[200px] w-[49%] lg:w-full object-cover' />
      </div>
    </div>
  );
}
