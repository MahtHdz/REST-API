import User from '../models/user'
import Role from '../models/role'
import jwt from 'jsonwebtoken'
import config from '../config'

export const signin = async (req, res) => {
    res.json('signin');
}

export const signup = async (req, res) => {
    const {email, password, role} = req.body;
    
    const newUser = new User({
        email, 
        encryptedPassword: await User.encryptPassword(password)
    })

    if(role){
        const role = await Role.find({name: role});
        newUser.role = role._id;
    }else{
        const role = await Role.findOne({name: "holder"});
        newUser.role = role._id;
    }
    const savedUser = await newUser.save();
    console.log(savedUser);
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400    //24 HOURS
    });
    res.status(200).json({token});
}