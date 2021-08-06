import Sequelize from 'sequelize';
import { conn as Model } from '../db/database';

const BankAccount =  Model.define('bank_account', {
    account_number:{
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    balance: Sequelize.REAL
}, {
    timestamps: false,
    freezeTableName: true
});

export default BankAccount;