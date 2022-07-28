import React from 'react'

//import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";


import {Outlet}  from "react-router-dom";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import Home from "../pages/home/Home";

const Dashboard = () => {
  return (
    <>
    <Topbar />
   
    <div className="container">
       
       <Sidebar />
      
      
       <Outlet></Outlet>
   
    </div>
    
   </>
  )
}

export default Dashboard