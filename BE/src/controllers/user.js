import userModel from '../models/user.js'
import auth from '../common/auth.js'

const create = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.role || !req.body.mobile ) {
            return res.status(200).json({message:"Please fill in all the required fields."});
        }
      const existingUser = await userModel.findOne({ email: req.body.email });
  
      if (!existingUser) {
        const hashedPassword = await auth.hashPassword(req.body.password);
        let user = await userModel.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          mobile: req.body.mobile,
          role: req.body.role,
        });
        user.owner_id = user._id;
        const updateduser = await userModel.findByIdAndUpdate(user._id,user,{
            new:true
        });
  
        res.status(201).send({
          message: ((req.body.role == 'customer') ? "Employer" :"Employee") + " created successfully",
        });
      } else {
        res.status(202).send({
          message: `User with email ${req.body.email} already exists`,
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send({
        message: "Internal Server error",
        error: error.message,
      });
    }
  };
  

const login = async (req,res)=>{
    try {
    
        let user = await userModel.findOne({email:req.body.email})
        if(user){
            let hashCompare = await auth.hashCompare(req.body.password,user.password)
      
        if(hashCompare){
            let token = await auth.createToken({
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            status:user.status
          
            
            

            })

            let userData = await userModel.findOne({email:req.body.email},{_id:0,password:0,createdAt:0})
            res.status(200).send({
                message:"login Successfull",
                token,
                userData
            })
           
        }
        else{
            res.status(400).send({
                message:`Invaild Passsword`
            })
        }
    }
    else{
        res.status(400).send({
            message:`Account with ${req.body.email } does not exists!`
        })
    }

       
    } catch (error) {
        res.status(500).send({
            message:`Internal Server Error `,
            error:error.message 
        })
        
    }

}

const registerUser = async (req, res) => {
    const { name, email, mobile, add, status, role, desc, password } = req.body;

    try {
        if (!name || !email || !password ||!status || !add || !role || !mobile || !desc ) {
            return res.status(400).json({message:"Please fill in all the required fields."});
        }

        const hashedPassword = await auth.hashPassword(password);
        const prenumber=await userModel.findOne({ mobile:mobile });
        const preUser = await userModel.findOne({ email: email });

        if (preUser) {
          
            return res.status(400).send({message:` ${req.body.email }  is already present.`});
        }
        if(prenumber)
        {
            return res.status(400).send({message:` ${req.body.mobile} is already present.`});
        }
        let owner_id = req.headers.userId;
        const newUser = new userModel({
            name, status, add, role, email,  mobile,  desc, password: hashedPassword, owner_id
        });

        await newUser.save();

        res.status(201).json({message:"User Created Successfully", newUser});
        // console.log(newUser);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json("Internal Server Error");
    }
};

const getUsersForTask =  async (req, res) => {
    try {
        const users = await userModel.find({_id: {$ne: req.body.id}, role: 'user'}).select({_id: 1,name:1,email:1});
        res.status(200).json({users});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json("Internal Server Error");
    }
};

const getUserData = async (req, res) => {
    try {
        const userData = await userModel.find({owner_id: req.headers.userId});
        const totalUsers = await userModel.countDocuments({role:'user'});
        const activeUsers = await userModel.countDocuments({ status: 'Active' });
        const inactiveUsers = await userModel.countDocuments({ status: 'InActive' });
       

        res.status(200).json({userData,totalUsers,activeUsers,inactiveUsers});
     
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json("Internal Server Error");
    }
};

const getIndividualUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userIndividual = await userModel.findById(id);

        if (!userIndividual) {
            return res.status(404).json("User not found");
        }

        console.log(userIndividual);
        res.status(200).json(userIndividual);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json("Internal Server Error");
    }
};

const updateUserData =async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id);
        // const hashedPassword = await Auth.hashPassword(password);
        if(req.body.new_password && req.body.new_password != "") {
            req.body.password = await auth.hashPassword(req.body.new_password)
        }else {
            const userIndividual = await userModel.findById(id);
            console.log(userIndividual);
            req.body.password = userIndividual.password;
            req.body.owner_id = req.headers.userId;
        }
        console.log( req.body, req.headers.userId);
        const updateduser = await userModel.findByIdAndUpdate(id,req.body,{
            new:true
        });
       
        // console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json("User not found");
        }

        console.log(deletedUser);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json("Internal Server Error");
    }
};

export default{
    create,
    login,
    registerUser,
    getUsersForTask,
    getUserData,
    getIndividualUser,
    deleteUser,
    updateUserData
}



