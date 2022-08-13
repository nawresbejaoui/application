import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import LoginContext from "../context/AuthProvider";



export function useAuth() {
    return useContext(AuthContext);
  }

  export function useLogin() {
    return useContext(LoginContext);
  }
