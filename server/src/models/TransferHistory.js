import Sequelize from 'sequelize';
import { conn as Model } from '../db/database';
import BankAccount from './BankAccount';

const TransferHistory = Model.define('user', {
    amount: Sequelize.REAL,
    transfer_type: Sequelize.TEXT,
    date:Sequelize.DATE,
});

TransferHistory.belongsTo(BankAccount,{
    foreignKey:'public.transfer_history.origin_account',
    sourceKey: 'public.transfer_history.account_number'
});

TransferHistory.belongsTo(BankAccount,{
    foreignKey:'destination_account',
    sourceKey: 'account_number'
});

export default TransferHistory;
