import { genAccount } from '../libs/genBankAccount';
import BankAccount from '../models/bankAccount';
import User from '../models/user';
import Role from '../models/role';
import jwt from 'jsonwebtoken';
import config from '../config';

export const signin = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("role");
    if (!userFound) return res.status(400).json({message: "User not found"});
    
    const matchPassword = await User.comparePassword(req.body.password, userFound.encryptedPassword);
    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'});
    
    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    });
    
    console.log(userFound);
    res.json({token});
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

    const {bankAccount, balance} = genAccount();
    const newBankAccount = new BankAccount({
        bankAccount,
        balance
    });
    newUser.bankAccount = newBankAccount;

    const savedUser = await newUser.save();
    console.log(savedUser);
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400    //24 HOURS
    });
    res.status(200).json({token});
}