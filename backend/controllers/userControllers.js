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

    if (!username || !email || !psw) {
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
          id: userA._id,
          username: userA.name,
          refCode: userA.refCode,
          email: userA.email,
          phone: userA.phone,
          isAdmin: userA.isAdmin,
          token: generateToken(userA._id),
          createdAt: userA.createdAt
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