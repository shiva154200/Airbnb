const Listing=require("./models/listing")

const ExpressError=require("./utils/ExpressError");
const { listingSchema,reviewSchema} = require("./schemavalidation");
const Review=require("./models/review")

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create listing! ")
       return res.redirect("/login")
    }
    next();
}

module.exports.SaveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing =  await Listing .findById(id);
    if( !((listing.owner._id).equals(res.locals.userinfo._id))){
        req.flash("error","u dont permission to do this")
        return res.redirect(`/listings/${id}`)
    }

    next();
}

module.exports.validateListing=  (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};


 module.exports.validateReview=(req,res,next)=>{
    const {error }=reviewSchema.validate(req.body);
     if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }

    
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {reviewId,id}=req.params;
    let review =  await Review .findById(reviewId);
    if( !((review.author._id).equals(res.locals.userinfo._id))){
        req.flash("error","u don't have permission to do this")
        return res.redirect(`/listings/${id}`)
    }

    next();
}