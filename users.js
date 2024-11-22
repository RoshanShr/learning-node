const { timeStamp } = require('console');
const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const app = express();

app.use(express.json())


mongoose.connect("mongodb://127.0.0.1:27017/learning")
.then(()=>{
    console.log("Database connected");

}).catch(err => console.error(err));

//? User section
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is mandatory"]
    },
    email:{
        type: String,
        required: [true, "email is mandatory"]
    },
    password:{
        type: String,
        required: [true, "password is mandatory"]
    }
}, {timeStamp:true})

const userModel = mongoose.model("users", userSchema);

//!User registration
app.post("/register",(req,res)=>{
    let user = req.body;

    
    userModel.create(user)
    .then((document)=>{
        res.send({data:document, message:"User created"})
    }).catch((err)=>{
        res.send({message: "Some error"})
    })
});

//! Create server using express
app.listen(8000,()=>{
    console.log("Server is running");
})