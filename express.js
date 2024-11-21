const express = require('express');
const app = express();


app.get("/products", (req,res)=>{
    console.log(req);
    res.send({message:'Hello'})

})


app.get("/users/:id",(req,res)=>{
    res.send({message:req.params.id})

});

app.listen(8000,()=>{
    console.log("Server is running");
})