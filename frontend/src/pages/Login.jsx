import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import callApi from "../Services/CallApi";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[logged, setLogged] = useState("");

  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      callApi
        .post("/api/login", { email, password })
        .then((res) => {
          const userOnline = res.data;

          localStorage.setItem("user", JSON.stringify(userOnline));
          setUser(JSON.parse(localStorage.getItem("user")));
          localStorage.setItem("logged", JSON.stringify(true));
          setLogged(true)
          navigate("/");
        })
        .catch((err) => console.error("Erreur : ", err));
                        
    } else {
      alert("Please specify email and password");
    }
  };

  return (
    <div className="flex flex-col min-h-full items-center  bg-gray-200">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="w-full  px-6 py-4 mt-6 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg"
      >
        <div className="flex flex-col my-10">
          <label htmlFor="email" className="w-1/3 text-xl text-gray-100">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className="rounded mr-10 h-10 w-250 text-xl"
            id="email"
          />
        </div>
        <div className="flex flex-col my-10">
          <label htmlFor="password" className="w-1/3 text-xl text-gray-100 ">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="rounded mr-10 h-10 w-250 text-xl"
            id="password"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 mt-4 ml-1 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
        >
          Connexion
        </button>
      </form>
    </div>
  );
}

export default Login;
