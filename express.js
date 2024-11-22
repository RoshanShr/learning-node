const { timeStamp } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const app = express();


//! Middleware to read request data for put and post and convert it to js object
app.use(express.json())

// database connection
mongoose.connect("mongodb://127.0.0.1:27017/learning")
.then(()=>{
    console.log("Database connected");

}).catch(err => console.error(err));

//!schema for products
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "Name is required"]
    },
    price:{
        type:Number,
        required: [true, "Product is required"],
        min: 1

    },
    quantity:{
        type:Number,
        required: [true, "quantity is required"],

    },
    category:{
        type:String,
        enum:["Clothing", "Electronics", "Household"],
        required: [true, "quantity is required"],

    }
},{timeStamp:true})

//create models
const productModel = mongoose.model("phone", productSchema);


//!get data in express
app.get("/products", (req,res)=>{
    productModel.find()
    .then((products)=>{
        res.send(products)
    }).catch(()=>{
        console.log(err);
        res.send({message: "Some error"})
    });
})


//!Get data in express with specific id
app.get("/products/:id",(req,res)=>{
    productModel.findOne({_id:req.params.id})
    .then((single_product)=>{
        res.send(single_product)
    }).catch(()=>{
        console.log(err);
        res.send({message: "Some error"})
    });

});


//!Post or insert data in express
app.post("/products",(req,res)=>{
    let prodcut = req.body;
    productModel.create(prodcut)
    .then((document)=>{
        res.send({data:document, message:"Product created"})
    }).catch((err)=>{
        console.log(err);
        res.send({message: "Some error"})
    })
});

//!Update data in express
app.put("/products/:id",(req,res)=>{
   let product = req.body;
    productModel.updateOne({_id:req.params.id}, product)
    .then((single_product)=>{
        res.send({message: "Product updated"})
    }).catch(()=>{
        res.send({message: "Some error"})
    });
});


//!Delete specific data in express
app.delete("/products/:id",(req,res)=>{
    productModel.deleteOne({_id:req.params.id})
    .then((single_product)=>{
        res.send({message: "Successfully deleted"})
    }).catch(()=>{
        res.send({message: "Some error"})
    });
});


//!Delete all data in express

app.delete("/products",(req,res)=>{
    productModel.deleteMany()
    .then(()=>{
        res.send({message: "Successfully deleted all"})
    }).catch(()=>{
        res.send({message: "Some error"})
    });
});


//! Create server using express
app.listen(8000,()=>{
    console.log("Server is running");
})