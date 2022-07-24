import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast} from 'react-toastify';

export default function UserList() {

  const[data,setData]=useState([]);
  const loadData=async ()=>{
      const response= await axios.get("http://localhost:5002/api/users/get");
      setData(response.data);
  };

  useEffect(()=>{
      loadData();
  },[] );

  const deleteUser=(user_id)=>{
    if(window.confirm("Are you sure you wanted to delete that user ?")){
        axios.delete(`http://localhost:5002/api/users/remove/${user_id}`);
        toast.success("user deleted successfully");
        setTimeout(()=>loadData(),500);
    }
}

  
  const columns = [
    { field: "user_id", headerName: "ID", width: 120 },
    {
      field: "username",
      headerName: "User",
      width: 180,
      
     
    },
    { field: "location", headerName: "Location", width: 140 },
    {
      field: "product_id",
      headerName: "Product_id",
      width: 160,
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
    },
   
    {
      field: "n_lots",
      headerName: "n_lots",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.user_id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={()=>deleteUser(params.row.user_id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        getRowId ={(row) => row.user_id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
}