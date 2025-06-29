/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext } from "react";

const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserDataContext);
};

export default UserContext;
