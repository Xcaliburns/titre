import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
 const { userEmail,setUserEmail,setUserName,setUserId } = useUserContext();
  const navigate = useNavigate();

const logout=(e)=>{
  e.preventDefault();
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
  setUserEmail("");
  setUserName("");
  setUserId("");
  alert("vous avez été deconnecté");
  navigate('/login');
}

  return (
    <nav className="w-full min-h-200 flex flex-col bg-dark shadow h-24 min-h-full ">
      <div className="justify-between flex flex-col px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <h2 className="text-2xl font-bold text-white">indie World</h2>
          </div>
        </div>
        <div>
          <nav className=" flex flex-row align-center  space-y-8 md:flex md:space-x-6 md:space-y-0 text-xl text-gray-100">
            
              
              <div className=" pl-2 hover:border-2 hover:rounded-md hover:text-green-300  hover:shadow-green-500/300 hover:border-green-500">
                <NavLink to="/">Accueil</NavLink>
              </div>
              <div className="pl-2 hover:border-2 hover:rounded-md hover:text-green-300  hover:shadow-green-500/300 hover:border-green-500">
                <NavLink to="/login">Login</NavLink>
              </div>
              <div className=" pl-2 hover:border-2 hover:rounded-md hover:text-green-300  hover:shadow-green-500/300 hover:border-green-500 ">
                <NavLink to="/signup">Inscription</NavLink>
              </div>
            
            <div className="flex flex-row">
              <div className="pl-2  hover:border-2 hover:rounded-md hover:text-green-300  hover:shadow-green-500/300 hover:border-green-500 ">
                <NavLink to="/panier">Panier</NavLink>
              </div>
              <div className=" pl-2 hover:border-2 hover:rounded-md hover:text-green-300  hover:shadow-green-500/300 hover:border-green-500 ">
                {userEmail === "david.abruzzo@sfr.fr" && (
                  <NavLink to="/admin">Admin</NavLink>
                )}
              </div>
               <div className="pl-2  hover:border-2 hover:rounded-md hover:text-red-900  hover:shadow-red-500/300 hover:border-red-900">
                <button className="" type="button" onClick={logout}>Logout</button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
}
