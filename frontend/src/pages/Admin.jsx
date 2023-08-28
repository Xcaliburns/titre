import { useState } from "react";
import CallApi from "../services/CallApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

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
  // const [deleteId, setDeleteId] = useState("");
  const [action, setAction] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const ValidationSchemaProduct = yup.object().shape({
    shortDescription: yup.string().required("Le résumé est requis"),
    description: yup.string().required("La description est requise"),
    price: yup
      .mixed() // Using .mixed() to allow for multiple types
      .test(
        "is-valid-price",
        "Le prix doit être un nombre positif avec au plus 2 décimales",
        (value) => {
          if (!value) return false; // Handles the required case

          const parsedValue = parseFloat(value);
          if (isNaN(parsedValue)) return false; // Not a valid number

          return (
            parsedValue >= 0 && /^\d+(\.\d{1,2})?$/.test(parsedValue.toFixed(2))
          );
        }
      )
      .required("Le prix est requis"),

    photo: yup.string().required("La photo est requise"),
    title: yup.string().required("Le titre est requis"),
    studio: yup.string().required("Le studio est requis"),
    genre: yup.string().required("Le genre est requis"),
    release: yup.string().required("La date de sortie est requise"),
  });

  const fieldsName = {
    shortDescription,
    description,
    price,
    photo,
    title,
    studio,
    genre,
    release,
  };

  const reset = () => {
    setShortDescription("");
    setDescription("");
    setPrice("");
    setPhoto("");
    setTitle("");
    setStudio("");
    setGenre("");
    setRelease("");
    setProductId("");
    // setDeleteId("");
  };

  const clearError = (e) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const gameList = () => {
    CallApi.get("/api/product")
      .then((res) => setProductData(res.data))
      .catch((err) => console.error(err));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    reset();
    setAction("creation");
  };

  const handleChange = (e) => {
    e.preventDefault;
    reset();
    gameList();
    setAction("update");
  };

  const handleErase = (e) => {
    e.preventDefault;
    reset();
    gameList();
    setAction("delete");
  };

  const handleSubmit = async (err) => {
    err.preventDefault;
    try {
      await ValidationSchemaProduct.validate(fieldsName, { abortEarly: false });

      CallApi.post("api/product", fieldsName)
        .then(() => {
          reset();
          toast.success("🦄 Article ajouté avec succès!");
        })

        .catch((err) => err.response.data);
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setValidationErrors(errors);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await ValidationSchemaProduct.validate(fieldsName, { abortEarly: false });

      CallApi.put(`/api/product/${productId}`, fieldsName)
        .then(() => {
          reset();
          toast.success("Article mis à jour avec succès !");
        })
        .catch((err) => err.response.data);
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setValidationErrors(errors);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (productId) {
      CallApi.delete(`/api/product/${productId}`)
        .then(() => {
          toast.success("🦄 article supprimé avec succès!");
          setAction("");
        })
        .catch((err) => console.log(err.response.data));
    } else {
      toast.error("Erreur lors de la suppression !");
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

  

  return (
    <div className="flex flex-col  items-center text-xl bg-gray-200 min-h-full">
      

      <ToastContainer />

      <div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
          onClick={handleCreate}
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
        {action === "creation" && (
          <div className="w-full px-6 py-4 m-5 mt-10 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md rounded-lg">
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
                    onChange={(e) => {
                      setTitle(e.target.value);
                      clearError(e);
                    }}
                    value={title}
                    type="text"
                    name="title"
                    className=" block w-2/3 rounded-md"
                    id="title"
                  />
                  {validationErrors.title && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.title}
                    </p>
                  )}
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
                  onChange={(e) => {
                    setShortDescription(e.target.value);
                    clearError(e);
                  }}
                  value={shortDescription}
                  type="text"
                  name="shortDescription"
                  className="block w-2/3 rounded-md"
                  id="shortDescription"
                  minLength="4"
                  maxLength="100"
                  size="80"
                />
                {validationErrors.shortDescription && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.shortDescription}
                  </p>
                )}
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
                    onChange={(e) => {
                      setDescription(e.target.value);
                      clearError(e);
                    }}
                    value={description}
                    type="text"
                    name="description"
                    className="block w-2/3 rounded-md"
                    id="description"
                    minLength="4"
                    maxLength="100"
                    size="80"
                  />
                  {validationErrors.description && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.description}
                    </p>
                  )}
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
                    onChange={(e) => {
                      setPrice(e.target.value);
                      clearError(e);
                    }}
                    value={price}
                    type="text"
                    name="price"
                    className=" block w-2/3 rounded-md"
                    id="price"
                  />
                  {validationErrors.price && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.price}
                    </p>
                  )}
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
                    onChange={(e) => {
                      setPhoto(e.target.value);
                      clearError(e);
                    }}
                    value={photo}
                    type="text"
                    name="photo"
                    className=" block w-2/3 rounded-md"
                    id="photo"
                  />
                  {validationErrors.photo && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.photo}
                    </p>
                  )}
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
                    onChange={(e) => {
                      setStudio(e.target.value);
                      clearError(e);
                    }}
                    value={studio}
                    type="text"
                    name="studio"
                    className=" block w-2/3 rounded-md"
                    id="studio"
                  />
                  {validationErrors.studio && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.studio}
                    </p>
                  )}
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
                    onChange={(e) => {
                      setGenre(e.target.value);
                      clearError(e);
                    }}
                    value={genre}
                    type="text"
                    name="genre"
                    className=" block w-2/3 rounded-md"
                    id="genre"
                  />
                  {validationErrors.genre && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.genre}
                    </p>
                  )}
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
                    onChange={(e) => {
                      setRelease(e.target.value);
                      clearError(e);
                    }}
                    value={release}
                    type="text"
                    name="release"
                    className=" block w-2/3 rounded-md"
                    id="release"
                  />
                  {validationErrors.release && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.release}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
                onClick={handleSubmit}
              >
                Creer
              </button>
            </form>
          </div>
        )}

        {action === "update" && (
          <div className="px-6 py-4 mt-10 m-5 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg w-full min-h-800">
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
                      name="title"
                      className=" block w-2/3 rounded-md"
                      id="title"
                    />
                    {validationErrors.title && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.title}
                      </p>
                    )}
                  </div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-400  mt-4"
                  >
                    résumé
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      onChange={(e) => {
                        setShortDescription(e.target.value);
                        clearError(e);
                      }}
                      value={shortDescription}
                      type="text"
                      name="shortDescription"
                      className="block w-2/3 rounded-md"
                      id="shortDescription"
                    />
                    {validationErrors.shortDescription && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.shortDescription}
                      </p>
                    )}
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
                      onChange={(e) => {
                        setDescription(e.target.value);
                        clearError(e);
                      }}
                      value={description}
                      type="text"
                      name="description"
                      className="block w-2/3 rounded-md h-auto py-2 px-3 resize-y"
                      id="description"
                    />
                    {validationErrors.description && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.description}
                      </p>
                    )}
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
                    onChange={(e) => {
                      setPrice(e.target.value);
                      clearError(e);
                    }}
                    value={price}
                    type="price"
                    name="price"
                    className=" block w-2/3 rounded-md"
                    id="price"
                  />{" "}
                  {validationErrors.price && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.price}
                    </p>
                  )}
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
                    onChange={(e) => {
                      setPhoto(e.target.value);
                      clearError(e);
                    }}
                    value={photo}
                    type="text"
                    name="photo"
                    className=" block w-2/3 rounded-md"
                    id="photo"
                  />
                  {validationErrors.photo && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.photo}
                    </p>
                  )}
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
                    onChange={(e) => {
                      setStudio(e.target.value);
                      clearError(e);
                    }}
                    value={studio}
                    type="text"
                    name="text"
                    className=" block w-2/3 rounded-md"
                    id="price"
                  />
                  {validationErrors.studio && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.studio}
                    </p>
                  )}
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
                    onChange={(e) => {
                      setGenre(e.target.value);
                      clearError(e);
                    }}
                    value={genre}
                    type="text"
                    name="genre"
                    className=" block w-2/3 rounded-md"
                    id="genre"
                  />
                  {validationErrors.genre && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.genre}
                    </p>
                  )}
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
                    onChange={(e) => {
                      setRelease(e.target.value);
                      clearError(e);
                    }}
                    value={release}
                    type="text"
                    name="release"
                    className=" block w-2/3 rounded-md"
                    id="release"
                  />
                  {validationErrors.release && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.release}
                    </p>
                  )}
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
          </div>
        )}
        {action === "delete" && (
          <div className="w-full px-6 py-4 lg:min-w-500 m-5 mt-10 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg">
            <form className="bg-gray-800 " onSubmit={handleDelete}>
              <div className="mt-4">
                <label
                  htmlFor="titre"
                  className="block text-sm font-medium text-gray-400 "
                >
                  article à retirer
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
              <button
                type="submit"
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 m-4 ml-4 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-red-500"
              >
                Effacer
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
