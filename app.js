if(process.env.NODE_ENV!="production")
{require('dotenv').config() ;}
// console.log(process.env.mysecrete)

const express = require('express');
const mongoose= require('mongoose');
const path = require('path');
const app = express();
const ejsMate=require('ejs-mate')
const methodOverride=require("method-override");
const session=require("express-session")
const flash=require("connect-flash")


const ExpressError=require("./utils/ExpressError.js")
const listingRouter = require('./routing/listing.js');
const reviewRouter=require('./routing/review.js');
const userRouter=require('./routing/user.js');




app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,'public')))


async function main(){
    await mongoose.connect(process.env.MONGO_URI);
}

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{   
    console.log("Error connecting to MongoDB:", err);
});

const { listingSchema,reviewSchema } = require("./schemavalidation");


app.set("trust proxy", 1);

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
};
const passport=require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User=require("./models/user.js")

app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.userinfo=req.user;
    next();
})
app.use('/',userRouter)
app.use('/listings',listingRouter)
app.use('/listings/:id/reviews',reviewRouter)

app.get('/',async (req,res,next)=>{
    try {
        const featuredListings = await mongoose.model('Listing').find({}).limit(6);
        res.render('./home.ejs',{featuredListings});
    } catch(err) {
        next(err);
    }
});

app.use((req,res,next)=>{
    next(new ExpressError(404,'page not found'))
})

// error handling middlewear

app.use((err,req,res,next)=>{
    let {status=500,message="Internal Server Error"}=err;
    res.status(status).render("./listings/error.ejs",{message,status})
})



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});