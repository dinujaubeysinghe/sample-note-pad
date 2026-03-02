import User from "../models/user.js";  

export async function getAllUsers(req, res) {

  try{
    const users = await User.find();
    res.status(200).json(users);

  }catch(error){
      console.error("Error in get all users",error);
      res.status(500).json({message: "Internal server error"})
  }
}; 

export async function getUserById(req, res) {
  try{
    const oneUser = await User.findById(req.params.id)

    if(!oneNote){
      return res.status(404).json({message: " User not found"})
    }
    res.status(201).json(oneUser)
    
  }catch(error){
     console.error("Error to get user",error);
      res.status(500).json({message: "Internal server error"})
  }
  
};

export async function createUser( req , res) {
    try{
        const{
            firstName ,
            lastName,
            email,
            phone,
            password,
            coachId,
            sportName,
        }= req.body
        const newUser = await User({
            firstName ,
            lastName,
            email,
            phone,
            password,
            coachId,
            sportName,
        })
        const savedUser = await newUser.save();
        res.status(201).json({message: "User registered successfully"})

    }catch(error){
        console.error("Error in create user",error)
    res.status(500).json({message:"Internal server error"})
    }
}