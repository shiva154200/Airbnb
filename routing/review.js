const express=require('express');

const router=express.Router({mergeParams:true});
const Listing = require('../models/listing');
const Review = require('../models/review.js');
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const { listingSchema,reviewSchema } = require("../schemavalidation");

const validateReview=(req,res,next)=>{
    const {error }=reviewSchema.validate(req.body);
     if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }

    
}

router.post('/',validateReview,wrapAsync(async(req,res)=>{

    let listing=await Listing.findById(req.params.id);
    const newreview=new Review(req.body.review);
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    // console.log("new review send")
    res.redirect(`/listings/${req.params.id}`);

}))

//review delete route

router.delete('/:reviewId',wrapAsync(async(req,res)=>{
    const {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${req.params.id}`);


}));

module.exports=router;