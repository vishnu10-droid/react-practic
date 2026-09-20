import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const loginUser = async(req,res)=>{
  try{
    const {email,password} =req.body;

    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({
        success:false,
        message:"user not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if(!isPasswordCorrect){
      return res.status(401).json({
        success:false,
        message:"wrong password",
      });
    }
    res.status(200).json({
      success:true,
      message:"log in successful",
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
      },
    });
  }catch(error){
    res.status(500).json({
      success:false,
      message:"server error",
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // 3. Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6. Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};