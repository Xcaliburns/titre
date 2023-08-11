/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext();

export const useUserContext = () => useContext(CurrentUserContext);

export function CurrentUserContextProvider({ children }) {

  

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))|| { role: "user" }; 
  
  return (

    
    <CurrentUserContext.Provider value={{
       user,setUser,
       }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
