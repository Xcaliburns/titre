import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { userEmail, setUserEmail, setUserName, setUserId, setUserRole } =
    useUserContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const adminLog = import.meta.env.VITE_ADMIN_LOGIN;

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setUserEmail("");
    setUserName("");
    setUserId("");
    setUserRole("");
    alert("vous avez été déconnecté");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-dark shadow h-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5">
          <h2 className="text-2xl font-bold text-white">indie World</h2>
          <div className="md:hidden">
            {isMenuOpen ? (
              <FaTimes
                className="text-white text-3xl cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <FaBars
                className="text-white text-3xl cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              />
            )}
          </div>
        </div>
        <nav className="hidden md:flex md:flex-row md:items-center md:space-x-6 md:text-xl text-gray-100">
          <div className="hover:text-green-300">
            <NavLink to="/">Accueil</NavLink>
          </div>
          <div className="hover:text-green-300">
            <NavLink to="/login">Login</NavLink>
          </div>
          <div className="hover:text-green-300">
            <NavLink to="/signup">Inscription</NavLink>
          </div>
          <div className="flex flex-row">
            <div className="hover:text-green-300">
              {userEmail === adminLog && <NavLink to="/admin">Admin</NavLink>}
            </div>
            <div className="hover:text-red-900">
              <button className="" type="button" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
      {/* Responsive menu items */}
      <div
        className={`md:hidden bg-dark shadow transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="px-4 py-2">
          <NavLink
            to="/"
            className="block text-white hover:text-green-300 py-2"
          >
            Accueil
          </NavLink>
          <NavLink
            to="/login"
            className="block text-white hover:text-green-300 py-2"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="block text-white hover:text-green-300 py-2"
          >
            Inscription
          </NavLink>

          {userEmail === adminLog && (
            <NavLink
              to="/admin"
              className="block text-white hover:text-green-300 py-2"
            >
              Admin
            </NavLink>
          )}
          <button
            className="block text-white hover:text-red-900 py-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
