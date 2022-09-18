import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true, unique: true },
    email:{type:String, required: true, unique: true},
    refCode: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    phone: {type:String},
    notification: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    refBy: { type: String },
    pic:{data: Buffer, contentType: String},
    pic2: {
      type: "String",
      required: false,
      default:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
    },
  },
  { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;