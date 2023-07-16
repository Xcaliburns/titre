import React from "react";
import CallApi from "../Services/CallApi";
import { useEffect, useState } from "react";
import ProductCard from "../Components/productCard";
import Navbar from "../Components/Navbar";

function Article() {
  const [singleproduct, setSingleProduct] = useState(
    localStorage.getItem("singleProductId")
  );

  return (
    <div className="flex flex-col items-center bg-gray-600 min-h-full bg-cover ">
      <Navbar />
      <div>{`toto ${singleproduct}`}</div>
    </div>
  );
}

export default Article;
