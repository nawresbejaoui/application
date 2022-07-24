import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { useState ,useEffect } from "react";
import axios from 'axios';
import { toast} from 'react-toastify';
import moment from 'moment';


export default function ProductList() {
  const[data,setData]=useState([]);
  const loadData=async ()=>{
      const response= await axios.get("http://localhost:5002/api/products/get");
      setData(response.data);
  };

  useEffect(()=>{
      loadData();
  },[] );

  const deleteProduct=(product_id)=>{
    if(window.confirm("Are you sure you wanted to delete that product ?")){
        axios.delete(`http://localhost:5002/api/products/remove/${product_id}`);
        toast.success("product deleted successfully");
        setTimeout(()=>loadData(),500);
    }
}

  const columns = [
    { field: "product_id", headerName: "ID", width: 120 },
    
    { field: "date_production", headerName: "Date_Prod", width: 160 ,  valueFormatter: params => 
    moment(params?.value).format('YYYY-MM-DD'),},
    {
      field: "lieu",
      headerName: "Lieu",
      width: 120,
    },
    {
      field: "technique_stockage",
      headerName: "Tech _Stockage",
      width: 170,
    },
    
    {
      field: "n_lots",
      headerName: "n_lots",
      width: 140,
    },
    {
      field: "date_expiration",
      headerName: "Date_expiration",
      width: 170,  valueFormatter: params => 
      moment(params?.value).format('YYYY-MM-DD'),
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.product_id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={()=>deleteProduct(params.row.product_id)}
           
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        getRowId ={(row) => row.product_id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
}
