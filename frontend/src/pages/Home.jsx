import CallApi from "../Services/CallApi";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Navbar from "../Components/Navbar";
import MySlider from "../Components/MySlider";
import ProductCard from "../Components/productCard";

function Home() {
  const [product, setProduct] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    CallApi.get("/api/product")
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, []);

  
  return (
    <div className="flex flex-col items-center bg-gray-600 min-h-full bg-cover  ">
      <Navbar />
      {/* <div className="text-3xl text-slate-100 mt-5  mb-5 h-grow">
        {user && user !== null ? `Hello ${user.name}` : "hello guest"}
      </div> */}
      <div className="my-8 w-3/4">
        {Array.isArray(product) && product.length > 0 ? (
          <MySlider data={product} />
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <div className="flex flex-wrap justify-center rounded border-x-2 ">
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
