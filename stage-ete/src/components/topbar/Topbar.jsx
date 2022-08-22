import React, { useContext,useEffect } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import {AuthContext} from '../../context/AuthProvider';

import { useNavigate } from "react-router-dom";



export default function Topbar() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate=useNavigate();


  useEffect(()=>{
    if(!auth){
     navigate('/login')

    }
   
},[auth] );
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">CYCLONE IT</span>
        </div>
        



        
        
        <div className="topRight">
        

          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          
        </div>
      </div>
    </div>
    
  );
}
