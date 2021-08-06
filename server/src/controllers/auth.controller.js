import jwt from 'jsonwebtoken';

import { genBalanceAccount } from '../libs/genBalanceAccount';
import * as passwordFunctions from '../libs/password';
import BankAccount from '../models/BankAccount';
import User from '../models/User'
import config from '../config';
import conn from "../db/database";
import Sequelize from 'sequelize';

export const signin = async (req, res) => {
    const userFound = await pool.query('SELECT * FROM public.user WHERE email = $1', [req.body.email]);
    if (userFound.rowCount === 0) {return res.status(400).json({message: "User not found"})};
    
    console.log(userFound.rows[0].password);
    const matchPassword = await passwordFunctions.comparePassword(userFound.rows[0].password, req.body.password);
    if(!matchPassword) {return res.status(401).json({token: null, message: 'Invalid password'})};
    const token = jwt.sign({
        email: userFound.rows[0].email,
        password: userFound.rows[0].password,
        role: userFound.rows[0].role
    }, config.SECRET, {
        expiresIn: 86400
    }); 
    res.json({token});
}

export const signup = async (req, res) => {
    const {email, password, bankAccount, role} = req.body;
    try {
/*
        const newBankAccount = await BankAccount.update({
            account_number: bankAccount,
            balance: genBalanceAccount()
        },{
            fields:['account_number', 'balance']
        });
        if (newBankAccount) return res.status(200).json({
            message: 'Bank account added successfully',
            data: newUser
        });
 */
        const roleQuery = role ?
            await Sequelize.literal('SELECT name FROM public.role WHERE name = $1', [role]) :
            await Sequelize.literal("SELECT name FROM public.role WHERE name = 'holder'");
        const assignedRole = roleQuery ?
            Sequelize.literal("SELECT name FROM public.role WHERE name = 'holder'") :
            {}
        
        const newUser = await User.update({
            email,
            password,
            bank_account: bankAccount, 
            role: 'holder'
        },{
            fields:['email', 'password', 'bank_account', 'role']
        });
        if (newUser) return res.status(200).json({
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: 'Something goes wrong',
            data: {}
        });
    }
    /*
    const roleQuery = role ?
        await pool.query('SELECT name FROM public.role WHERE name = $1', [role]) :
        await pool.query("SELECT name FROM public.role WHERE name = 'holder'");
    const balance = genBalanceAccount();
    await pool.query("INSERT INTO public.bank_account(account_number, balance) VALUES($1, $2)", [Number(bankAccount), parseFloat(balance)]);
    const assignedRole = roleQuery.rows[0].name;
    const encryptedPassword = await passwordFunctions.encryptPassword(password);
    const savedUser = await pool.query('INSERT INTO public.user(email, password, bank_account, role) VALUES($1, $2, $3, $4)', [email, encryptedPassword, Number(bankAccount), assignedRole]);
    //console.log({"query": "ok"})
    const token = jwt.sign({
        email,
        password: encryptedPassword,
        role: assignedRole
    }, config.SECRET, {
        expiresIn: 86400    //24 HOURS
    });
    res.status(200).json({token});
    */
}
