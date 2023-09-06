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
  const [logged, setLogged] = useState(false);
  const adminLog = import.meta.env.VITE_ADMIN_SECRET;

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
    if (localStorage.getItem("logged"))
      setLogged(JSON.parse(localStorage.getItem("logged")));
  }, []);

  return (
    <nav className="w-full bg-gray-800 shadow-xl shadow-blue-200 h-24 rounded-md z-50 text-gray-100">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div data-testid="navbar-logo">
          <NavLink to="/">
            {" "}
            <a>
              <h2 className=" flex flex-row text-2xl  font-bold ">
                <p>{`InDé `} </p>{" "}
                <p className="text-[#0092ca] ">{` Jouable`}</p>
              </h2>

              <p className="">la passion des jeux indés</p>
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

        <nav
          className="hidden md:flex md:flex-row md:items-center md:space-x-6 md:pt-6 md:text-xl  justify-center pb-4"
          id="menu"
        >
          <div className="hover:text-[#0092ca]" id="home" >
           <NavLink to="/">Accueil</NavLink>
          </div>
          <div className="hover:text-[#0092ca]">
            <NavLink to="/search">Recherche</NavLink>
          </div>

          {logged === "" ||
            (logged === false && (
              <div className="hover:text-[#0092ca]" id="login">
                <NavLink to="/login">Connexion</NavLink>
              </div>
            ))}

          {logged === "" ||
            (logged === false && (
              <div className="hover:text-[#0092ca]" id="signup">
                <NavLink to="/signup">Inscription</NavLink>
              </div>
            ))}
          <div className="flex flex-row" id="logout">
            {logged === true && (
              <div className="hover:text-red-700" id="logout">
                <button className="" type="button" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
            <div className="hover:text-green-300 ml-2" id="admin">
              {user && user.role === adminLog && (
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
              Recherche
            </NavLink>
          </div>
          {logged === "" ||
            (logged === false && (
              <div className="hover:text-green-300" id="login">
                <NavLink to="/login">Connexion</NavLink>
              </div>
            ))}

          {logged === false && (
            <div className="hover:text-green-300">
              <NavLink to="/signup">Inscription</NavLink>
            </div>
          )}

          {user && user.role === adminLog && (
            <div>
              <NavLink to="/admin" className="block  hover:text-green-300 ">
                Admin
              </NavLink>
            </div>
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
