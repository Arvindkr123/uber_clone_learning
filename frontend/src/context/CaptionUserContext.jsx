/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext } from "react";

const UserCaptionDataContext = createContext();

const UserCaptionContextProvider = ({ children }) => {
  const [caption, setCaption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <UserCaptionDataContext.Provider
      value={{ caption, setCaption, isLoading, setIsLoading, error, setError }}
    >
      {children}
    </UserCaptionDataContext.Provider>
  );
};  

export const useUserCaptionContext = () => {
  return useContext(UserCaptionDataContext);
};

export default UserCaptionContextProvider;
