import User from '../models/user';
import Role from '../models/role';
import * as Transfer from '../models/transfer';
import BankAccount from '../models/bankAccount';

export const showHoldersTransactions = async (req, res) => {
    const usersFounded = await User.find();
    res.json(usersFounded);
    //et holderOperations = [];
    //holderOperations.push() ()

}

export const showAdminDeposits = async (req, res) => {
    
}

export const transferToAccount = async (req, res) => {
    const {amount, originAccount, destinationAccount} = req.body;

    await BankAccount.findOne({bankAccount: originAccount}) ?
        {} : res.json("Origin account doesn't exist.");
    await BankAccount.findOne({bankAccount: destinationAccount}) ?
        {} : res.json("Destination account doesn't exist.");

    const originAccountFounded = await BankAccount.findOne({bankAccount: originAccount});
    const destinationAccountFounded = await BankAccount.findOne({bankAccount: destinationAccount});
    Number(originAccountFounded.balance) >= Number(amount) ?
    {} : res.json("Insufficient funds.");
    
    const finalBalance = Number(destinationAccountFounded.balance) + Number(amount);
    const transferMadeIt = await destinationAccountFounded.updateOne({balance: finalBalance});
    const record = new Transfer.operationModel({amount, operationType: Transfer.Operations.Transfer, originAccount, destinationAccount});
    const savedRecord = await record.save();
    console.log(savedRecord);
    res.json({'transfer': 'OK'});
}

export const depositToAccount = async (req, res) => {
    const {amount, destinationAccount} = req.body;

    await BankAccount.findOne({bankAccount: destinationAccount}) ?
        {} : res.json("Destination account doesn't exist.");

    const destinationAccountFounded = await BankAccount.findOne({bankAccount: destinationAccount});
    
    const finalBalance = Number(destinationAccountFounded.balance) + Number(amount);
    const transferMadeIt = await destinationAccountFounded.updateOne({balance: finalBalance});
    const record = new Transfer.operationModel({amount, operationType: Transfer.Operations.Deposit, destinationAccount});
    const savedRecord = await record.save();
    console.log(savedRecord);
    res.json({'deposit': 'OK'});
}