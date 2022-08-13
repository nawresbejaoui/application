import React , { createContext, useState } from "react";

import axios from "axios";
import { NavigateBefore } from "@material-ui/icons";

export const AuthContext = createContext({});
 export const LoginContext = createContext({});

 function AuthProvider ({ children }) {
    const [auth, setAuth] = useState();
   
    

    const login= async (userName, password)=>{
      try {
            const response = await axios.post("http://localhost:5002/login", {
              username: userName,
              password: password,
            });
            setAuth(response.data.result[0]);
            console.log("hello success " + response.data.result[0].role);
            
          
           
      
          } catch (err) {
            console.log("failed " + err);
          }
    }
 

    return (
        <AuthContext.Provider value={auth}>
               <LoginContext.Provider value={login}>
                  {children}
               </LoginContext.Provider>
        </AuthContext.Provider>
        
    )
}
export default AuthProvider

