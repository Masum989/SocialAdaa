import bcrypt from 'bcrypt'; // it allows us to encrypt our password
import jwt from 'jsonwebtoken'; // it gives user a web token so they can use this for authorization
import User from "../models/User.js"


// //REGISTER USER

export const register = async(req,res)=>{

    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt(); // using this to encrypt the password
        const passwordHash = await bcrypt.hash(password, salt); // then it will save itin hash

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*1000),
            impressions: Math.floor(Math.random()*1000) // this will give some random value

        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);  // this is for sending that data coming from backend is correct 
    } catch (err) {  
        res.status(500).json({error: err.message});
        
    }
}

// //  LOGGING IN 

export const login = async (req,res)=>{
    try {
        const {email, password}= req.body;  // grab the email and password when user try to login 
        const user = await User.findOne({email:email});  // with mongoose to find that email
    
        if(!user) return res.status(400).json({msg:"User doen not exist"});  // if doesn't match then return a mesage

        const isMatch = await bcrypt.compare(password, user.password);  // to check for the login password
        if(!isMatch) return res.status(400).json({msg:"Invalid credential"});
    
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    
      delete user.password;
      res.status(200).json({token,user});
    } catch (error) {
        res.status(500).json({error: err.message});
    }
};


