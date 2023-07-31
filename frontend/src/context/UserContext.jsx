import { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext();

export const useUserContext = () => useContext(CurrentUserContext);

export function CurrentUserContextProvider({ children }) {

  

  const [user, setUser] = useState(localStorage.getItem("user") ); 
  const [userName, setUserName] = useState(JSON.parse(localStorage.getItem("userName")));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userEmail, setUserEmail] = useState(JSON.parse(localStorage.getItem("userEmail")));
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem("role"))); // Convertir en objet JavaScript avec JSON.parse()

  return (

    
    <CurrentUserContext.Provider value={{
       user,setUser,
       userName, setUserName, userEmail, setUserEmail, userId, setUserId, userRole, setUserRole }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
