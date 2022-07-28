import React , {useState} from 'react';
import { Link} from 'react-router-dom';
import './moulin.css';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast} from 'react-toastify';
import styled from "styled-components";


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
  date_extraction:"",
  
};

const Producteur = () => {
    const [state,setState]=useState(initialState);
    const {product_id,date_extraction}=state;

  






 

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!product_id || !date_extraction ){
            toast.error("please provide value into each input field")
        }else{
          
                axios
                .post("http://localhost:5002/api/products/moulin",{
                  product_id,
                  date_extraction,
                 

                })
                .then(()=>{
                   setState({product_id:"",date_extraction:""});
                })
                .catch((err)=>toast.error(err.response.data));
                toast.success('product added successfully');
               
               
        }
    };

    const handleInputChange=(e)=>{
        const {name,value}= e.target;
        setState({...state, [name]:value})
    }




  return (
    <Container>
     
   
    <div style={{marginRight:"350px"}}>
        <form style={{
            margin:"auto",
            padding:"15px",
            maxwidth:"400px",
            alignContent:"center"
        }}
        onSubmit={handleSubmit}>

        <label htmlFor='product_id'>ID</label>
        <input
        type="text"
        id="product_id"
        name="product_id"
        placeholder="ID"
        value={product_id || ""}
        onChange={handleInputChange}

        />
        <label htmlFor='date_extraction'>date_extraction</label>
        <input
        type="date"
        id="date_extraction"
        name="date_extraction"
        placeholder="YYYY-MM-DD"
        value={date_extraction || ""}
        onChange={handleInputChange}
        
        />
       

        <input type="submit"    value="Save"/>
        <Link to="/client">
            <input type="button" value="Go Back" />
        </Link>
        
            
            
        </form>

    
    </div>
   
    </Container>
  )

}

export default Producteur