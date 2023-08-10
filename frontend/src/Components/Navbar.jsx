import { useEffect, useState } from "react";
import CallApi from "../services/CallApi";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logged, setLogged] = useState("");
  const adminLog = import.meta.env.VITE_ADMIN_LOGIN;

  const logout = (e) => {
    e.preventDefault();
    CallApi.get("/api/logout")
      .then(() => {
        localStorage.removeItem("user");
        setUser(JSON.parse(localStorage.getItem("user")));
        alert("vous avez été déconnecté");
        localStorage.setItem("logged", JSON.stringify(false));
        setLogged(false);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setLogged(JSON.parse(localStorage.getItem("logged")));
  }, []);

  return (
    <nav className="w-full bg-gray-600 shadow-xl shadow-blue-200 h-24 rounded-md z-50 text-gray-100">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div>
          <NavLink to="/">
            {" "}
            <a>
              <h2 className=" flex flex-row text-2xl  font-bold ">
                <p>{`InDé `} </p> <p className="text-blue-400">{` Jouable`}</p>
              </h2>

              <p className="">pour les passionnés de jeux indés</p>
            </a>
          </NavLink>
        </div>
        <div className="md:hidden flex items-center pr-4 ">
          {isMenuOpen ? (
            <FaTimes
              className="flex   text-3xl cursor-pointer "
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <FaBars
              className="flex   text-3xl cursor-pointer "
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>

        <nav className="hidden md:flex md:flex-row md:items-center md:space-x-6 md:pt-6 md:text-xl  justify-center pb-4">
          <div className="hover:text-green-300">
            <NavLink to="/">Accueil</NavLink>
          </div>
          <div className="hover:text-green-300">
            <NavLink to="/search">recherche</NavLink>
          </div>

          {logged === false && (
            <div className="hover:text-green-300">
              <NavLink to="/login">Login</NavLink>
            </div>
          )}

          {logged === false && (
            <div className="hover:text-green-300">
              <NavLink to="/signup">Inscription</NavLink>
            </div>
          )}
          <div className="flex flex-row">
            {logged === true && (
              <div className="hover:text-red-700">
                <button className="" type="button" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
            <div className="hover:text-green-300 ml-2">
              {user && user.email === adminLog && (
                <NavLink to="/admin">Admin</NavLink>
              )}
            </div>
          </div>
        </nav>
      </div>
      {/* Responsive menu items */}
      <div
        className={`md:hidden bg-black  shadow transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex flex-col items-center">
          <NavLink to="/" className="block  hover:text-green-300 py-2">
            Accueil
          </NavLink>
          <div className="hover:text-green-300">
            <NavLink to="/search" className="block  hover:text-green-300 py-2">
              recherche
            </NavLink>
          </div>
          {logged === false && (
            <div className="hover:text-green-300">
              <NavLink to="/login">Login</NavLink>
            </div>
          )}
        {logged === false && (
            <div className="hover:text-green-300">
              <NavLink to="/signup">Inscription</NavLink>
            </div>
          )}

          {user && user.email === adminLog && (
            <NavLink to="/admin" className="block  hover:text-green-300 ">
              Admin
            </NavLink>
          )}
           {logged === true && (
              <div className="hover:text-red-700">
                <button className="" type="button" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
           
        </div>
      </div>
    </nav>
  );
}
