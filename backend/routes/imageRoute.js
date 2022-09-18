import express from "express";
import multer from "multer";
import ImageController from "../controllers/imageController";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg"); //Appending .jpg
  },
});
const fileFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    return callback(new Error("Only images are allowed"));
  }
  callback(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limit: {
    fieldSize: 1 * 1024 * 1024, //1 MB
  },
});
router.post(
  "/upload-image",
  uploadImage.single("upload"),
  ImageController.singleImageUpload
);
export default router;
