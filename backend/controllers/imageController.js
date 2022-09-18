import ImageModel from "../models/imageModel";
import ImagesService from "../service/image";
class ImageController {
  static singleImageUpload = async (req, res) => {
    if (req.body.images) {
      const imagesService = new ImagesService();
      req.body.images = imagesService.singleImageUpload(
        "image",
        req.body.images
      );
    }
    console.log(req.body.images);
    //assign the value
    const image = new ImageModel();
    image.pic = req.body.images;
    image.user = req.user && req.user._id;
    //save the user
    await image.save();

    res.status(200).send({
      status: 200,
      message: "Image Uploaded!",
    });
  };
}

export default ImageController;
