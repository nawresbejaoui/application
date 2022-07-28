const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const cors=require('cors')
const mysql=require('mysql2')
const bcrypt=require('bcrypt');
const saltRounds=10;

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"rootroot",
    database:"supplychain"
})


app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

app.get('/api/users/get',(req,res)=>{
    const sqlGet="SELECT * FROM users";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    })
})



app.post('/api/users/post',(req,res)=>{
    const {user_id,username,password,location,URL,product_id,role,certifications,n_lots}=req.body;
    const sqlInsert="INSERT INTO users (user_id,username,password,location,URL,product_id,role,certifications,n_lots) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(sqlInsert,[user_id,username,password,location,URL,product_id,role,certifications,n_lots],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})

app.delete('/api/users/remove/:user_id',(req,res)=>{
    const {user_id}=req.params;
    const sqlRemove="DELETE FROM users WHERE user_id=?";
    db.query(sqlRemove,user_id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})






app.get('/api/users/get/:user_id',(req,res)=>{
    const {user_id}=req.params;

    const sqlGet="SELECT * FROM users where user_id=? ";
    db.query(sqlGet,user_id,(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})



app.put('/api/users/:user_id',(req,res)=>{
    const {user_id}=req.params;
   
    const{username,password,location,URL,product_id,role,certifications,n_lots}=req.body;

    const sqlUpdate="UPDATE users SET username=?,password=?,location=?,URL=?,product_id=?,role=?,certifications=?,n_lots=? WHERE user_id=? ";
    db.query(sqlUpdate,[username,password,location,URL,product_id,role,certifications,n_lots,user_id],(error,result)=>{
        if(error){
            console.log(error);
        }
        
        res.send(result);
    
    })
})






//products
app.get('/api/products/get',(req,res)=>{
    const sqlGet="SELECT * FROM products";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    })
})


app.delete('/api/products/remove/:product_id',(req,res)=>{
    const {product_id}=req.params;
    const sqlRemove="DELETE FROM products WHERE product_id=?";
    db.query(sqlRemove,product_id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})


app.post('/api/products/post',(req,res)=>{
    const {product_id,date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration}=req.body;
    const sqlInsert="INSERT INTO products (product_id,date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert,[product_id,date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})


app.post('/api/products/moulin',(req,res)=>{
    const {product_id,date_extraction}=req.body;
    const sqlInsert="INSERT INTO products (product_id,date_extraction) VALUES (?,?)";
    db.query(sqlInsert,[product_id,date_extraction],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})
app.post('/api/products/producteur',(req,res)=>{
    const {product_id,date_production,lieu}=req.body;
    const sqlInsert="INSERT INTO products (product_id,date_production,lieu) VALUES (?,?,?)";
    db.query(sqlInsert,[product_id,date_production,lieu],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})















app.put('/api/products/:product_id',(req,res)=>{
    const {product_id}=req.params;
    console.log(req.params.product_id);
    console.log(req.body);
   
    const{date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration}=req.body;

    const sqlUpdate="UPDATE products SET  date_production=?,lieu=?,date_extraction=?,date_control=?,technique_stockage=?,n_lots=?,date_expiration=? WHERE product_id=? ";
    db.query(sqlUpdate,[date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration,product_id],(error,result)=>{
        if(error){
            console.log(error);
        }else
        console.log(result);
        res.send(result);

    
    })
})
app.get('/api/products/get/:product_id',(req,res)=>{
    const {product_id}=req.params;

    const sqlGet="SELECT * FROM products where product_id=? ";
    db.query(sqlGet,product_id,(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})




// authentification








app.get('/',(req,res)=>{
    res.send('Hello express')
})





app.listen(5002,()=>{console.log('server is running on port 5002')})
