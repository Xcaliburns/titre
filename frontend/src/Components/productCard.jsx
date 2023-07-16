import React from "react";

function ProductCard({ description, price, photo, title }) {
  return (
    <div className="flex flex-row h-48 w-80 items-center border-4 border-cyan-500 bg-cyan-50 rounded-md shadow-lg shadow-cyan-500/100  mt-3 mx-10 hover:shadow-green-500/100 hover:border-green-500">
      <img className="h-24 max-w-48 rounded-md   " src={`${photo}`} alt="title" />     
      <div className="flex flex-col items-center w-max-150 w-min-150   text-wrap  ">
        <div className="  w-48 h-12 text-center">{title}</div>
        <div className="  w-48 h-54 text-center">{description}</div>
        <div className=" pb-2  text-2xl">{price} €</div>
      </div>
     </div>
  );
}

export default ProductCard;
