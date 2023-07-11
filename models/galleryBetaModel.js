import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const gallerySchema = new Schema(
    {
        image: {
            type: String,
            // required: true
        },
    },
    {
        timestamps: true,
    }

);

const GalleryBeta = model('GalleryBeta', gallerySchema);
export default GalleryBeta;