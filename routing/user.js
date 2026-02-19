const express=require('express');
const router=express.Router();

const User = require('../models/user.js');
const wrapAsync=require("../utils/wrapAsync.js")
const passport=require("passport")

const ExpressError=require("../utils/ExpressError.js");


//register user
router.get("/signup",(req,res)=>{
   res.render('./user/register.ejs')

})

router.post('/signup',wrapAsync(async(req,res)=>{
    const {username,password,email}=req.body.user;

 

 try {
    const newuser=new User({username,email}) 
    const registreduser=await User.register(newuser,password)
   
    req.flash('success',"welcom to wanderLust")
    res.redirect('/listings')
 }  catch(e){
       req.flash("error",e.message);
       
       res.redirect('/signup')

 }
    

}))

router.get('/login' ,(req,res)=>{
 res.render('./user/login.ejs')
})

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' , failureFlash: true}),
  function(req, res) {
    req.flash("success","Wlcome Back To WanderLust")
    res.redirect('/listings');
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




