var express = require("express");
var app = express();
var jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
var mysalt = "secretkey";
var cors = require("cors"); 
const USER_SCHEMA= require("./User_SCHEMA");
const RESTA_SCHEMA=require("./Resta_Schema");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.listen(8080, (err) =>{
    if (err)
    {
        console.log(err);
    }
    console.log("Server started successfully");
});

const multerStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads");
    },
    filename: (req, file, cb)=>{
        const ext = file.mimetype.split("/")[1];
        cb(null, file.fieldname + Date.now() + `.${ext}`);
    },
});
const multerFilter = (req, file, cb)=>{
    if(
    file.mimetype.split("/")[1]==="pdf" ||
    file.mimetype.split("/")[1]==="jpeg" ||
    file.mimetype.split("/")[1]==="jpg" ||
    file.mimetype.split("/")[1]==="png"
    ){
        cb(null, true);
    }else{
        cb(new Error("File typpe not supported"),false)
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
}).single("myFile");

app.post("/upload", (req, res) =>{
    // var token = req.headers.authorization;
    // var decoded=jwt.verify(token, mysalt);
    upload(req, res, async (err)=>{
        if(err){console.log(err)}
        else{
            console.log("file uploaded succesfully");
        }
    })
});


var dbUrl = "mongodb+srv://ruemhonde:Tanaka%402014!@cluster0.n4cqmcl.mongodb.net/NewProducts";
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true },
).then(() =>{
    console.log("connected to dataBase");
}).catch((err) =>{
    console.log("err");
});

const userDetails = { 
    Username: "Student",
    Password:"password123",
    Email:"student@letsupgrade.com",
    Mobile:"123456789"
};

app.post("/signup", (req, res) =>{ 
    var username = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var password = req.body.password;

    res.status(200).send({msg:"data stored successfully"});
    res.status(200).send({msg:"An error has occured"});
});

app.post("/restsignup", (req, res) =>{ 
    var username = req.body.name;
    // var email = req.body.email;
    var password = req.body.password;


    res.status(200).send({msg:"data stored successfully"});
    res.status(200).send({msg:"An error has occured"});
});

// app.post("/login", (req, res) =>{
//     var username = req.body;
//     var email = req.body.email;
//     var password = req.body;
//     var mobile = req.body.mobile;

//     if(email ===req.body.username){
//         if(password===req.body.password){
//             res.send({msg:"logged in successfully"});
//         }else{
//             res.send({msg:"Credentials do not match"});          
//         };
//     };
//     if(username =="Student")
//     {
//         if(password=="password123")
//         {
//             res.status(200).send({token:"loggedin"})
//         }
//     }
// });
app.post("/login", async (req, res) =>{
    const {username, password} = req.body;
    console.log(username);
    const loginCredentials= {"username": "Student", "password": "password123"};
    const userexist = await USER_SCHEMA.findOne({"username":username});
    if(userexist)
    { console.log(userexist); if (userexist.password === password){
       
        var token =jwt.sign({"username":userexist.username, "password":userexist.password}, mysalt);
        res.status(200).send(token);
    }else{
        res.status(200).send({msg: "Invalid credentials"});
    }
        const getpassword = USER_SCHEMA.find({"username":username, "password":password})
        if(getpassword){
            
            var token =jwt.sign(getpassword, mysalt);
            res.status(200).send(token);
        }
    }
    
    if(username===loginCredentials.username)
    {
        if(password===loginCredentials.password)
        {
            var token =jwt.sign(userDetails, mysalt);
            res.status(200).send(token);
        }
    }
});


app.post("/restlogin", async (req, res) =>{
    const {username, password} = req.body;
    console.log(username);
    const loginCredentials= {"username": "Admin", "password": "Manager123"};
    const userexist = await USER_SCHEMA.findOne({"username":username});
    if(userexist)
    { console.log(userexist); if (userexist.password === password){
       
        var token =jwt.sign({"username":userexist.username, "password":userexist.password}, mysalt);
        res.status(200).send(token);
    }else{
        res.status(200).send({msg: "Invalid credentials"});
    }
        const getpassword = USER_SCHEMA.find({"username":username, "password":password})
        if(getpassword){
            
            var token =jwt.sign(getpassword, mysalt);
            res.status(200).send(token);
        }
    }
    
    if(username===loginCredentials.username)
    {
        if(password===loginCredentials.password)
        {
            var token =jwt.sign(userDetails, mysalt);
            res.status(200).send(token);
        }
    }
});


app.post("/addproduct", async (req, res)=>{
    const {Product, Quantity, Price, Description, Picture} = req.body;
    var token = req.headers.authorization;
    var decoded=jwt.verify(token, mysalt);
    
    // const Username = decoded.Username;
    const getIdval = await RESTA_SCHEMA.find({Product:Product});    
    var newProduct= {
        Product:Product,
        Quantity: Quantity,
        Price:Price,
        Description: Description,
        Picture: Picture
        };

    const product = new RESTA_SCHEMA(newProduct);
    const stocked = await product.save();
    if(stocked)
    {
        res.status(200).send({msg:"Product added successfully"});
        console.log("logged in successfully")
    }
    else{
        res.status(200).send({msg:"Error Occurred"});
        console.log("unsuccessfully")
    }
});