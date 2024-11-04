import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    if(req.body.username === "" || req.body.email === "" || req.body.telepon === "" || req.body.password === "" || req.body.confirmPassword === "") return res.status(400).json({message: "Please fill in all the required fields"});
    if(req.body.password !== req.body.confirmPassword) return res.status(400).json({message: "Passwords do not match"});

    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(409).json({message: "Email already exists"});

    const telpExists = await User.findOne({telepon: req.body.telepon});
    if(telpExists) return res.status(409).json({message: "Telepon already exists"});

    const newUser = new User(req.body);
    const user =  await newUser.save();

    const response = {
      status: 201,
      message: "user created",
      data: user
    }

    res.status(201).json(response);
    
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(email === "" || password === "") return res.status(400).json({message: "Form tidak boleh kosong"});

    const user = await User.findOne({email: email, password: password});
    if(!user) return res.status(404).json({status: 400, message: "Email atau password salah!"});

    const response = {
      status: 200,
      message: "success login",
      data: user
    }

    res.status(200).json(response);
    
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
  }
}

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({status: 404, message: "User not found"});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

