import { Link } from "react-router-dom";
import "./product.css";
import React , {useState,useEffect} from 'react';
import {useNavigate ,useParams,useLocation} from 'react-router-dom';

import axios from "axios";
import { toast} from 'react-toastify';

import moment from 'moment';








const initialState={
  date_production:"",
  lieu:"",
  date_extraction:"",
  date_control:"",
  technique_stockage:"",
  n_lots:"",
  date_expiration:"",
};



export default function Product() {
  const [state,setState]=useState(initialState);
  const {date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration}=state;

  const  navigate = useNavigate();


  

  const locations=useLocation();
  const product_id=locations.pathname.split("/")[2]


  
  useEffect(()=>{
    const res=()=> axios
                    .get(`http://localhost:5002/api/products/get/${product_id}`)
                    .then((resp)=>setState({...resp.data}));
                    res();
     

  },[product_id]);


  const handleSubmit=(e)=>{
      e.preventDefault();
      if(!date_production || !lieu || !date_extraction || !date_control || !technique_stockage|| !n_lots || !date_expiration){
          toast.error("please provide value into each input field")
      }else{
          axios
               .put(`http://localhost:5002/api/products/${product_id}`,{
                   
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
               toast.success("product updated successfully");
               navigate(`/products`);
             
      }
  };

  const handleInputChange=(e)=>{
      const {name,value}= e.target;
      setState({...state, [name]:value})
  }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
 
      <div className="productBottom">
          <form onSubmit={handleSubmit}  className="productForm">
              <div className="productFormLeft">
                  <label>Date_production</label>
                  <input type="date" 
                   id="date_production"
                   name="date_production"
                   placeholder='YYYY-MM-DD'
                   value={moment.utc(date_production).format('YYYY-MM-DD') || ""}
                   onChange={handleInputChange} 
                   />



                  <label>Lieu</label>
                  <input type="text" 
                    id="lieu"
                    name="lieu"
                    placeholder="lieu"
                    value={lieu || ""}
                  
                    onChange={handleInputChange}  />
                  <label>Date_Extraction</label>
                  <input type="date" 
                  id="date_extraction"
                  name="date_extraction"
                  placeholder='YYYY-MM-DD' 
                  value={moment.utc(date_extraction).format('YYYY-MM-DD') || ""}
                  onChange={handleInputChange} />



                  <label>Date_Control</label>
                  <input type="date" 
                     id="date_control"
                     name="date_control"
                     placeholder='YYYY-MM-DD'
                     value={moment.utc(date_control).format('YYYY-MM-DD') || ""}
                     onChange={handleInputChange} />



                  <label>Technique_stockage</label>
                  <input type="text" 
                    id="technique_stockage"
                    name="technique_stockage"
                    placeholder="technique de stockage"
                    value={technique_stockage ||""}
                    onChange={handleInputChange}/>

                  <label>n_lots</label>
                  <input type="text"
                    id="n_lots"
                    name="n_lots"
                    placeholder="numéro de lots" 
                    value={n_lots || ""}
                    onChange={handleInputChange}  />


                  <label>Date_Expiration</label>
                  <input type="date" 
                  id="date_expiration"
                  name="date_expiration"
                  placeholder='YYYY-MM-DD'
                  value={moment.utc(date_expiration).format('YYYY-MM-DD') || ""}
                  onChange={handleInputChange} />

                  
              </div>
             
            
              <div className="productFormRight">
                  
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
