import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentUserContextProvider } from "./context/UserContext";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Panier from "./pages/Panier";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Article from "./pages/article";

function App() {
  return (
    <BrowserRouter>
      <CurrentUserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/panier" element={<Panier />} />          
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/article" element={<Article />} />
        </Routes>
      </CurrentUserContextProvider>
    </BrowserRouter>
  );
}

export default App;

