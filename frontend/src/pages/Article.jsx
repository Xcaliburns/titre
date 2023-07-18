import React from "react";
import CallApi from "../Services/CallApi";
import { useEffect, useState } from "react";
import ProductCard from "../Components/productCard";
import Navbar from "../Components/Navbar";

function Article() {

  const[article, setArticle] = useState([]);
  const articleId = localStorage.getItem("singleProductId");


  useEffect(() => {
    CallApi.get(`/api/product/${articleId}`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.error(err));
  }, []);


  
  console.log(article);
  

  return (
    <div className="flex flex-col items-center bg-gray-600 min-h-full bg-cover ">
      <Navbar />
     

      <div
   
      className="flex flex-row h-48 w-80 items-center border-4 border-cyan-500 bg-cyan-50 rounded-md shadow-lg shadow-cyan-500/100  mt-3 mx-10 hover:shadow-green-500/100 hover:border-green-500"
    >
      <img
        className="h-24 max-w-48 rounded-md   "
        src={`${article.photo}`}
        alt="title"
      />
      <div className="flex flex-col items-center w-max-150 w-min-150   text-wrap  ">
        <div className="  w-48 h-12 text-center">{article.title}</div>
        <div className="  w-48 h-54 text-center">{article.description}</div>
        <div className=" pb-2  text-2xl">{article.price} €</div>
        

      </div>
     
    </div>
    </div>
  );
}

export default Article;
