import InvestmentModel from "../models/investmentModel.js";
import RefModel from "../models/referralModel.js";
import UserModel from "../models/userModel.js";

//desc: create an investment;
//route: /api/investment/placeorder
//access: private

export const placeorder = async (req, res) => {
  try {
    // const { ID, pName, ROI, maturity, amount, packageType, paymentType, reference }
    //   = req.body;
    const {
      pack:{ID, pName, ROI, maturity, amount, packageType,},
      paymentType,
      reference: { reference, trans, status, message, transaction },
    }
      = req.body;
    const downline = await UserModel.findOne({ refBy: req.user && req.user.refBy });
    if (downline) {
      const newDownline = await RefModel.create({
        referral: req.user._id,
        refCode: req.user && req.user.refBy,
        pack: {
          productID: ID,
          name: pName,
          ROI: ROI,
          maturity: maturity,
          packageType: packageType,
          amount: parseInt(amount)
        },
        refPayout: 10*(parseInt(amount)/100) //Downline gets 10% of the investment
      })
    }

    const order = await InvestmentModel.create({
      investor: req.user && req.user._id,
      pack: {
        productID: ID,
        name: pName,
        ROI: ROI,
        maturity: maturity,
        packageType: packageType,
        amount: parseInt(amount)
      },
      payout: (ROI + 100) * (parseInt(amount) / 100),
      paymentType,
      payment:{
        paymentStatus: 'Pending',
        paymentDate: new Date(Date.now()),
      },
      paystack: { 
        reference, 
        trans, 
        status, 
        message, 
        transaction 
      }
    })

    if (order) {
      res.json(order)
    } else {
      res.status(400).json({message: 'Could not create order'})
    }
  } catch (error) {
    const m = process.env.NODE_ENV === "production" ? '' : error;
    res.status(404).json({message: `Server Error===>${m}`})
  }
}

//desc: get the recent order
//route: /api/investment/placeorder:id
//route: private

export const order = async (req, res) => {
  try {
    const newOrder = await InvestmentModel.findById(req.params.id);
    if (newOrder) {
      res.json(newOrder)
    } else {
      res.status(400).json({message: "Could not fetch the order"})
    }
  } catch (error) {
    const m = process.env.NODE_ENV === "production" ? '' : error;
    res.status(404).json({message: `Server Error===>${m}`})
  }
}

//desc: Find all the orders linked to an individual
//route: /api/investment/myorders
//route: private

export const singleOrder = async (req, res) => {
  try {
    const orders = await InvestmentModel.find({ investor: req.user._id });
    if (orders) {
      res.json(orders);
    } else {
      res.status(400).json({message: 'Could not find orders'})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === "production" ? '' : error;
    res.status(404).json({message: `Server Error===>${m}`})
  }
}