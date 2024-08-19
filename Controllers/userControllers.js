const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async(req,res) =>{

    try{
        const { FirstName,LastName,Email,Mobile,Password,Role} = req.body;

        if(! FirstName || ! LastName || !Email || !Mobile || !Password || !Role ){
             res.status(500).send({message : "All fields required..!"})
       }

       const verifyEmail = await userModel.findOne({Email : Email})

      if(verifyEmail){
          res.status(500).send({message : "User already exist..!"})
      }else{
       
        const NO_OF_ROUNDS = 10;
        const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
        const hashedPassword = await bcrypt.hash(Password,salt)
    
        const newUser =  new userModel({
            
            FirstName : FirstName,
            LastName : LastName,
            Email : Email,
            Mobile : Mobile,
            Password : hashedPassword,
            Role : Role
           })

        await newUser.save();

        res.status(200).send(newUser)

      }

        
     }catch(err){
        res.status(500).send({message : err.message})
    }

    
}


const Login = async(req,res) =>{

    try{
        const { Email,Password} = req.body;

        if( !Email || !Password ){
             res.status(500).send({message : "All fields required..!"})
       }

       const findUser = await userModel.findOne({Email : Email})

      if(!findUser){
          res.status(500).send({message : "UnAuthorized..!"})
      }else{
       
        const checkpassword = await bcrypt.compare(Password,findUser.Password)

        if(!checkpassword){
            res.status(500).send({message : "The Invaild User credentials"})
        }
        else{
             const token = await jwt.sign({id:findUser._id},process.env.SECRET_KEY)
             res.status(200).send({
                message : "User Logined Successfully",
                token,
                Role :findUser.Role,
                Name : findUser.FirstName
             })
        }

      }

 }catch(err){
        res.status(500).send({message : err.message})
    }

}

const GetAllUser = async (req, res) => {
    try {
      const users = await userModel.find({}); 
  
      if (users.length > 0) {  
        res.status(200).send(users);
      } else {
        res.status(404).send({ message: "Users not found" });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  



module.exports = {Register,Login,GetAllUser}