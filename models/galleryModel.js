import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const gallerySchema = new Schema(
    {
        CatID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        image: {
            type: String,
            required: true
        },
    },

    {
        timestamps: true,
    }

);

const Gallery = model('Gallery', gallerySchema);
export default Gallery;