/* eslint-disable react-refresh/only-export-components */
import { createContext, useState,useEffect } from "react";
import { profile } from "./services/auth.api";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    const getAndSetUser=async()=>{
       const data=await profile();
       setUser(data);
       setLoading(false);
    }
    getAndSetUser();

  },[]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
