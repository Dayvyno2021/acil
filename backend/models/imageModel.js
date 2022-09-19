import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    pic: {
      type: "String",
      required: true,
      default:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const ImageModel = mongoose.model("ImageModel", imageSchema);

export default ImageModel;
