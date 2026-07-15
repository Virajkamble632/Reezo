import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const getProfile = async () => {

    try {

      const { data } = await api.get("/auth/profile");

      setUser(data.user);

    } catch (error) {

      setUser(null);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    getProfile();

  }, []);
    const logout = async () => {

    try {

      await api.post("/auth/logout");

      setUser(null);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        getProfile,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => useContext(AuthContext);