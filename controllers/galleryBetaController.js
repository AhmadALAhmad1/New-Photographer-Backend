import Gallery from "../models/galleryBetaModel.js";
import cloudinary from "../utils/cloudinary.js";
import axios from 'axios';

export const createPhoto = async (req, res) => {
    try {
        const imageFile = req.file?.path;
        // Save image URL to database
        const newImage = new image({
            image: imageFile,
        });
        const savedImage = await newImage.save();

        res.status(201).json(savedImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getAllPhotos = async (req, res) => {
    try {
        console.log("hi am here")
        const photos = await Gallery.find().lean();
        const newPhotos = await Promise.all(
            photos.map(async (photo) => {
                const imageUrl = cloudinary.url(photo.image);
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const base64Image = Buffer.from(imageResponse.data).toString('base64');
                return {
                    _id: photo._id,
                    image: base64Image,
                };
            })
        );
        console.log(newPhotos)
        res.status(200).json(newPhotos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePhoto = async (req, res) => {
    const { id } = req.params
    try {
        const deletedPhoto = await Gallery.findByIdAndDelete(id);

        if (!deletedPhoto) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        res.json({ message: 'Photo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
