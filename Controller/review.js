const Review=require("../models/review");
const Listing=require("../models/listing")

module.exports.reviewPostRoute=async(req,res)=>{

    let listing=await Listing.findById(req.params.id);
    const newreview=new Review(req.body.review);
    listing.reviews.push(newreview);
    newreview.author=req.user._id;
    await newreview.save();
    await listing.save();
    req.flash('success',"New Review Created")
    res.redirect(`/listings/${req.params.id}`);

};

module.exports.destroyRoute=async(req,res)=>{
    const {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success',"Review Deleted")
    res.redirect(`/listings/${req.params.id}`);


};