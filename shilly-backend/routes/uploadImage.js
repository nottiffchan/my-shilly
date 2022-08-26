const router = require("express").Router();
const { UploadImage } = require("../controllers/uploadImage");

const parser = require("../middleware/cloudinary.config");

router.post("/image", parser.single("image"), UploadImage);

module.exports = router;