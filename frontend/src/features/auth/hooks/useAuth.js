 /* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {login  ,logout,profile, register} from "../services/auth.api";

export const useAuth = () =>{
  const context=useContext(AuthContext);
  const {user,setUser,loading,setLoading}=context;

const handleLogin = async ({email,password}) => {
  try {
    setLoading(true);
    const data = await login({email,password, });
    console.log(data);//browser console 
    console.log("data.data =", data.data);
    setUser(data.data);//set user // my api response has data not user
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);//we cant be in loading stage for whole time after we recieve some response from backend we need to respond
  }
};

const handleRegister = async ({username,email,password}) => {
  const data = await register({username,email, password});
  setUser(data.data);
};
   
const handleLogout= async()=>{
      setLoading(true)
      const data=await logout();
      setUser(null);
      setLoading(false);
  }
  return {user,loading,handleLogin,handleRegister,handleLogout};
}