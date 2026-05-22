const multer = require("multer");

const {
    CloudinaryStorage
} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

// Cloudinary Storage
const storage = new CloudinaryStorage({

    cloudinary,

    params: {

        folder: "lms_uploads",

        allowed_formats: [
            "jpg",
            "jpeg",
            "png"
        ]

    }

});

const upload = multer({
    storage
});

module.exports = upload;