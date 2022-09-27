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
    const referrer = await UserModel.findOne({ refCode: req.user && req.user.refBy });
    // const refPerson = await UserModel.findById(downline && downline._id)
    if (referrer) {
      const notify = {
        notice: "Hi, one of your downline(s) has created an order", user: referrer && referrer._id
      }
      referrer.notification.push(notify);
      const notifiedReferrer = await referrer.save();

      const newDownline = await RefModel.create({
        referral: notifiedReferrer && notifiedReferrer._id,
        refCode: notifiedReferrer && notifiedReferrer.refCode,
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
        isPaid: false
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

      const notify = {notice: `Hi ${req.user && req.user.name}, we have received your order, keep investing`, user: req.user && req.user._id}
      req.user && req.user.notification && req.user.notification.push(notify)
      await req.user && req.user.save();

      res.json(order)
    } else {
      res.status(400).json({message: 'Could not create order'})
    }
  } catch (error) {
    const m = process.env.NODE_ENV === "production" ? '' : error;
    res.status(404).json({message: `Server Error===>${m}`})
  }
}

//desc: get the a particular order
//route: /api/investment/order:id
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

//@desc: Fetch all the orders
//@route: /api/investment/allorders
//@access: protect, adminProtect
export const allOrders = async (req, res) => {
  try {

    const orders = await InvestmentModel.find({}).populate({path:'investor', select: 'name'});
    if (orders) {
      res.json(orders);
    } else {
      res.status(400).json({message: "Could not find orders"})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === "production" ? '' : error;
    res.status(404).json({message: `Server Error===>${m}`})
  }
}

//@desc: Delete an order
//@route: delete /api/investment/delete/:id
//@access: protect, adminProtect

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await InvestmentModel.findByIdAndDelete(id);
    if (product) {
      res.json('Successful');
    } else {
      res.status(400).json({message: "Could not delete investment"})
    }
  } catch (error) {
    const m = process.env.NODE_ENV === "production" ? '' : error;
    res.status(404).json({message: `Server Error===>${m}`})
  }
}

//@desc: Update investment as paid
//@route: put /api/investment/update-as-paid/:id
//@access: protect, adminProtect

export const updateOrderAsPaid = async (req, res) => {
  try {
    const {paid} = req.body
    const id = req.params.id;

    const order = await InvestmentModel.findById(id);
    if (order) {
      const user = await UserModel.findById(order.investor)
      if (user) {
        const referral = await RefModel.findOne({ refCode: user.refBy })
        if (referral) {
          referral.payOutDate = new Date( order && order.pack && order.pack.maturity * 24 * 60 * 60 * 1000 + Date.now());
          await referral.save();
        }
      }

      order.payment.confirmDate = Date.now();
      order.payment.paymentStatus = 'Confirmed'
      order.payment.isPaid = paid;
      order.payoutDate = new Date(order && order.pack && order.pack.maturity * 24 * 60 * 60 * 1000 + Date.now())
      await order.save();
      res.json(order)
    } else {
      res.status(400).json({message: 'Could not find investment'})
    }
  } catch (error) {
    const m = process.env.NODE_ENV === "production" ? '' : error;
    res.status(404).json({message: `Server Error===>${m}`})
  }
}

//@desc: Update investment as paidout
//@route: put /api/investment/paid-out/:id
//@access: protect, adminProtect

export const updateAsPaidOut = async (req, res) => {
  try {
    const {paidOut} = req.body
    const id = req.params.id;

    const order = await InvestmentModel.findById(id);
    if (order) {
      const user = await UserModel.findById(order.investor)
      if (user) {
        const referral = await RefModel.findOne({ refCode: user.refBy })
        if (referral) {
          referral.isPaidOut = true;
          await referral.save();
        }
      }

      order.isPaidOut = paidOut;
      await order.save();
      res.json(order)
    } else {
      res.status(400).json({message: 'Could not find investment'})
    }
  } catch (error) {
    const m = process.env.NODE_ENV === "production" ? '' : error;
    res.status(404).json({message: `Server Error===>${m}`})
  }
}