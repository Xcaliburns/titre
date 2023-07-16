import React from "react";
import CallApi from "../Services/CallApi";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/productCard";
function home() {
  const [product, setProduct] = useState([]);
  const { userName, user, userEmail, userId } = useUserContext();
  useEffect(() => {
    CallApi.get("/api/product")
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, []);
  // console.log(user)
  console.log(userName);
  console.log(userEmail);
  console.log(userId);

  //  const handleAdd=(()=>{
  //     callApi.post("api/cartproduct",{
  //       cartId,productId,quantity
  //     })
  //   })
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
            />
            // {/* <button type="button" onClick={handleAdd}>ajouter au panier</button> */}
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default home;
