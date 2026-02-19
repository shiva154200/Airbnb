const express=require('express');

const router=express.Router();
const Listing = require('../models/listing');
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'/views'));
// app.use(express.static(path.join(__dirname,'public')))

const { listingSchema,reviewSchema } = require("../schemavalidation");
const {isLoggedIn}=require("../middleware.js")

  const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

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
    await newlisting.save();
    req.flash("success","New Listing Created")
    res.redirect("/listings");
  
  
 
}))

//show route
router.get('/:id',wrapAsync(async(req,res)=>{
  const {id}=req.params;
  const listing=await  Listing.findById(id).populate('reviews');
  if(!listing){
       req.flash('error','Listing you want to show does not exist!')
       return res.redirect("/listings")
    }
  res.render("./listings/show.ejs",{listing});

}))

//update rout

router.get('/:id/edit',isLoggedIn,wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash('error','Listing you want to edit does not exist!')
       return res.redirect("/listings")
    }
    
    res.render("./listings/edit.ejs",{listing});
}))


router.put('/:id',validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    
   await Listing.findByIdAndUpdate(id,req.body.listing)
   req.flash('success',"Listing Edited!")
   res.redirect(`/listings/${id}`)
}))

//delete route

router.delete('/:id',isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id)
    req.flash('success',"Listing Deleted!")
    res.redirect("/listings")
    
}))


module.exports=router;