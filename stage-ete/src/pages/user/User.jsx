import {

  LocationSearching,
  


} from "@material-ui/icons";
import {WorkspacePremiumOutlined,
        LinkOutlined,
} from '@mui/icons-material';

import { Link } from "react-router-dom";
import "./user.css";

import React , {useState,useEffect} from 'react';
import {useNavigate ,useParams,useLocation} from 'react-router-dom';

import axios from "axios";
import { toast} from 'react-toastify';






const initialState={
  
  username:"",
  password:"",
  location:"",
  URL:"",
  product_id:"",
  role:"",
  certifications:"",
  n_lots:"",
};
export default function User() {

  const [state,setState]=useState(initialState);
  const {username,password,location,URL,product_id,role,certifications,n_lots}=state;

  const  navigate = useNavigate();


  

  const [utilisateur,setUtilisateur]=useState({});
  const locations=useLocation();
  const user_id=locations.pathname.split("/")[2]
 



useEffect(()=>{
    axios
         .get(`http://localhost:5002/api/users/get/${user_id}`)
         .then((resp)=>setUtilisateur({...resp.data[0]}));

},[user_id]);

  useEffect(()=>{
    const res=()=> axios
                    .get(`http://localhost:5002/api/users/get/${user_id}`)
                    .then((resp)=>setState({...resp.data[0]}));
                    res();
     

  },[user_id]);


  const handleSubmit=(e)=>{
      e.preventDefault();
      if(!username || !password || !location || !URL || !product_id || !role || !certifications || !n_lots){
          toast.error("please provide value into each input field")
      }else{
          axios
               .put(`http://localhost:5002/api/users/${user_id}`,{
                
                username,
                password,
                location,
                URL,
                product_id,
                role,
                certifications,
                n_lots ,
                  

               })
               .then(()=>{
                  setState({username:"",password:"",location:"",URL:"",product_id:"",role:"",certifications:"",n_lots:""});
               })
               .catch((err)=>toast.error(err.response.data));
               toast.success("user updated successfully");
               navigate(`/users`);
             
      }
  };

  const handleInputChange=(e)=>{
      const {name,value}= e.target;
      setState({...state, [name]:value})
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
          
            <div className="userShowTopTitle">
              <span className="userShowUsername">{utilisateur.username}</span>
              <span className="userShowUserTitle">{utilisateur.role}</span>
            
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
           
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{utilisateur.location}</span>
              
            </div>
            <div className="userShowInfo">
              <WorkspacePremiumOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{utilisateur.certifications}</span>
              
            </div>
            <div className="userShowInfo">
              <LinkOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{utilisateur.URL}</span>
              
            </div>
           
         
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form  onSubmit={handleSubmit}  className="userUpdateForm" >
            <div className="userUpdateLeft">
             
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Your Name..."
               
                  value={username || ""}
                  onChange={handleInputChange} 
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="your Password..."
                  
                  value={password || ""}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Your Location..."
                 
                  value={location || ""}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>URL</label>
                <input
                  type="text"
                  id="URL"
                  name="URL"
                  placeholder="Your URL..."
               
                  value={URL || ""}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Product_id</label>
                <input
                  type="text"
                  placeholder="Your Product..."
                  id="product_id"
                  name="product_id"
                
                  value={product_id || ""}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Your Role..."
              
                  value={role||""}
                  onChange={handleInputChange} 
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>certification</label>
                <input
                  type="text"
                  id="certifications"
                  name="certifications"
                  placeholder="Your Certif..."
               
                  value={certifications||""}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
             
          
              <div className="userUpdateItem">
                <label>N_lots</label>
                <input
                  type="text"
                  id="n_lots"
                  name="n_lots"
                  placeholder="Your Lot..."
              
                  value={n_lots||""}
                  onChange={handleInputChange} 
                  className="userUpdateInput"
                />
              </div>
              </div>
              <div className="userUpdateRight">
              
                  <button className="userUpdateButton">Update</button>
              </div>
            
           
          </form>
        </div>
      </div>
    </div>
  );
}
