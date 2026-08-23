const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport")
const ExpressError = require("../utils/ExpressError.js");
const { SaveRedirectUrl } = require('../middleware.js');
const Controller = require("../Controller/user.js")

//register user

router.route("/signup")
.get( (req, res) => {
  res.render('./user/register.ejs')

})
.post(wrapAsync(Controller.signupRoute))


//login route
router
  .route("/login")
  .get((req, res) => {
    res.render('./user/login.ejs')
  })
  .post( SaveRedirectUrl,
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  Controller.loginRoute);


router.get("/logout", Controller.logoutRoute)

module.exports = router;




