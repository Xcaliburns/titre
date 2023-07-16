import { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext();

export const useUserContext = () => useContext(CurrentUserContext);
export function CurrentUserContextProvider({ children }) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userName, setUserName] = useState(JSON.parse(localStorage.getItem("userName"))); 
  const [userId, setUserId] = useState((localStorage.getItem("userId")));
  const [userEmail, setUserEmail] = useState(JSON.parse(localStorage.getItem("userEmail")));  

 
  return (
    <CurrentUserContext.Provider value={{userName, setUserName,userEmail, setUserEmail,userId, setUserId,} }>
      {children}
    </CurrentUserContext.Provider>
  );
}


