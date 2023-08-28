import CallApi from "../Services/CallApi";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

import MySlider from "../Components/MySlider";
import ProductCard from "../Components/productCard";
import Footer from "../Components/Footer";

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
    <div className="min-h-screen flex flex-col items-center  min-h-full lg:text-xl  ">
      <div className="flex flex-col  items-center bg-gray-100 min-h-full bg-cover w-full  shadow-xl shadow-blue-200  rounded-md-200  rounded-md ">
        <h2 className="w-full text-2xl font-bold text-center mt-5 bg-[#0092ca] rounded-md ">
          A l'affiche
        </h2>
        <div className="my-8 w-full md:w-1/2 lg:w-1/3 ">
          {Array.isArray(product) && product.length > 0 ? (
            <MySlider data={product} />
          ) : (
            <p>No products found.</p>
          )}
        </div>
        <h2 className="w-full text-2xl font-bold text-center mt-10 mb-5 bg-[#0092ca] rounded-md">
          Articles Récents
        </h2>
        <div className="flex flex-wrap justify-center ">
          {Array.isArray(product) && product.length > 0 ? (
            product
              .slice(-20)
              .reverse()
              .map((product) => (
                <ProductCard
                  className="font-bold"
                  key={product.id}
                  product={product}
                />
              ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
