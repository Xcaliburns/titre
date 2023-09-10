/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const stockId = () => {
    localStorage.setItem("singleProductId", product.id);
    navigate(`/article/${product.id}`);
  };

  return (
    <div
      onClick={stockId}
      className="flex flex-col h-auto md:h-full  items-center border-4 border-[#0092ca] bg-gray-800 text-gray-100 rounded-md shadow-lg shadow-cyan-500/100 cursor-pointer mt-3 mx-10 hover:shadow-green-500/100 hover:border-green-500"
    >
      <img
        className=" w-full rounded-md   "
        src={product.photo}
        alt={product.title}
      />
      <div className="flex flex-col items-center w-max-150 w-min-150 ">
        <div className="  w-48 h-6 text-center truncate">{product.title}</div>
        <div className="  w-48 h-54 text-center truncate">
          {product.short_description}
        </div>
        <button className=" flex-shrink-0 inline-flex items-center px-4 py-2 mt-1 ml-4 text-xs font-semibold tracking-widest text-gray-100 text-lg uppercase transition duration-150 ease-in-out bg-gray-600 border border-transparent rounded-md active:bg-gray-600  hover:bg-blue-500">
          lire l'article
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
