const Listing = require("../models/listing");

module.exports.indexRoute = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { listings: allListings });
};

module.exports.newListing = async (req, res) => {
    const listingData = req.body.listing;
    const newListing = new Listing(listingData);
    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.showRoute = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you want to show does not exist!");
        return res.redirect("/listings");
    }

    res.render("./listings/show.ejs", { listing });
};

module.exports.updateRouteForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you want to edit does not exist!");
        return res.redirect("/listings");
    }

    res.render("./listings/edit.ejs", { listing });
};

module.exports.updateRoute = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        {
            new: true,
            runValidators: true
        }
    );

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing Edited!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyRoute = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
