import CallApi from "../Services/CallApi";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

import Navbar from "../Components/Navbar";
import MySlider from "../Components/MySlider";
import ProductCard from "../Components/productCard";

function Home() {
  const [product, setProduct] = useState([]);
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (!user) {
      setUser("");
    }
    CallApi.get("/api/product")
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col items-center  min-h-full lg:text-xl  ">
      <div className="flex flex-col  items-center bg-gray-300 min-h-full bg-cover w-full  shadow-xl shadow-blue-200  rounded-md-200  rounded-md ">
        <Navbar />
        <div className="my-8 w-full md:w-1/2 lg:w-1/3 ">
          {Array.isArray(product) && product.length > 0 ? (
            <MySlider data={product} />
          ) : (
            <p>No products found.</p>
          )}
        </div>
        <div className="flex flex-wrap justify-center rounded  ">
          {Array.isArray(product) && product.length > 0 ? (
            product.slice(-20).reverse().map((product) => (
              <ProductCard className="" key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
