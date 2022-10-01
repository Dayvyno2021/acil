import express from "express";
import multer from "multer";
import ImageController from "../controllers/imageController.js";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);// res.status(400).json({message: "Only jpeg, png and jpg are allowed"})
  }
};

export let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {fieldSize: 210000},
});

// router.post("/upload-image", upload.single("image"), ImageController.singleImageUpload);

// export default router;
