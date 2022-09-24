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
  }, {
  timestamps: true,
}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;