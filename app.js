const express = require('express');
const mongoose= require('mongoose');
const path = require('path');
const app = express();
const ejsMate=require('ejs-mate')
const methodOverride=require("method-override");
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,'public')))
const ExpressError=require("./utils/ExpressError.js")
const listing = require('./routing/listing.js');
const reviews=require('./routing/review.js');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{   
    console.log("Error connecting to MongoDB:", err);
});


const { listingSchema,reviewSchema } = require("./schemavalidation");

app.use('/listings',listing)

app.use('/listings/:id/reviews',reviews)


app.get('/',(req,res)=>{
    res.send("Welcome to Airbnb Clone");
});


app.use((req,res,next)=>{
    next(new ExpressError(404,'page not found'))
})

// error handling middlewear

app.use((err,req,res,next)=>{
    let {status=500,message="Internal Server Error"}=err;
    
    res.status(status).render("./listings/error.ejs",{message,status})
})



app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});