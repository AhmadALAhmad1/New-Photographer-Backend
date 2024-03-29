const router = express.Router();
import express from "express";
import multer from "multer";
import {
    getAllPhotos,
    createPhoto,
    deletePhoto
} from "../controllers/galleryBetaController.js";

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploadMiddlewares = multer({
    storage,
});


router.post('/create', uploadMiddlewares.single("file"), createPhoto);
router.get('/get', getAllPhotos);
router.delete('/delete/:id', deletePhoto)
export default router;