import RefModel from "../models/referralModel.js";

//desc: get user downlines
//route: /api/referral/mydownline/:ref
//access: private

export const mydownlines = async (req, res) => {
  try {

    const downlines = await RefModel.find({ refCode: req.params.ref })
      .populate('referral', 'name email')
      .sort({createdAt: -1});
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

//desc: get all downlines
//route: GET /api/referral/all-downlines
//access: protect, adminProtect;

export const allReferrals = async (req, res) => {
  try {
    const referrals = await RefModel.find({})
      .populate('referral', 'name email phone')
      .sort({createdAt:-1});
    if (referrals) {
      res.json(referrals);
    } else {
      res.status(400).json({message: "Could not find referrals"})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({message: `Server error===>${m}`})
  }
}

//desc: Delete a downline
//route: delete /api/referral/delete-referral/:id
//access: protect, adminProtect;

export const deleteReferral = async (req, res) => {
  try {
    const id = req.params.id;
    const ref = await RefModel.findByIdAndDelete(id);
    if (ref) {
      res.json("Deleted");
    } else {
      res.status(400).json({message: "Could not delete referral"})
    }
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({message: `Server error===>${m}`})
  }
}

//desc: Update
//route: PUT /api/referral/update-to-paidout/:id
//access: protect, adminProtect;

export const updateReferral = async (req, res) => {
  try {
    const { paidOut } = req.body;
    const id = req.params.id;
    const ref = await RefModel.findById(id);
    if (ref) {
      ref.isPaidOut = paidOut;
      await ref.save();
      res.json(ref);
    } else {
      res.status(400).json({message: "Could not update referral"})
    }
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({message: `Server error===>${m}`})
  }
}

//@desc: Fetch a single referral;
//@routr: GET /api/referral/single/:id
//@access: protect, adminProtect;

export const singlePayout = async (req, res) => {
  try {
    const id = req.params.id;
    const ref = await RefModel.findById(id).populate('referral', 'name email phone');
    if (ref) {
      res.json(ref);
    } else {
      res.status(400).json({message: "Could not find referrer"})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({message: `Server error===>${m}`})
  }
}