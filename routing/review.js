const express=require('express');

const router=express.Router({mergeParams:true});
const Listing = require('../models/listing');
const Review = require('../models/review.js');
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js")
const { listingSchema,reviewSchema } = require("../schemavalidation");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js")
const Controller=require("../Controller/review.js")

router.post('/',isLoggedIn,validateReview,wrapAsync(Controller.reviewPostRoute))

// Review edit route
router.get('/:reviewId/edit',isLoggedIn,isReviewAuthor,wrapAsync(Controller.editReviewForm));
router.put('/:reviewId',isLoggedIn,isReviewAuthor,validateReview,wrapAsync(Controller.updateReview));

// review delete route
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(Controller.destroyRoute));

module.exports=router;
