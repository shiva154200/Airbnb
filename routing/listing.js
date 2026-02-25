const express=require('express');

const router=express.Router();
const Listing = require('../models/listing');
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")


const { listingSchema,reviewSchema } = require("../schemavalidation");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")

 

router.get('/',wrapAsync(async(req,res)=>{
    const allListings= await Listing.find({});
  res.render("./listings/index.ejs",{listings:allListings});
}));


//new list create

router.get('/new',isLoggedIn,(req,res)=>{
    res.render('./listings/new.ejs');

})

router.post('/',isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
   
 
    let listing=req.body.listing;
    
    const newlisting=new Listing(listing);
    newlisting.owner=req.user._id;
    await newlisting.save();
    req.flash("success","New Listing Created")
    res.redirect("/listings");
  
  
 
}))

//show route
router.get('/:id',wrapAsync(async(req,res)=>{
  const {id}=req.params;
  const listing=await  Listing.findById(id)
  .populate(
    {path:"reviews",
        populate:{path:"author"}})
  .populate("owner");
  if(!listing){

    
       req.flash('error','Listing you want to show does not exist!')
       return res.redirect("/listings")
    }
     
  res.render("./listings/show.ejs",{listing});

}))

//update rout

router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);

    if(!listing){
        req.flash('error','Listing you want to edit does not exist!')
       return res.redirect("/listings")
    }
    
    res.render("./listings/edit.ejs",{listing});
}))


router.put('/:id',isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
   await Listing.findByIdAndUpdate(id,req.body.listing)
   req.flash('success',"Listing Edited!")
   res.redirect(`/listings/${id}`)
}))

//delete route

router.delete('/:id',isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id)
    req.flash('success',"Listing Deleted!")
    res.redirect("/listings")
    
}))


module.exports=router;