import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Panier from "./pages/Panier";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Article from "./pages/article";

function App() {
  const { user } = useUserContext();
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="panier" element={<Panier />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="article/:id" element={<Article />} />
        {/* <Route
          element={
            <ProtectedRoute
            isAllowed={user !== null && user.role === "admin"}
              redirectPath="/login"
            />
          }
        >
          <Route path="admin" element={<Admin />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
