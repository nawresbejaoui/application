import "./sidebar.css";
import {
  LineStyle,
  
  PermIdentity,
  Storefront,
  


  
} from "@material-ui/icons";
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import { Link } from "react-router-dom";

export default function Sidebar() {
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
            <Link to="/login" className="link">
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
