import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCaptain, setIsCaptain] = useState(false);
  const [isCarDetailsPresent, setIsCarDetailPresent] = useState(false);

  useEffect(() => {
    async function getUserProfile() {
      const response = await api.get("/user/getUserProfile");
      setUser(response.data.user);
      if(response.data.user.role === "DRIVER") {setIsCaptain(true); setIsCarDetailPresent(response.data.captainDetails)};
    }

    getUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isCaptain, setIsCaptain, isCarDetailsPresent, setIsCarDetailPresent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
