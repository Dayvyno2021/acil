import mongoose from 'mongoose';

const packageSchema = mongoose.Schema({
  addedBy:{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
  packageType: { type: String, required: true, unique: true },
  amount: { type: Number, required: true, unique: true },
  selected: { type: Boolean, default: false, required: true }
  
}, {
  timestamps: true
})

const packageModel = mongoose.model('packageModel', packageSchema);
export default packageModel;