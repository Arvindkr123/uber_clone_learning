import { useState } from "react";
import { UserDataContext } from "./UserDataContext.jsx";

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);

  return <UserDataContext.Provider value={{user, setUser}}>{children}</UserDataContext.Provider>;
};
export default UserContext;
