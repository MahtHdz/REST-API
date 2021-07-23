import User from '../models/user';
import BankAccount from '../models/bankAccount';

export const updateEmail = async (req, res) => {
    const {currentEmail, newEmail} = req.body;
    
    const userFound = await User.findOne({email: currentEmail});
    if (!userFound) return res.status(400).json({message: "User not found"});
    
    const UpdatedUser = await userFound.updateOne({email: {$push: newEmail}});
    console.log(UpdatedUser);
    res.json({emailUpdate: 'OK'});
}

export const updatePassword = async (req, res) => {
    const {email, currentPassword, newPassword} = req.body;

    const userFound = await User.findOne({email});
    if (!userFound) return res.status(400).json({message: "User not found"});

    const matchPassword = await User.comparePassword(currentPassword, userFound.encryptedPassword);
    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'});
    
    const UpdatedUser = await userFound.updateOne({encryptedPassword: {$push: await User.encryptPassword(newPassword)}});
    console.log(UpdatedUser);
    res.json({passwordUpdate: 'OK'});
}

export const updateBankAccount = async (req, res) => {
    const email = req.body.email;

    const userFound = await User.findOne({email});
    if (!userFound) return res.status(400).json({message: "User not found"});
    
    const {bankAccount, balance} = genAccount();
    const newBankAccount = new BankAccount({
        bankAccount,
        balance
    });

    const UpdatedUser = await userFound.updateOne({bankAccount: {$push: newBankAccount}});
    console.log(UpdatedUser);
    res.json({bankAccountUpdate: 'OK'});
}

export const deleteHolder = async (req, res) => {
    //const bankAccountDFound = holderFound.bankAccount;
    const deletedHolder = await User.findOneAndDelete({email: req.params.email});
    console.log(deletedHolder);
    res.json({holderDeleted: 'OK'});
}