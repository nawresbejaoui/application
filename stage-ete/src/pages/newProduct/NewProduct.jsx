import "./newProduct.css";

import React , {useState} from 'react';
import {useNavigate } from 'react-router-dom';

import axios from "axios";
import { toast} from 'react-toastify';



const initialState={
  
  date_production:"",
  lieu:"",
  date_extraction:"",
  date_control:"",
  technique_stockage:"",
  n_lots:"",
  date_expiration:"",
};






export default function NewProduct() {
  const [state,setState]=useState(initialState);
  const {date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration}=state;

  const  navigate = useNavigate();



  const handleSubmit=(e)=>{
      e.preventDefault();
      if( !date_production || !lieu || !date_extraction || !date_control || !technique_stockage|| !n_lots || !date_expiration ){
          toast.error("please provide value into each input field")
      }else{
        console.log(state);
          axios
               .post("http://localhost:5002/api/products/post" ,{
                
                date_production,
                lieu,
                date_extraction,
                date_control,
                technique_stockage,
                n_lots,
                date_expiration,
                  

               })
               .then(()=>{
                  setState({date_production:"",lieu:"",date_extraction:"",date_control:"", technique_stockage:"",n_lots:"", date_expiration:""});
               })
               .catch((err)=>toast.error(err.response.data));
               toast.success("product added successfully");
               navigate(`/products`);
             
      }
  };

  const handleInputChange=(e)=>{
      const {name,value}= e.target;
      setState({...state, [name]:value})
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form onSubmit={handleSubmit}  className="addProductForm">
   
     
      <div className="addProductItem">
          <label>Date_Production</label>
          <input type="date" 
          id="date_production"
          name="date_production"
          placeholder="YYYY-MM-DD"
          value={date_production}
          onChange={handleInputChange}  />
        </div>
       
        <div className="addProductItem">
          <label>Lieu</label>
          <input type="text"
          id="lieu"
          name="lieu"
          placeholder="lieu"
          value={lieu}
          onChange={handleInputChange} />
        </div>
        <div className="addProductItem">
          <label>Date_Extraction</label>
          <input type="date" 
          id="date_extraction"
          name="date_extraction"
          placeholder="YYYY-MM-DD" 
          value={date_extraction}
          onChange={handleInputChange}/>
        </div>
        <div className="addProductItem">
          <label>Date_Control</label>
          <input type="date" 
          id="date_control"
          name="date_control"
          placeholder="YYYY-MM-DD"
          value={date_control}
          onChange={handleInputChange}/>
        </div>
        <div className="addProductItem">
          <label>Technique_Stockage</label>
          <input type="text"
          id="technique_stockage"
          name="technique_stockage"
           placeholder="technique de stockage"
           value={technique_stockage}
           onChange={handleInputChange} />
        </div>
        <div className="addProductItem">
          <label>n_lots</label>
          <input type="text"
          id="n_lots"
          name="n_lots"
           placeholder="numéro de lots" 
           value={n_lots}
           onChange={handleInputChange}/>
        </div>
       
        <div className="addProductItem">
          <label>Date_Expiration</label>
          <input type="date" 
          id="date_expiration"
          name="date_expiration"
          placeholder="YYYY-MM-DD"
          value={date_expiration}
          onChange={handleInputChange}/>
        </div>
       
     
        
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
