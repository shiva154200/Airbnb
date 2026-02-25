const express=require('express');
const router=express.Router();

const User = require('../models/user.js');
const wrapAsync=require("../utils/wrapAsync.js")
const passport=require("passport")
const ExpressError=require("../utils/ExpressError.js");
const { SaveRedirectUrl } = require('../middleware.js');


//register user
router.get("/signup",(req,res)=>{
   res.render('./user/register.ejs')

})

router.post('/signup',wrapAsync(async(req,res)=>{

 

 try {
   const {username,password,email}=req.body;

    const newuser=new User({username,email}) 
    const registreduser=await User.register(newuser,password)
    
    req.login(registreduser,(err)=>{
      if(err) return next();
   req.flash('success',"welcom to wanderLust")
    res.redirect('/listings')
    })
   
  
 }  catch(e){
       req.flash("error",e.message);
       
       res.redirect('/signup')

 }
    

}))

router.get('/login' ,(req,res)=>{
 res.render('./user/login.ejs')
})

router.post('/login',SaveRedirectUrl, 
  passport.authenticate('local', { failureRedirect: '/login' , failureFlash: true}),
  function(req, res) {
    newurl= res.locals.redirectUrl||'/listings'
    req.flash("success","Welcome Back To WanderLust")
    res.redirect(newurl);
  });


  router.get("/logout",(req,res)=>{
   req.logout(err=>{
      if(err){
         next(err);
      }
      req.flash("success","you are logged out!");
        res.redirect('/listings');
   })
  })

module.exports=router;




