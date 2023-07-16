import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { userEmail, setUserEmail, setUserName, setUserId } = useUserContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const adminLog = "admin@example.com"; // Replace this with the admin email

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setUserEmail("");
    setUserName("");
    setUserId("");
    alert("vous avez été déconnecté");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-dark shadow h-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5">
          <h2 className="text-2xl font-bold text-white">indie World</h2>
          <div className="md:hidden">
            <div
              className={`text-white p-2 ${
                isMenuOpen ? "text-white" : ""
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes className="text-3xl" /> : <FaBars className="text-3xl" />}
            </div>
          </div>
        </div>
        <nav className="hidden md:flex md:flex-row md:items-center md:space-x-6 md:text-xl text-gray-100">
          {/* Your existing menu items */}
        </nav>
      </div>
      {/* Responsive menu items */}
      <div
        className={`md:hidden bg-dark shadow transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="px-4 py-2">
          <NavLink to="/" className="block text-white hover:text-green-300 py-2">
            Accueil
          </NavLink>
          <NavLink to="/login" className="block text-white hover:text-green-300 py-2">
            Login
          </NavLink>
          <NavLink to="/signup" className="block text-white hover:text-green-300 py-2">
            Inscription
          </NavLink>
          <NavLink to="/panier" className="block text-white hover:text-green-300 py-2">
            Panier
          </NavLink>
          {userEmail === adminLog && (
            <NavLink to="/admin" className="block text-white hover:text-green-300 py-2">
              Admin
            </NavLink>
          )}
          <button className="block text-white hover:text-red-900 py-2" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
