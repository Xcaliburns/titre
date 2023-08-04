// import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Article from "./pages/article";

function App() {

  // useEffect(() => {
  //   const verifyUser = JSON.parse(localStorage.getItem("user"));

  //   if (!verifyUser) {
  //     // Si l'utilisateur n'existe pas dans le localStorage, créez-le et enregistrez-le
  //     const newUser = {
  //       id: 1,
  //       email: "user@example.com",
  //       role: "user",
  //     };
  //     localStorage.setItem("user", JSON.stringify(newUser));
  //   }
  // }, []);

  const {user } = useUserContext();


 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="search" element={<Search />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="article/:id" element={<Article />} />
        <Route
          element={
            <ProtectedRoute
              isAllowed={user && user.role===("admin") }
              redirectPath="/"
            />
          }
        >
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
