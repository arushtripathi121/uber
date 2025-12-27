import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserProfile() {
      const response = await api.get("/user/getUserProfile");
      setUser(response.data);
    }

    getUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
