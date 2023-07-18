import React from "react";
import CallApi from "../Services/CallApi";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/productCard";
import { useNavigate } from "react-router-dom";


function Home() {


  const [product, setProduct] = useState([]);
  const { userName, user, userEmail, userId } = useUserContext();
  const navigate = useNavigate();


  useEffect(() => {
    CallApi.get("/api/product")
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, []);

  localStorage.removeItem("singleProductId");
   console.log(product)
  console.log(userName);
  console.log(userEmail);
  console.log(userId);

 
  return (
    <div className="flex flex-col items-center bg-gray-600 min-h-full bg-cover ">
      <Navbar />
      <div className="text-3xl text-slate-100 mt-24  mb-12 h-grow">
        Hello {userName}
      </div>
      <div className="flex flex-wrap rounded border-x-2 ">
        {Array.isArray(product) && product.length > 0 ? (
          product.map((product) => (
            <ProductCard
              className=""
              key={product.id}
              photo={product.photo}
              description={product.description}
              price={product.price}
              title={product.title}
              id={product.id}
              
            />
           
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
