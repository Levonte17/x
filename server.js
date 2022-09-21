// REQUIRE DEPENDENCIES
const express = require('express'); //req express
const mongoose = require('mongoose'); //req mongoose
const methodOverride = require('method-override'); // req method-overrive
const Product = require('./models/product'); // req folder addy id

//INITIALIZE APP
const app = express(); 

//CONFIG .ENV
require('dotenv').config(); // req config
const PORT = process.env.PORT // connect dotenv port
const DATABASE_URI = process.env.DATABASE_URI; //connect mongoose data dotenv
const db = mongoose.connection; //connect mongoose dotenv

// CONNECT TO MONGOOSE
mongoose.connect(DATABASE_URI);
//MONGOOSE LISTENER
db.on('connected', () => console.log('connected to MONGODB')); //verify connection
db.on('error', (err)=> console.log('error'+ err.message));

// MOUNT MIDDLEWARE 
// PARSER MIDDLEWARE
app.use(express.urlencoded({extended: false})); //string or array only == false
app.use(methodOverride('_method')); //??

//HOME REDIRECT
app.get('/', (req, res) =>res.redirect('/product')); //redirect page

//SEED {product}
app.get('/product.seed', (req, res) => {    // get seed info
const data = require('./data.json');    // require data from seed.json

Product.deleteMany({}, (err, result) => {  // prevent repeat data on load
    Product.insertMany(data, (err, result) => { //new product after delete refresh
        res.redirect('/product');   // back to home 
        });
    });
});
//INDEX ROUTE
app.get('/product', (req, res) => {
Product.find({}, (err, product) => {
    res.render('index.ejs', { 
        'product': product
        });
   });
});

//NEW ROUTE
app.get('/product/new', (req, res) => {
res.render('new.ejs');
});

/*
//PUT
app.put('/products/:id/buy', (req, res) => {
    product.updateOne({_id: req.params.id}, {$inc: {'qty' : -1}},
    (err, product) => {
        res.redirect('/product')
    });
});
*/
//CREATE ROUTE                                 
app.post('/product', (req, res) => {              
    Product.create(req.body, (err, createdProduct) => {
        res.redirect('/product');
    });
});


//DELETE
app.delete('/product/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        res.redirect('/product');
    });
});

//UPDATE ROUTE
app.put('/product/:id', (req, res) => {
Product.findByIdAndUpdate(req.params.id, req.body, { 
    new: true
}, (err, previousProduct) => {
        res.redirect('/product/' + req.params.id);
    });
});

//EDIT

app.get('/product/:id/edit', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('edit.ejs', {Product});
    });
});


//SHOW ROUTE
app.get('/product/:id', (req, res) => {
    Product.findById(req.params.id, (err, Product) => {
res.render('show.ejs', {Product});
    });
});

//LISTEN 
app.listen(PORT, () =>{
console.log(`Listening on port${PORT}`);
});


















