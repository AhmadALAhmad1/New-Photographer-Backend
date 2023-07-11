import galleryModel from '../models/galleryModel.js'

class Controller {

  // Create a new product
  async createPhoto(req, res) {
    try {
      const { CatID } = req.body;
      const photo = new galleryModel({
        CatID,
        image: req.file.path,

      });
      await photo.save();
      res.status(201).json(photo);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  };


  async getAllPhotos(req, res) {
    try {

      const allItems = await galleryModel.find();
      const imageData = allItems.map(item => {
        return {
          _id: item._id,
          category: item.CatID,
          image: `${req.protocol}://${req.get('host')}/${item.image}`
        }
      });
      return res.status(200).json({
        status: 200,
        success: true,
        data: imageData
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message
      })
    }
  };

  async deletePhoto(req, res) {
    const { id } = req.params
    try {
        const deletedImage = await galleryModel.findByIdAndDelete(id);

        if (!deletedImage) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: `image with id=${id} doesn't exist`
            })
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "image deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


}

const controller = new Controller()
export default controller;