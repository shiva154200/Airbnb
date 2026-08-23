const User =require("../models/user");

module.exports.signupRoute=async(req,res)=>{

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
    

};

module.exports.loginRoute=function(req, res) {
    newurl= res.locals.redirectUrl||'/listings'
    req.flash("success","Welcome Back To WanderLust")
    res.redirect(newurl);
  };

module.exports.logoutRoute=(req,res)=>{
   req.logout(err=>{
      if(err){
         next(err);
      }
      req.flash("success","you are logged out!");
        res.redirect('/listings');
   })
  };