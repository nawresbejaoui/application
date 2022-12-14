import "./newUser.css";
import React , {useState,useEffect} from 'react';
import {useNavigate ,useParams,Link} from 'react-router-dom';

import axios from "axios";
import { toast, Toast} from 'react-toastify';


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

export default function NewUser() {
  const [state,setState]=useState(initialState);
  const {username,password,location,URL,product_id,role,certifications,n_lots}=state;

  const  navigate = useNavigate();



  const handleSubmit=(e)=>{
      e.preventDefault();
      if( !username || !password || !location || !URL || !product_id || !role || !certifications || !n_lots){
          toast.error("please provide value into each input field")
      }else{
          axios
               .post("http://localhost:5002/api/users/post" ,{
                
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
               toast.success("user added successfully");
               navigate(`/users`);
             
      }
  };

  const handleInputChange=(e)=>{
      const {name,value}= e.target;
      setState({...state, [name]:value})
  }



 return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form  onSubmit={handleSubmit} className="newUserForm" >
      
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" 
           id="username"
           name="username"
          placeholder="Your User..."
          value={username}
          onChange={handleInputChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input style={{   width: "50%",
                           padding: "12px 20px",
                           margin: "8px 0",
                           marginRight: "450px",
                          
                           border: "1px solid #ccc",
                           borderRadius: "4px",
                           boxSizing: "border-box",
                          alignItems: "center"}} type="password" 
           id="password"
           name="password"
          placeholder="Your Password..."
          value={password}
          onChange={handleInputChange} />
        </div>
        <div className="newUserItem">
          <label>Location</label>
          <input type="text" 
             id="location"
             name="location"
             placeholder="Your Location..." 
             value={location}
             onChange={handleInputChange} />
          
        </div>
        <div className="newUserItem">
          <label>URL</label>
          <input type="text" 
            id="URL"
            name="URL"
            placeholder="Your URL..." 
            value={URL}
            onChange={handleInputChange} /> 
        </div>
        <div className="newUserItem">
          <label>Product_id</label>
          <input type="text" 
            id="product_id"
            name="product_id"
            placeholder="Your Product" 
            value={product_id}
            onChange={handleInputChange} /> 
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <input type="text" 
           id="role"
           name="role"
          placeholder="Your Role..."
          value={role}
          onChange={handleInputChange} /> 
          
        </div>
        <div className="newUserItem">
          <label>Certifications</label>
          <input type="text"
            id="certifications"
            name="certifications"
           placeholder="Your Certif..." 
           value={certifications}
           onChange={handleInputChange} /> 
        </div>
    
        <div className="newUserItem">
          <label>Num??ro de lots</label>
          <input type="text" 
            id="n_lots"
            name="n_lots"
            placeholder="Your Lot..."
            value={n_lots}
            onChange={handleInputChange} />  
        </div>
        
         <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
