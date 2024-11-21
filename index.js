// Importing the http module
const http = require("http");
const fs = require('fs');
const url = require('url');
// Creating server 
const server = http.createServer((req, res) => {
    let parsedURL = url.parse(req.url, true);

    let products = fs.readFileSync("./products.json", "utf-8");
    if (parsedURL.pathname === "/products" && parsedURL.query.id == undefined && req.method === "GET") {
        res.end(products);
    } else if (parsedURL.pathname === "/products" && parsedURL.query.id != undefined && req.method === "GET") {

        let products_array = JSON.parse(products);
        let product = products_array.find((product) => {
            return product.id == parsedURL.query.id;
        })

        if (product != undefined) {
            res.end(JSON.stringify(product));
        } else {
            res.end(JSON.stringify({
                "message": "product not found"
            }));
        }

    } else if (parsedURL.pathname === "/products" && parsedURL.query.id != undefined && req.method === "DELETE") {
        let products_array = JSON.parse(products);
        let index = products_array.findIndex((product) => {
            return product.id == parsedURL.query.id;
        })

        products_array.splice(index,1);

        fs.writeFile("./products.json", JSON.stringify(products_array), (err)=>{
            if(err==null){
                res.end(JSON.stringify({"message": "product deleted"}))
            }else{
                res.end("Something went wrong");
            }
        })
    } else {
        res.end("Invalid request method");
    }
})

// Server listening to port 3000
server.listen((3000), () => {
    console.log("Server is Running");
})