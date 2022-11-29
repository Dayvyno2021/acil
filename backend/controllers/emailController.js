import nodemailer from "nodemailer";

//desc: send Mail
//route: post /api/email/send
//access: public

export const sendMail = async(req, res)=>{
  try {
    const {
      firstName,
      lastName,
      phone,
      email, 
      message
    } = req.body;

    // let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    })

    let info = await transporter.sendMail({
      from: "Potential ACIL client",
      to: 'info@domain.com',
      subject: 'Enquiry on ACIL product',
      html: 
      `
        <p>Sender\'s First Name:${firstName}</p>
        <p>Sender\'s Last Name:${lastName}</p>
        <p>Sender\'s mobile: ${phone}</p>
        <p>Sender\'s Email: ${email}</p>
        <p>Message: ${message}</p>
     `
    })

    let customer = await transporter.sendMail({
      from: "Agro Capital Investment Limited",
      to: email,
      subject: 'Email Receipt (No reply message)',
      html: 
      `
        <p>
          Thank you for contacting ACIL, we would look into your enquiries and reply shortly
        </p>
     `
    })   
    


    return res.json({status: `Message sent`, messageId: info && info.messageId})

  } catch (error) {
    const e = process.env.NODE_ENV==='production'? null: error;
    res.status(404).json({
      message: `Server Error===>${e}`
    })
  }
}