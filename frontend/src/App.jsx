// import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Layout from "./Components/Layout";
import Login from "./pages/Login";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Article from "./pages/article";
import Contact from"./pages/Contact";

function App() {
  const { user } = useUserContext();

  return (
    <BrowserRouter>
    <Layout >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="search" element={<Search />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="article/:id" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        <Route
          element={
            <ProtectedRoute
              isAllowed={user && user.role === import.meta.env.VITE_ADMIN_SECRET}
              redirectPath="/"
            />
          }
        >
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
