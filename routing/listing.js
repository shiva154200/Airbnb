const express = require('express');

const router = express.Router();
const Listing = require('../models/listing');
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")

const Controller = require("../Controller/listings.js")
const { listingSchema, reviewSchema } = require("../schemavalidation");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js")
const { storage } = require("../cloudConfig.js")
const multer = require('multer')
const upload = multer({ storage })



router.route("/")
    .get(wrapAsync(Controller.indexRoute))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, 
    wrapAsync(Controller.newListing));


//new list create

router.get('/new', isLoggedIn, (req, res) => {
    res.render('./listings/new.ejs');

})

router.route("/:id")
    .get(wrapAsync(Controller.showRoute))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(Controller.updateRoute))
    .delete(isLoggedIn, isOwner, wrapAsync(Controller.destroyRoute))

// //update rout

router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(Controller.updateRouteForm))


module.exports = router;