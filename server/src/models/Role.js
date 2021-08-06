import Sequelize from 'sequelize';
import { conn as Model } from '../db/database';

const Role = Model.define('role', {
    name:{
        type: Sequelize.TEXT,
        primaryKey: true,
    }
});

export default Role;