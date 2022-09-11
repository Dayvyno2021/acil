import UserModel from '../models/userModel.js';
import { generateToken } from '../config/generateToken.js';
// import expressAsyncHandler from 'express-async-handler';

//desc: register new user;
//route: post /api/user/register;
//access: public;
export const register = async (req, res) => {
  try {
    const { username, email, psw, refCode, phone } = req.body;

    const findRefCode = () => {     
      const usernameRef = username.substr(-3, 3);
      const randRef = Math.floor(Math.random() * 10000000000);
      const ref = `${usernameRef}${randRef}`;
      return ref;   
    }
    const referral = findRefCode();

    if (!username || !email || !psw || !phone) {
      res.status(400).json({
        message: 'All Fields expcept refCode are required'
      })
    } else {
      const existRefCode = await UserModel.findOne({ refCode: referral });
      const existEmail = await UserModel.findOne({ email });
      if (existRefCode) return res.status(400).json({ message: 'Could not register, try again' });
      if (existEmail) return res.status(400).json({ message: 'Username or Email already exists' });

      const newUser = await UserModel.create({
        name: username,
        email,
        password: psw,
        refCode: referral,
        phone,
      })

      if (newUser) {
        return res.json({
          id: newUser._id,
          username: newUser.name,
          refCode: newUser.refCode,
          email: newUser.email,
          phone: newUser.phone,
          isAdmin: newUser.isAdmin,
          createdAt: newUser.createdAt,
          token: generateToken(newUser._id)
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

//desc: register new user;
//route: post /api/user/login;
//access: public;

export const login = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userEm = await UserModel.findOne({ email });
    const userNm = await UserModel.findOne({ name: username });
    const user = userEm || userNm;
    if (user) {
      const auth = await user.matchPassword(password);
      if (auth) {
        return res.json({
          id: user._id,
          username: user.name || userNm.name,
          refCode: user.refCode || userNm.refCode,
          email: user.email || userNm.email,
          phone: user.phone || userNm.phone,
          isAdmin: user.isAdmin || userNm.isAdmin,
          token: generateToken(user._id) || generateToken(userNm._id),
          createdAt: user.createdAt || userNm.createdAt
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
//access //protected

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