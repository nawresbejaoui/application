
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";

import Dashboard from "./pages/Dashboard";

import LaboControl from "./pages/clients/laboControl/LaboControl";
import Moulin from "./pages/clients/moulin/Moulin";
import Producteur from "./pages/clients/producteur/Producteur";
import UniteMiseBouteille from "./pages/clients/uniteMiseBouteille/UniteMiseBouteille";
import UniteStockage from "./pages/clients/uniteStockage/UniteStockage";
import { ToastContainer } from "react-toastify";
import Unauthorized from './pages/Unauthorized';

import AuthProvider ,{AuthContext} from './context/AuthProvider';
import {useAuth} from './hooks/useAuth';
import {useContext} from 'react';




import Login from './pages/Login';
import Register from './pages/Register';




function App() {

  const user=useContext(AuthContext);
 console.log(user.role+"hello admin"); 

  return (
    <AuthProvider >
    <ToastContainer />
    <BrowserRouter>
   
      
      
     
              
            
                <Routes>
              
                  
                     {/* we want to protect these routes */}
                  


                  <Route path='/' element={<Dashboard />} >
                  <Route path='/' element={<Home />} />
                   <Route path='users' element={<UserList />} />
                  <Route path="user/:userId" element={<User  />} />
                  <Route path="newUser" element={<NewUser  />} />
                  <Route path="products" element={<ProductList/>} />
                  <Route path="product/:productId" element={<Product />} />
                  <Route path="newproduct" element={<NewProduct />} />
                  </Route>

                  
                  <Route path='/producteur' element={<Producteur />} />
                
                  <Route path='/moulin' element={<Moulin />} />
                 
                  <Route path='/labo' element={<LaboControl />} />
                  <Route path='/stockage' element={<UniteStockage />} />
                  <Route path='/mise_bouteille' element={<UniteMiseBouteille />} />



                    {/* public routes */}
                  
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/unauthorized' element={<Unauthorized />} />


                  
                 
                  
                 
                 
                
                </Routes>
                 
      

    
    </BrowserRouter>
    </AuthProvider>
  
  );
}

export default App;
