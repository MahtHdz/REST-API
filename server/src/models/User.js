import Sequelize from 'sequelize';

import Role from './Role';
import BankAccount from './BankAccount';
import { conn as Model } from '../db/database';

const User =  Model.define('user', {
    email:{
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    password: Sequelize.TEXT
}, {
    timestamps: false,
    freezeTableName: true
});

User.belongsTo(BankAccount, {
    foreignKey:'bank_account',
    as: 'bankAccount',
    sourceKey: 'account_number'
});
User.belongsTo(Role, {
    foreignKey:'role',
    as: 'Role',
    sourceKey: 'name'
});

export default User;