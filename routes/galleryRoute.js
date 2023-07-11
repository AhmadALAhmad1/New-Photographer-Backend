const router = express.Router();
import express from "express";
import multer from "multer";
import controller from '../controllers/galleryController.js';


const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadMiddlewares = multer({
  storage,
});

router.post('/photo/create', uploadMiddlewares.single("image"), controller.createPhoto);
router.get('/get',  controller.getAllPhotos);
router.delete('/delete/:id', controller.deletePhoto)
export default router;