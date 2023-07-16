import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import callAPI from "../Services/CallAPI";
import { toast } from "react-toastify";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    if ((email, password, name)) {
      callAPI
        .post("/api/user", { email, password, name })
        .then(() => navigate("/login"))
        .catch((err) => console.error(err));
    } else {
      alert("ajoutez un nom , un email et un password");
    }
  };

  return (
    
    <div className="flex flex-col min-h-full items-center  bg-slate-500">
      <Navbar />
      <form
        onSubmit={handleForm}
       
        className="w-full  px-6 py-4 mt-6 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg"
      >
        <div className="flex flex-col my-10">
          <label htmlFor="name" className="w-1/3 text-xl text-gray-100">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="name"
            className="rounded mr-10 h-10 w-250 text-xl"
            id="name"
          />
        </div>
        <div className="flex flex-col my-10">
          <label htmlFor="email" className="w-1/3 text-xl text-gray-100">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="rounded mr-10 h-10 w-250 text-xl"
            id="email"
          />
        </div>
        <div className="flex flex-col my-10">
          <label htmlFor="password" className="w-1/3 text-xl text-gray-100">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="rounded mr-10 h-10 w-250 text-xl"
            id="password"
          />
        </div>
        <button type="submit" className="inline-flex items-center px-4 py-2 mt-4 ml-1 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500">
          Inscription
        </button>
      </form>
    </div>
  );
}

export default SignUp;
