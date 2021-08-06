import Sequelize from 'sequelize';

export const conn = new Sequelize(
  'api', 
  'admin', 
  'Fr34kb00x$', {
    host:'localhost',
    dialect:'postgres',
    pool: {
      max: 9,
      min: 0,
      require:100,
      idle: 10000
    },
    //login:false
});