
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Dashboard from "./pages/Dashboard";
import Client from "./pages/clients/client/Client";
import LaboControl from "./pages/clients/laboControl/LaboControl";
import Moulin from "./pages/clients/moulin/Moulin";
import Producteur from "./pages/clients/producteur/Producteur";
import UniteMiseBouteille from "./pages/clients/uniteMiseBouteille/UniteMiseBouteille";
import UniteStockage from "./pages/clients/uniteStockage/UniteStockage";
import { ToastContainer } from "react-toastify";



function App() {
  return (
    <>
    <ToastContainer />
    <Router>
      
      
     
                
            
                <Routes>
                  

                  <Route path='/' element={<Dashboard />} >
                  <Route path='home' element={<Home />} />
                  
                  
                  <Route path='users' element={<UserList />} />
                  <Route path="user/:userId" element={<User  />} />
                  <Route path="newUser" element={<NewUser  />} />
                  <Route path="products" element={<ProductList/>} />
                  <Route path="product/:productId" element={<Product />} />
                  <Route path="newproduct" element={<NewProduct />} />
                  </Route>

                  <Route path='/client' element={<Client />} />
                  <Route path='/producteur' element={<Producteur />} />
                
                  <Route path='/moulin' element={<Moulin />} />
                 
                  <Route path='/labo' element={<LaboControl />} />
                  <Route path='/stockage' element={<UniteStockage />} />
                  <Route path='/mise_bouteille' element={<UniteMiseBouteille />} />
                  
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                 
                 
                </Routes>
                 
      

    </Router>
    </>
  );
}

export default App;
