const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// cloudinary 
const photosUploader = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder:'file-upload'
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath)
  return res
    .status(StatusCodes.OK)
    .json({
      image: result.secure_url
    })
};

const videoUploader = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.video.tempFilePath,
    {
      resource_type:'video',
      public_id:'videos-stream',
      use_filename: true,
      folder: "videos-stream",
    }
  );
  fs.unlinkSync(req.files.video.tempFilePath);
  return res
    .status(StatusCodes.OK)
    .json({
      videos:result.secure_url
    })
};

// const videoUploader = async (req, res) => {
//   if (!req.files) {
//     throw new CustomError.BadRequestError('No file uploaded');
//   }
//   console.log(req.files);
//   const videoType = req.files.video;
//   const extensionName = path.extname(videoType.name);
//   const allowedExtension = ['.mp4'];;
//   if (!allowedExtension.includes(extensionName)) {
//     throw new CustomError.BadRequestError('Invalid video');
//   }
//   const imagePath = path.join(__dirname, '../public/video/' + `${videoType.name}`)
//   await videoType.mv(imagePath);

//   return res
//     .status(StatusCodes.OK)
//     .json({
//       videos: videoType.name
//     });
// };

// local storage
// const photosUploader = async (req, res) => {
//   if (!req.files) {
//     throw new CustomError.BadRequestError('No file uploaded');
//   }

//   const sung = req.files.image;
//   const extensionName = path.extname(sung.name);
//   const allowedExtension = ['.png', '.jpg', '.jpeg'];
//   if (!allowedExtension.includes(extensionName)) {
//     throw new CustomError.BadRequestError('Invalid image');
//   }

//   const maxSize = 1024 * 1024;
//   if (sung.size > maxSize) {
//     throw new CustomError.BadRequestError('Please upload image smaller than 1MB')
//   }

//   const imagePath = path.join(__dirname, '../public/images/' + `${sung.name}`)
//   await sung.mv(imagePath);

//   return res
//     .status(StatusCodes.OK)
//     .json({
//       image: sung.name
//     })
// };

module.exports = {
  photosUploader,
  videoUploader,
}