import {useState} from "react";
import { useNavigate } from "react-router-dom";


function ProductCard({id, description, price, photo, title }) {

  const navigate = useNavigate();


  
  
  const stockId = () =>{
    
    localStorage.setItem("singleProductId", id);
    navigate(`/article/${id}`);    
    console.log(id);
   }


   
  return (
    <div
    onClick={stockId}
      className="flex flex-row h-48 w-80 items-center border-4 border-red-600 bg-grey-100 text-white rounded-md shadow-lg shadow-cyan-500/100  mt-3 mx-10 hover:shadow-green-500/100 hover:border-green-500"
    >
      <img
        className="h-24 max-w-48 rounded-md   "
        src={`${photo}`}
        alt="title"
      />
      <div className="flex flex-col items-center w-max-150 w-min-150   text-wrap  ">
        <div className="  w-48 h-12 text-center">{title}</div>
        <div className="  w-48 h-54 text-center">{description}</div>
        <div className=" pb-2  text-2xl">{price} €</div>
        <div className=" pb-2  text-2xl">{id} </div>

      </div>
     
    </div>
  );
}

export default ProductCard;
