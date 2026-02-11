const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const Review=require('./review.js')
const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
      image: {
        type: String,
        default: "https://hips.hearstapps.com/hmg-prod/images/edc100123egan-002-64ff8c50b2197.jpg?resize=980:*",
        set: (url) =>
            url === ""
                ? "https://hips.hearstapps.com/hmg-prod/images/edc100123egan-002-64ff8c50b2197.jpg?resize=980:*"
                : url
    }
    ,
    price: Number,
    location: { type: String, required: true },
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

listingSchema.post('findOneAndDelete',async(listing)=>{
    if(listing){
            await Review.deleteMany({_id:{$in:listing.reviews}})
    }

})



const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;