import React from "react";
import { useState, useEffect } from "react";
import CallApi from "../services/CallApi";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Admin() {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState([]);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [productData, setProductData] = useState([]);

  
  const [productId, setProductId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    CallApi.get("/api/product")
      .then((res) => setProductData(res.data))
      .catch((err) => console.error(err));
  }, [productId]);

  const handleSubmit = (err) => {
    setProductId(productId);

    if (description && price && photo && title) {
      CallApi.post("api/product", {
        description,
        price,
        photo,
        title,
      })
        .then(() => {
          setDescription("");
          setPrice([])
          setPhoto("");
          setTitle("");
          setProductId("");

          toast.success("🦄 article ajouté avec succès!", {
            position: "top-center",
            autoClose: 4,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })

        .catch((err) => console.log(err.response.data));
    } else {
      alert("Vous ne pouvez pas ajouter le meme article deux fois");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (description && price && photo && title)
      CallApi.put(`/api/product/${productId}`, {
        description,

        price,

        photo,
        title,
      })
        .then(() => {
          // Affiche le toast de réussite
          toast.success("Produit mis à jour avec succès !");
        })
        .catch((err) => console.log(err.response.data));
    else {
      alert("Please specify a description, a price  a password and a title");
    }
  };

  const handleDelete = (e) => {
    //e.preventDefault();
    if (deleteId)
      CallApi.delete(`/api/product/${deleteId}`)
        .then(() => {})
        .catch((err) => console.log(err.response.data));
    else {
      // Affiche le toast de réussite
      toast.success("Produit supprimé avec succès !", {
        position: "center",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };

  const handleProductChange = (e) => {
    setProductId(e.target.value);
  };

  const handleDeleteId = (e) => {
    setDeleteId(e.target.value);
  };

  return (
    <div className="flex flex-col  items-center text-xl bg-gray-500 min-h-full">
      <Navbar />

      <div className="flex flex-col lg:flex-row">
        <div className="w-full px-6 py-4 m-5 mt-10 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg">
          <form className="bg-gray-800 " onSubmit={handleSubmit}>
            <div className="mt-10 min-h-full">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                description
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  type="text"
                  name="description"
                  className="block w-2/3 rounded-md"
                  id="description"
                  minlength="4"
                  maxlength="100"
                  size="80"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                prix
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="text"
                  name="Id"
                  className=" block w-2/3 rounded-md"
                  id="Id"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                photo
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setPhoto(e.target.value)}
                  value={photo}
                  type="text"
                  name="photo"
                  className=" block w-2/3 rounded-md"
                  id="photo"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                titre
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  name="title"
                  className=" block w-2/3 rounded-md"
                  id="photo"
                />
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
              onClick={handleSubmit}
            >
              Creer
            </button>
            <ToastContainer />
          </form>
        </div>
        <div className="px-6 py-4 mt-10 m-5 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg w-full min-h-800">
          <form className="bg-gray-800 " onSubmit={handleUpdate}>
            <div className="bg">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 undefined"
              >
                Description
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  type="text"
                  name="description"
                  className="block w-2/3 rounded-md"
                  id="description"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                Price
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="price"
                  name="price"
                  className=" block w-2/3 rounded-md"
                  id="price"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                Photo
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setPhoto(e.target.value)}
                  value={photo}
                  type="text"
                  name="photo"
                  className=" block w-2/3 rounded-md"
                  id="photo"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                Titre
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  name="titre"
                  className=" block w-2/3 rounded-md"
                  id="photo"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="titre"
                className="block text-sm font-medium text-gray-400 "
              >
                titre
              </label>
              <select
                value={productId}
                onChange={handleProductChange}
                className="pl-2 text-black h-10 rounded-lg bg-gray-200 shadow-lg shadow-blue-500/50 w-2/3 "
              >
                {productData.map((product) => (
                  <option
                    className="text-black"
                    value={product.id}
                    key={product.id}
                  >
                    {product.title}
                  </option>
                ))}
              </select>
              {/* <option value="">---</option> */}
            </div>
            <button
              type="submit"
              onClick={handleUpdate}
              className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
            >
              Update
            </button>
          </form>
        </div>
        <div className="w-full px-6 py-4 lg:min-w-500 m-5 mt-10 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg">
          <form className="bg-gray-800 " onSubmit={handleUpdate}>
            <div className="mt-4">
              <label
                htmlFor="titre"
                className="block text-sm font-medium text-gray-400 "
              >
                article à retirer
              </label>
              <select
                value={deleteId}
                onChange={handleDeleteId}
                className="pl-2 text-black h-10 rounded-lg bg-gray-200 shadow-lg shadow-blue-500/50 w-2/3"
              >
                {productData.map((product) => (
                  <option
                    className="text-black"
                    value={product.id}
                    key={product.id}
                  >
                    {product.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 m-4 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-red-500"
            >
              Effacer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
