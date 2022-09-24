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
        message: 'All Fields except refCode are required'
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
        refBy: refCode.toLowerCase(),
        phone,
        // isAdmin: true
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
//route: /api/user/profile/:id
//access protected

export const profile = async (req, res) => {
  try {
    // const {id} = req.params
    const user = await UserModel.findById(req.params && req.params.id).select('-password -pics')
    if (user) {
      res.json(user);
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
//route: /api/user/imageform
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
        imgData.pic.data = fs.readFileSync(file.image.path);
        imgData.pic.contentType = file.image.type;
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

//@desc: Update user profile;
//@route: put /api/user/update;
//@access private;

export const updateUser = async (req, res) => {
  try {
    const { psw, phone } = req.body;
    const id = req.params && req.params.id
    const user = await UserModel.findById(id);
    if (user) {
      user.phone = phone || user.phone;
      if (psw) {
        user.password = psw;
      }
      await user.save();

      res.json({
        id: user && user._id,
        username: user && user.name,
        refCode: user && user.refCode,
        email: user && user.email,
        phone: user && user.phone,
        isAdmin: user && user.isAdmin,
        refBy: user && user.refBy,
        createdAt: user && user.createdAt,
        token: user && generateToken(user._id)
      })
    } else {
      res.status(400).json({message: "Could not find user"})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV==='production'? null: error
    res.status(404).json({message: `Server Down===> ${m}`})
  }
}

//@desc: get all investors
//@route: /api/user/allinvestors;
//access: protect, adminProtect;

export const getAllInvestors = async (req, res) => {
  try {
    const users = await UserModel.find({}).select('-password -pic');
    if (users) {
      res.json(users);
    } else {
      res.status(400).json({message: "Could not find users"})
    }
  } catch (error) {
    const m = process.env.NODE_ENV==='production'? null: error
    res.status(404).json({message: `Server Down===> ${m}`})
  }
}

//@desc: Admin makes a user an admin
//route: /api/user/make-user-an-admin/:id
//@access admin , protected

export const makeAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    // console.log(`STATUS: ${status}`)
    // console.log(`PARAMS: ${req.params && req.params.id}`)
    const id = req.params && req.params.id;
    const user = await UserModel.findById(id);
    if (user) {
      user.isAdmin = status;
      await user.save();
      res.json('Successful')
    } else {
      res.status(400).json({ message: 'Could not find user' });
    }

  } catch (error) {
    const m = process.env.NODE_ENV==='production'? null: error
    res.status(404).json({message: `Server Down===> ${m}`})
  }
}

//@desc: Admin deletes a user
//route: del /api/user/admin-deletes-user/:id
//@access admin , protected

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await UserModel.findByIdAndDelete(id);
    if (del) {
      res.json('Deleted Successfully');
    } else {
      res.status(400).json({message: "Could not delete user"})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV==='production'? null: error
    res.status(404).json({message: `Server Down===> ${m}`})
  }
}