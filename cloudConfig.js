const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRETE
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "WanderLustDev",
        allowed_formats: ["png", "jpeg", "jpg"]
    }
});

module.exports = {
    cloudinary,
    storage
};
