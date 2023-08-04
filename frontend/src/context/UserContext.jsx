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
