const ErrorResponse = require("../utils/errorResponse");

module.exports.UploadImage = async (req, res, next) => {
  try {
    if (req.file) {
      res.json({success: true, imgPath: req.file.path});
    } else {
      return next(new ErrorResponse("Image upload failed", 400));
    }
  } catch (error) {
    console.log(error)
    return next(new ErrorResponse("Image upload failed", 400));
  }
};