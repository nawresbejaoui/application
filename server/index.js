const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const mysql=require('mysql2')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken');
const { uuid } = require('uuidv4');

//hasshing password
const bcrypt = require('bcrypt');
const saltRound = 10; 



app.use(cors({
    origin:["http://localhost:3000"], 
    methods:["GET", "POST" ,"PUT","DELETE"],
    credentials: true
})); 
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    key:"userId", 
    secret: "subscribe", 
    resave: false, 
    saveUninitialized: false, 
    cookie:{
        expires: 60 * 60 * 24 
    }
}))


const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"rootroot",
    database:"supplychain"
})




app.use(bodyParser.json());




//Authentification

app.post('/register', (req, res)=>{

    let user_id=uuid();
    const username = req.body.username;
    
    const location = req.body.location;
    const URL = req.body.URL;
    const product_id = req.body.product_id;
    const role= req.body.role;
    const certifications = req.body.certifications;
    const n_lots = req.body.n_lots;
    const password = req.body.password;
   
   
    
    

    const insertQuery = "INSERT INTO users (user_id,username,location,URL,product_id,role,certifications,n_lots,password) VALUES (?,?,?,?,?,?,?,?,?)";
    const checkUniqUsername = "SELECT * FROM users where username=?"

    //checking if we have the entered username and email in database
    db.query(checkUniqUsername, username, (err, userres)=>{
        if(err){
            console.log(err)
        }
       
       
            //sending hashed password to the database.
            bcrypt.hash(password, saltRound, (err, hash)=>{
                if(err){
                    console.log(err)
                }

                db.query(insertQuery, [user_id,username,location,URL,product_id,role,certifications,n_lots,hash
                ], (err, result)=>{
                    if (err){
                        console.log(err)
                    }
                    res.send({message:"You successfully registred"})
            })

})
        
    })
   

    
   
   

})


const verifyJWT=(req,res,next)=>{
    const token=req.headers["x-access-token"]
    if(!token){
        res.sned("we need a token , give it to us next time!")
    }else{
        jwt.verify(token, "jwtSecret",(err,decoded)=>{
            if(err){
                res.json({auth:false,message:"you failed to authenticate "});
            }else{
                req.userId=decoded.user_id;
                next();
            }
        })
    }
}




app.get("/isUserAuth",verifyJWT,(req,res)=>{
    res.send("You are authenticated !")
})

app.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
   

    const selectQuery = "SELECT * FROM users WHERE username=? "

    db.query(selectQuery, username, (err, result)=>{
        if(err){
            res.send({err:err})
        }
        //check entered password by hashing one
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (error, response)=>{
                if(error){
                    console.log(error)
                }
                if(response){
                    const user_id=result[0].user_id
                    const token=jwt.sign({user_id},"jwtSecret",{
                        expiresIn:300,
                    })
                    req.session.user = result; 
                   res.json({auth:true,token: token ,result: result})
                 

                    
                }
                else{
                    res.json({auth:false,message:"Wrong Username/Password combination",});
                }
            })
        }else{
            res.json({auth:false,message:"No User Exist ",});
        }
    })
})

app.get('/login', (req, res)=>{
    if(req.session.user){
        res.send({logedIn:true, username:req.session.user[0].username})
    }else{
        res.send({logedIn:false})
    }
} )











//users

app.get('/api/users/get',(req,res)=>{
    const sqlGet="SELECT * FROM users";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    })
})



app.post('/api/users/post',(req,res)=>{
    
    const {username,password,location,URL,product_id,role,certifications,n_lots}=req.body;
    let user_id=uuid();
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
    const {date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration}=req.body;
    let product_id=uuid();
    const sqlInsert="INSERT INTO products (product_id,date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert,[product_id,date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration],(error,result)=>{
        if(error){
            console.log(error);
        }else
        console.log(result);
        res.send(result);
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

//producteur
app.post('/api/producteur',(req,res)=>{
    const {product_id,date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration}=req.body;

    const sqlInsert="INSERT INTO products (product_id,date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert,[product_id,date_production,lieu,date_extraction,date_control,technique_stockage,n_lots,date_expiration],(error,result)=>{
        if(error){
            console.log(error);
        }else
        console.log(result);
        res.send(result);
    })
})


// Moulin

app.put('/api/products/moulin/:product_id',(req,res)=>{
    let {product_id}=req.params;
    let {date_extraction}=req.body;
    let sqlUpdate= "UPDATE products SET date_extraction =? WHERE product_id=?";
    db.query(sqlUpdate,[date_extraction,product_id],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
        
    })
})

//Laboratoire de control

app.put('/api/products/labo/:product_id',(req,res)=>{
    let {product_id}=req.params;
    let {date_control}=req.body;
    let sqlUpdate= "UPDATE products SET date_control=? WHERE product_id=?";
    db.query(sqlUpdate,[date_control,product_id],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
        
    })
})


//unite de stockage
app.put('/api/products/stockage/:product_id',(req,res)=>{
    let {product_id}=req.params;
    let {technique_stockage}=req.body;
    let sqlUpdate= "UPDATE products SET technique_stockage =? WHERE product_id=?";
    db.query(sqlUpdate,[technique_stockage,product_id],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
        
    })
})


//Unite de mise en bouteilles

app.put('/api/products/miseBouteille/:product_id',(req,res)=>{
    let {product_id}=req.params;
    let {n_lots,date_expiration}=req.body;
    let sqlUpdate= "UPDATE products SET n_lots=? , date_expiration=? WHERE product_id=?";
    db.query(sqlUpdate,[n_lots,date_expiration,product_id],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
        
    })
})










// get ID 
app.get('/api/products/AllId',(req,res)=>{
    const sqlGet="SELECT product_id FROM products";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    })
})


//get Role
app.get('/api/products/AllRole',(req,res)=>{
    const sqlGet="SELECT role FROM products";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    })
})












app.get('/',(req,res)=>{
    res.send('Hello express')
})





app.listen(5002,()=>{console.log('server is running on port 5002')})
