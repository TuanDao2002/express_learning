const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require('path')
const FOLDER_NAME = "file-upload";
const uploadImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: FOLDER_NAME,
        }
    );

    // crop the image to width 500 but still has ratio 1.0
    const url = cloudinary.url(`${FOLDER_NAME}/` + path.basename(result.secure_url), {width: 250, height: 250, crop: "fit"}) 
    fs.unlinkSync(req.files.image.tempFilePath);

    return res
        .status(StatusCodes.OK)
        .json({ image: { src: url } });
};

module.exports = uploadImage;
