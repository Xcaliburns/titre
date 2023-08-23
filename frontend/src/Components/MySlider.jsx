/* eslint-disable react/prop-types */

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

import customPrevArrow from "../assets/previousArrow.svg";
import customNextArrow from "../assets/nextArrow.svg";

import'../index.css';

function MySlider({ data }) {



  const settings = {
    dots: true,
    infinite: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <img src={customPrevArrow} alt="Previous" />,
    nextArrow: <img src={customNextArrow} alt="Next" />,
   
  };

  const navigate = useNavigate();

  const stockId = (id) => {
    localStorage.setItem("singleProductId", id);
    navigate(`/article/${id}`);
    console.log(id);
  };

  console.log(data);
  return (
    <div className="  border-4 border-red-600 rounded-md">
      
      <Slider {...settings}>
        {data.slice(-4).map((item) => (
          <div
            key={item.id}
            className="relative min-h-[280px] h-auto max-w-48 w-full items-center  bg-grey-50 rounded-md shadow-sm shadow-red-600/100"
          >
            {/* <div className=" absolute top-0 left-0 text-gray-100 w-full h-full text-5xl   ">a l'affiche</div> */}
            <img
              className="w-full h-auto object-cover  rounded-md"
              src={item.photo}
              alt={item.title}
            />
            <div className="absolute bottom-0 h-[80px]  left-0 w-full bg-gray-900 p-4 text-gray-100 mb-[-5px] bg-opacity-70 ">
            <h3 className="text-lg font-semibold ">{item.title}</h3>
              <div className="flex flex-row justify-between items-center align-center ">
                <p className="line-clamp-1">{item.description}</p>
              <button
                type="button"
                onClick={() => stockId(item.id)}
                className=" flex-shrink-0 inline-flex items-center px-4 py-2 mt-1 ml-4 text-xs font-semibold tracking-widest text-gray-100 text-lg uppercase transition duration-150 ease-in-out bg-gray-600 border border-transparent rounded-md active:bg-gray-600 false hover:bg-blue-500"
              >
                voir l'article
              </button></div>
              
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MySlider;
