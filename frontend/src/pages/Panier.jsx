import React from "react";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import Navbar from "../Components/Navbar";
import CallApi from "../Services/CallApi";

function panier() {
  const [cart, setCart] = useState([]);
  const [cartproductlist, setCartProductList] = useState([]);
  const { userId } = useUserContext();
  //je veux recuperer le dernier cart du user:
  //----il me faut tout les carts
  useEffect(() => {
    CallApi.get("/api/cart")
      .then((res) => {
        console.log(res.data);
        const filteredData = res.data.filter(
          (item) => item.user_id === parseInt(userId, 10)
        );
        setCart(filteredData[filteredData.length - 1]);
        // console.log(res.data)
        console.log(userId);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    CallApi.get("/api/cartproduct/")
      .then((res) => {
        console.log(res.data);
        const filteredData = res.data.filter(
          (item) => item.cart_id === cart.id
        );
        console.log(filteredData);
        setCartProductList(res.data);
        //  console.log(userId)
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(userId);

  //-----il me faut product cart qui ont le meme id que les cart du user
  //je veux recuperer les articles du panier (product_cart)
 return (
  <div className="flex flex-col items-center bg-gray-600 min-h-full bg-cover text-black-900">
    <Navbar />
    {userId && userId > 0 ? (
      <div className="text-xl text-slate-100 mt-24  mb-12 h-grow">
        <div className="flex flex-wrap rounded border-x-2">
          {cartproductlist.map((product) => (
            <div key="product.id">
              <div className="flex flex-row h-24 w-80 items-center border-4 border-cyan-500 bg-cyan-50 rounded-md shadow-lg shadow-cyan-500/100  mt-3 mx-10 hover:shadow-green-500/100 hover:border-green-500 text-black">
                <img className="h-24 max-w-48 rounded-md" src={`${product.photo}`} alt="title" />
                <div className="flex flex-col items-center w-max-150 w-min-150 text-wrap">
                  <div className="w-48 h-12 text-center">{product.title}</div>
                  <div className="pb-2 text-2xl">{product.price} €</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div>Vous devez être connecté pour afficher cette liste de produits.</div>
    )}
  </div>
);

}

export default panier;
