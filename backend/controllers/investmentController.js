import InvestmentModel from "../models/investmentModel.js";

//desc: create an investment;
//route: /api/investment/placeorder
//access: private

export const placeorder = async (req, res) => {
  try {
    const { ID, pName, ROI, maturity, amount, packageType  } = req.body;

    // const grossPay = (pack) => {
    //   let calc = (pack.ROI)
    // }
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