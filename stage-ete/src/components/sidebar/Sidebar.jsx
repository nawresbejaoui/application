import "./sidebar.css";
import {
  LineStyle,
  
  PermIdentity,
  Storefront,
  


  
} from "@material-ui/icons";
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from '../../context/AuthProvider';
import React, { useContext } from "react";

export default function Sidebar() {
  
const navigate=useNavigate();

const [auth, setAuth] = useContext(AuthContext);

const logout = ()=>{
   setAuth(null)

  navigate('/login')
}

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            
           
           
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Management</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            </ul>
            </div>
            

            <div className="sidebarMenu">
          <h3 className="sidebarTitle">Exit Administrator</h3>
          <ul className="sidebarList">
            <Link onClick={logout} to="/login"  className="link">
              <li className="sidebarListItem">
                <LogoutOutlined className="sidebarIcon" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      
       
        
      </div>
    </div>
  );
}
