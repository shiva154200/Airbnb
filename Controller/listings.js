const Listing=require("../models/listing");

module.exports.indexRoute=async(req,res)=>{
    const allListings= await Listing.find({});
  res.render("./listings/index.ejs",{listings:allListings});
}

module.exports.newListing=async(req,res,next)=>{
   
 
    
    let listing=req.body.listing;
    let url=req.file.path;
    let filename=req.file.filename;
    const newlisting=new Listing(listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};
    await newlisting.save();
    req.flash("success","New Listing Created")
    res.redirect("/listings");
  
  
 
}

module.exports.showRoute=async(req,res)=>{
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

}

module.exports.updateRouteForm=async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);

    if(!listing){
        req.flash('error','Listing you want to edit does not exist!')
       return res.redirect("/listings")
    }
    
    res.render("./listings/edit.ejs",{listing});
}

module.exports.updateRoute=async(req,res)=>{
    let {id}=req.params;
   await Listing.findByIdAndUpdate(id,req.body.listing)
   req.flash('success',"Listing Edited!")
   res.redirect(`/listings/${id}`)
}


module.exports.destroyRoute=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id)
    req.flash('success',"Listing Deleted!")
    res.redirect("/listings")
    
};