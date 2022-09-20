import RefModel from "../models/referralModel.js";

//desc: get user downlines
//route: /api/referral/mydownline/:ref
//access: private

export const mydownlines = async (req, res) => {
  try {

    const downlines = await RefModel.find({ refCode: req.params.ref }).populate('referral', 'name email');
    if (downlines) {
      res.json(downlines)
    } else {
      res.status(400).json({message: "Could not find downlines"})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? "" : error;
    res.status(404).json({message: `Server Error===>${m}`})
  }
}