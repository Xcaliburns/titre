import {useState} from "react";
import { useNavigate } from "react-router-dom";


function ProductCard({product }) {

  const navigate = useNavigate();


  
  
  const stockId = () =>{
    
    localStorage.setItem("singleProductId", id);
    navigate(`/article/${id}`);    
    
   }


   
  return (
    <div
    onClick={stockId}
      className="flex flex-row h-48 w-80 items-center border-4 border-red-600 bg-gray-800 text-white rounded-md shadow-lg shadow-cyan-500/100  mt-3 mx-10 hover:shadow-green-500/100 hover:border-green-500"
    >
      <img
        className="h-24 max-w-48 rounded-md   "
        src={`${product.photo}`}
        alt={product.title}
      />
      <div className="flex flex-col items-center w-max-150 w-min-150   text-wrap  ">
        <div className="  w-48 h-12 text-center">{product.title}</div>
        <div className="  w-48 h-54 text-center">{product.short_description}</div>
        <button className=" flex-shrink-0 inline-flex items-center px-4 py-2 mt-1 ml-4 text-xs font-semibold tracking-widest text-white text-lg uppercase transition duration-150 ease-in-out bg-gray-600 border border-transparent rounded-md active:bg-gray-600 false hover:bg-blue-500">lire l'article</button>
       
        

      </div>
     
    </div>
  );
}

export default ProductCard;
