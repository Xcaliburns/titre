import { useState } from "react";
import CallApi from "../services/CallApi";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Admin() {
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [studio, setStudio] = useState("");
  const [genre, setGenre] = useState("");
  const [release, setRelease] = useState("");
  const [productData, setProductData] = useState([]);

  const [productId, setProductId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [action, setAction] = useState("");

  
  const gameList = () => {
    CallApi.get("/api/product")
    .then((res) => setProductData(res.data))
    .catch((err) => console.error(err));
  }

  const handleChange = (e) => {
    e.preventDefault();
    gameList();
    setAction("update");
  }

  const handleErase = (e) => {
    e.preventDefault();
    gameList ();
    setAction("delete");
      }

  const handleSubmit = () => {
    setProductId(productId);

    if (
      shortDescription &&
      description &&
      price &&
      photo &&
      title &&
      studio &&
      genre &&
      release
    ) {
      CallApi.post("api/product", {
        shortDescription,
        description,
        price,
        photo,
        title,
        studio,
        genre,
        release,
      })
        .then(() => {
          setShortDescription("");
          setDescription("");
          setPrice("");
          setPhoto("");
          setTitle("");
          setProductId("");
          setStudio("");
          setGenre("");
          setRelease("");

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

  const handleUpdate = (err) => {
    err.preventDefault();
    if (
      shortDescription &&
      description &&
      price &&
      photo &&
      title &&
      studio &&
      genre &&
      release
    )
      CallApi.put(`/api/product/${productId}`, {
        shortDescription,
        description,
        price,
        photo,
        title,
        studio,
        genre,
        release,
      })
        .then(() => {
          setShortDescription("");
          setDescription("");
          setPrice("");
          setPhoto("");
          setTitle("");
          setStudio("");
          setGenre("");
          setRelease("");
          toast.success("Article mis à jour avec succès !");
        })
        .catch((err) => console.log(err.response.data));
    else {
      alert(
        "veuillez controller si tous les champs sont à jour et que Price contient 2chiffres au moins  "
      );
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (deleteId) {
      CallApi.delete(`/api/product/${deleteId}`)
        .then(() => {
          toast.success("🦄 article supprimé avec succès!", {
            position: "top-center",
            autoClose: 4,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
          );
          setAction("");
        })
        .catch((err) => console.log(err.response.data));
    } else {
      toast.error("Erreur lors de la suppression !", {
        position: "center",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };

  const handleProductChange = (e) => {
    setProductId(e.target.value, 10);
    const selectedProduct = productData.find(
      (product) => product.id === parseInt(e.target.value, 10)
    );

    if (selectedProduct) {
      setShortDescription(selectedProduct.short_description);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price);
      setPhoto(selectedProduct.photo);
      setTitle(selectedProduct.title);
      setStudio(selectedProduct.studio);
      setGenre(selectedProduct.genre);
      setRelease(selectedProduct.release);     
    }
  };

  const handleDeleteId = (e) => {
    setDeleteId(e.target.value);
  };

  return (
    <div className="flex flex-col  items-center text-xl bg-gray-200 min-h-full">
      <Navbar />

      <div>
        
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
          onClick={() => setAction("creation")}
        >
          Creer
        </button>
        
       
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
          onClick={handleChange}
        >
          Modifier
        </button>
        
       
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
          onClick={handleErase}
        >
          Supprimer
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
       {action === "creation" && <div className="w-full px-6 py-4 m-5 mt-10 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md rounded-lg">
          <form className="bg-gray-800 " onSubmit={handleSubmit}>
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
                  id="title"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                resumé
              </label>
            </div>
            <div className="flex flex-col items-start">
              <input
                onChange={(e) => setShortDescription(e.target.value)}
                value={shortDescription}
                type="text"
                name="shortDescription"
                className="block w-2/3 rounded-md"
                id="shortDescription"
                minLength="4"
                maxLength="100"
                size="80"
              />
            </div>

            <div className="mt-4">
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
                  minLength="4"
                  maxLength="100"
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
                studio
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setStudio(e.target.value)}
                  value={studio}
                  type="text"
                  name="studio"
                  className=" block w-2/3 rounded-md"
                  id="studio"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                genre
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setGenre(e.target.value)}
                  value={genre}
                  type="text"
                  name="genre"
                  className=" block w-2/3 rounded-md"
                  id="genre"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                release
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setRelease(e.target.value)}
                  value={release}
                  type="text"
                  name="release"
                  className=" block w-2/3 rounded-md"
                  id="release"
                />
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
              onClick={handleSubmit}
            >
              Creer
            </button>
            <ToastContainer />
          </form>
        </div>}

        {action === "update" && <div className="px-6 py-4 mt-10 m-5 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg w-full min-h-800">
          <form className="bg-gray-800 " onSubmit={handleUpdate}>
            <div className="bg">

            <div className="mt-4">
              <label
                htmlFor="titre"
                className="block text-sm font-medium text-gray-400 "
              >
                Titre à modifier
              </label>
              <select
                value={productId}
                onChange={handleProductChange}
                className="pl-2 text-black h-10 rounded-lg bg-gray-200 shadow-lg shadow-blue-500/50 w-2/3 "
              >
                {" "}
                <option value="">---</option>
                {productData
                  .slice()
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((product) => (
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
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-400  mt-4"
                >
                  résumé
                </label>
                <div className="flex flex-col items-start">
                  <input
                    onChange={(e) => setShortDescription(e.target.value)}
                    value={shortDescription}
                    type="text"
                    name="shortDescription"
                    className="block w-2/3 rounded-md"
                    id="shortDescription"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-400 undefined"
                >
                  Contenu de l'article
                </label>
                <div className="flex flex-col items-start ">
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    name="description"
                    className="block w-2/3 rounded-md h-auto py-2 px-3 resize-y"
                    id="description"
                  />
                </div>
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
                studio
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setStudio(e.target.value)}
                  value={studio}
                  type="text"
                  name="text"
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
                genre
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setGenre(e.target.value)}
                  value={genre}
                  type="text"
                  name="genre"
                  className=" block w-2/3 rounded-md"
                  id="genre"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-400 "
              >
                release
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setRelease(e.target.value)}
                  value={release}
                  type="text"
                  name="release"
                  className=" block w-2/3 rounded-md"
                  id="release"
                />
              </div>
            </div>

           
            <button
              type="submit"
              onClick={handleUpdate}
              className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
            >
              Update
            </button>
          </form>
        </div>}
        {action === "delete" &&<div className="w-full px-6 py-4 lg:min-w-500 m-5 mt-10 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg">
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
              > <option value="">---</option>
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
              className="inline-flex items-center px-4 py-2 m-4 ml-4 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-red-500"
            >
              Effacer
            </button>
          </form>
        </div>}
      </div>
    </div>
  );
}

export default Admin;
