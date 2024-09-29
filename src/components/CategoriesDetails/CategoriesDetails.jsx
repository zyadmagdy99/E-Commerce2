import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; 

export default function CategoriesDetails() {
  const [numSlides, setNumSlides] = useState(5);
  const [Cat, setCat] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: numSlides,
    slidesToScroll: 3,
    autoplay: true,
  };

  function GetCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCat(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  useEffect(() => {
    GetCategories();
  }, []);

  useEffect(() => {
    const updateNumSlides = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setNumSlides(7); // Desktop
      } else if (width >= 768) {
        setNumSlides(3); // Tablet
      } else {
        setNumSlides(2); // Mobile
      }
    };

    updateNumSlides();

    window.addEventListener('resize', updateNumSlides);

    return () => {
      window.removeEventListener('resize', updateNumSlides);
    };
  }, []);

  return (
    <>
      <div className='w-5/6 mx-auto my-20'>
        <h2 className='py-4 font-bold md:text-4xl text-2xl w-full mx-4'>Shop popular categories:</h2>
        <Slider {...settings}>
          {Cat?.map((cat) => (
            <div key={cat._id}> 
              <img className='w-full h-[200px]' src={cat.image} alt={cat.name} />
              <h3 className='text-center'>{cat.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
