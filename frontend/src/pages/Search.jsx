import { useState, useEffect, useRef } from "react";
import CallApi from "../services/CallApi";
import Navbar from "../components/Navbar";
import ProductCard from "../Components/productCard";

function Search() {
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchInputRef = useRef(null);

  useEffect(() => {
    CallApi.get("/api/product")
      .then((res) => setProductData(res.data))
      .catch((err) => console.error(err));
    setSearchTerm(localStorage.getItem("searchTerm"));
    searchInputRef.current.focus();
  }, []);

  const productsList = () => {
    setFilteredProducts(
      productData.filter((product) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
          product.title.toLowerCase().includes(lowerSearchTerm) ||
          product.genre.toLowerCase().includes(lowerSearchTerm) ||
          product.studio.toLowerCase().includes(lowerSearchTerm)
        );
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && searchTerm.length > 0) {
      localStorage.setItem("searchTerm", searchTerm);
      productsList();
    }
  };
  const setSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col  items-center text-xl bg-gray-200 min-h-full">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full px-6 py-4 m-5 mt-10 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg">
          <form className="bg-gray-800 ">
            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Entrez votre recherche :
              </label>
              <div className="flex flex-col items-start">
                <input
                  ref={searchInputRef}
                  onChange={setSearch}
                  value={searchTerm}
                  type="text"
                  name="searchTerm"
                  className=" block w-2/3 rounded-md"
                  id="searchTerm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
              onClick={handleSubmit}
            >
              rechercher
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-wrap justify-center rounded ">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts
            .slice() 
            .sort((a, b) => a.title.localeCompare(b.title)) 
            .map((product) => (
              <ProductCard className="" key={product.id} product={product} />
            ))
        ) : (
          <p>Pas de résultats</p>
        )}
      </div>
    </div>
  );
}

export default Search;
