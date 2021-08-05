import pool from "../database";
import * as passwordFunctions from '../libs/password';
import { genBalanceAccount } from '../libs/genBalanceAccount';

export const showAll = async (req, res) => {
    const users = await pool.query('SELECT * FROM public.user');
    res.json(users.rows);
};

export const updateEmail = async (req, res) => {
    const {currentEmail, newEmail} = req.body;
    
    const UpdatedUser = await pool.query('UPDATE public.user SET email = $2 WHERE email = $1', [currentEmail, newEmail]);
    if (UpdatedUser.rowCount === 0) return res.status(400).json({message: "User not found"});
    console.log(UpdatedUser.rows);
    res.json({emailUpdate: 'OK'});
}

export const updatePassword = async (req, res) => {
    const {email, currentPassword, newPassword} = req.body;
    const userQuery = await pool.query('SELECT email, password FROM public.user WHERE email = $1', [email]);
    if(userQuery.rowCount === 0) return res.status(400).json({message: 'Invalid user'});
    if (!await passwordFunctions.comparePassword(userQuery.rows[0].password, currentPassword)) return res.status(401).json({message: "Invalid password"});
    
    const encryptedNewPassword = await passwordFunctions.encryptPassword(newPassword);
    const UpdatedUser = await pool.query('UPDATE public.user SET password = $1 WHERE email = $2', [encryptedNewPassword, email]);
    if (UpdatedUser.rowCount === 0) return res.status(401).json({message: "Something goes wrong"});
    console.log(UpdatedUser.rows);
    res.json({passwordUpdate: 'OK'});
}

export const updateBankAccount = async (req, res) => {
    const {email, newBankAccount} = req.body;

    const userQuery = await pool.query('SELECT email, bank_account FROM public.user WHERE email = $1', [email]);
    if(userQuery.rowCount === 0) return res.status(400).json({message: 'Invalid user'});

    const balance = genBalanceAccount();

    const UpdatedUser = await pool.query('UPDATE public.bank_account SET account_number = $2, balance = $3 WHERE account_number = $1', [userQuery.rows[0].bank_account, newBankAccount, balance]);
    if (UpdatedUser.rowCount === 0) return res.status(401).json({message: "Something goes wrong"});
    console.log(UpdatedUser.rows);
    res.json({bankAccountUpdate: 'OK'});
}

export const deleteHolder = async (req, res) => {
    const deletedHolder = await pool.query('DELETE FROM public.user WHERE email = $1', [req.params.email]);
    res.json({userDeleted: 'OK'});
}