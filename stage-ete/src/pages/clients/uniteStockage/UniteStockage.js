
import { Link,useNavigate} from 'react-router-dom';
import './uniteStockage.css';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast} from 'react-toastify';
import styled from "styled-components";
import PageHeader from "../../../components/PageHeader";
import Storefront from '@mui/icons-material/Storefront';
import {AuthContext} from '../../../context/AuthProvider';
import React , {useState,useEffect,useContext} from 'react';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://media.istockphoto.com/photos/olive-oil-and-olives-isolated-on-reflective-white-background-picture-id1210564532?k=20&m=1210564532&s=612x612&w=0&h=VAjpSXUJjkR_xYeXkY0vbXc4cWT1oDrpbUdT-8lwGuM=")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const initialState={
  product_id:"",
  technique_stockage:"",
  
};

const Moulin = () => {
    const [state,setState]=useState(initialState);
    const [products,setProducts]=useState("");
    const {product_id, technique_stockage}=state
    const navigate=useNavigate();

    const [auth, setAuth] = useContext(AuthContext);
    
    const logout = ()=>{
       setAuth(null)
    
      navigate('/login')
    }
 
    useEffect(()=>{
      axios
      .get(`http://localhost:5002/api/products/AllId`)
      .then((res)=>{
        setProducts(res.data);
      })
      .catch((err)=>toast.error(err.response.data));
  },[] );

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!product_id || !technique_stockage ){
            toast.error("please provide value into each input field")
        }else{
          
                axios
                .put(`http://localhost:5002/api/products/stockage/${product_id}`,{
                  technique_stockage,
                })
                .then(()=>{
                  toast.success('product added successfully');
                })
                .catch((err)=>toast.error(err.response.data));

        }
    };

    const handleInputChange=(e)=>{
        const {name,value}= e.target;
        setState({...state, [name]:value})
    }
  
   

 

  return (
    <>
     <PageHeader
                title="New Product"
                subTitle="C'est l'interface de L'unite de stockage"
                icon={<Storefront fontSize="large" />}
            />
    <Container>
     
   
    <div style={{marginBottom:"300px",
                 marginRight:"350px"}}>
        <form style={{
            margin:"auto",
            padding:"15px",
            maxwidth:"400px",
            alignContent:"center"
        }}
        onSubmit={handleSubmit}>

        <label htmlFor='product_id'>ID</label>
       

      <select id="product_id"
        name="product_id" onChange={handleInputChange}>
           <option value="">--Select Id--</option>
           {
            products && products.map((product,index) => (
<option key={index} value={product.product_id}>{product.product_id}</option>
            )
            )
           }

      </select>
       
        <label htmlFor=' technique_stockage'>Technique_Stockage</label>
        <input
        type="text"
        id="technique_stockage"
        name="technique_stockage"
        placeholder="technique de stockage"
        value={technique_stockage}
        onChange={handleInputChange}
        
        />
        

        <input type="submit"    value="Save"/>
        <Link to="/login">
            <input type="button"  onClick={logout} value="Go Back" />
        </Link>
        
            
            
        </form>

    
    </div>
   
    </Container>
    </>

  )

}

export default Moulin