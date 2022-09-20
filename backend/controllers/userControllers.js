import UserModel from '../models/userModel.js';
import { generateToken } from '../config/generateToken.js';
import fs from 'fs';
// import expressAsyncHandler from 'express-async-handler';

//desc: register new user;
//route: post /api/user/register;
//access: public;
export const register = async (req, res) => {
  try {
    const { username, email, psw, refCode, phone } = req.body;

    const findRefCode = () => {     
      const usernameRef = username.substr(-3, 3).toLowerCase();
      const randRef = Math.floor(Math.random() * 10000000000);
      const ref = `${usernameRef}${randRef}`;
      return ref;   
    }
    const referral = findRefCode();

    if (!username || !email || !psw) {
      res.status(400).json({
        message: 'All Fields expcept refCode are required'
      })
    } else {

      const refPerson = await UserModel.findOne({ refCode: refCode });
      if (refCode && !refPerson) return res.status(400).json({message: 'Referral does not exist'})

      const existRefCode = await UserModel.findOne({ refCode: referral });
      const existEmail = await UserModel.findOne({ email });
      const existUsername = await UserModel.findOne({name:username})
      if (existRefCode) return res.status(400).json({ message: 'Could not register, try again' });
      if (existEmail || existUsername) return res.status(400).json({ message: 'Username or Email already exists' });

      const newUser = await UserModel.create({
        name: username,
        email,
        password: psw,
        refCode: referral,
        refBy: refCode,
        phone,
      })

      if (newUser) {
        return res.json({
          id: newUser && newUser._id,
          username: newUser && newUser.name,
          refCode: newUser && newUser.refCode,
          email: newUser && newUser.email,
          phone: newUser && newUser.phone,
          isAdmin: newUser && newUser.isAdmin,
          refBy: newUser && newUser.refBy,
          createdAt: newUser && newUser.createdAt,
          token: newUser && generateToken(newUser._id)
        })
      } else {
        res.status(400).json({message: "Could not register new user"})
      }
    }
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===>${m}`
    })
  }
}

//desc: login new user;
//route: post /api/user/login;
//access: public;

export const login = async (req, res) => {
  try {
    const { user, password } = req.body;
    const userEm = await UserModel.findOne({ email:user });
    const userNm = await UserModel.findOne({ name: user });
    const userA = userEm || userNm;
    if (userA) {
      const auth = await userA.matchPassword(password);
      if (auth) {
        return res.json({
          id: userA && userA._id,
          username: userA && userA.name,
          refCode: userA && userA.refCode,
          email: userA && userA.email,
          phone: userA && userA.phone,
          isAdmin: userA && userA.isAdmin,
          refBy: userA && userA.refBy,
          token: userA && generateToken(userA._id),
          createdAt: userA && userA.createdAt
          // updatedAt: user.updatedAt
        })
      } 
      return res.status(400).json({message: 'Username or Email or password does not match'})
    } else {
      res.status(400).json({message: "User does not exist"})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===> ${m}`
    })
  }
}

//desc: get profile;
//route: /api/user/profile
//access protected

export const profile = async (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(400).json({message: 'Unauthorized user'})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===>${m}`
    })
  }
}

//desc: post image image
//route: /api/user/image
//access: private

export const profileImage = async (req, res) => {
  try {
    const file = req.files;
    // console.log(file)
    // res.json("we see")
    if (file && file.image && file.image.size > 210000) {
      res.status(400).json({message: "image must not be above 200kb"})
    } else {
      const imgData = await UserModel.findById(req.user._id);

      if (imgData) {
        imgData.pic.data = fs.readFileSync(file && file.image && file.image.path);
        imgData.pic.contentType = file && file.imag && file.image.type;
        await imgData.save();
        res.json("Successful");
        
      } else {
        res.status(400).json({message: "Could not locate user"})
      }
    } 
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===>${m}`
    })
  }
}


//@desc get img
//@route get /api/
//@access private

export const userImage = async(req, res)=>{
  try {
    const id  = req.params.id
    const profileImage = await UserModel.findById(id)
    if ((profileImage && profileImage.pic && profileImage.pic.data) !== null){
      res.set('Content-Type', profileImage.pic.contentType)
      res.send(profileImage.pic.data)
    } else{
      res.status(400).json({message: 'Could not find image'})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV==='production'? null: error
    res.status(404).json({message: `Server Down===> ${m}`})
  }
}

// @desc get downlines
// @route get /api/user/downlines
//@access private

export const downlines = async (req, res) => {
  try {
    const dline = await UserModel.find({ refCode: req.user && req.user.refCode });
    if (dline) {
      res.json(dline);
    } else {
      res.status(400).json({message: 'No downlines'})
    }
  } catch (error) {
        const m = process.env.NODE_ENV==='production'? null: error
    res.status(404).json({message: `Server Down===> ${m}`})
  }
}