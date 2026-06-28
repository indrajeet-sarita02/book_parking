const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const isVercel = !!process.env.VERCEL;
const hasProductionDb = !!(process.env.DB_HOST && process.env.DB_NAME);

const config = {
  development: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './database/parking.db',
    logging: false,
  },
  production: hasProductionDb ? {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  } : {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './database/parking.db',
    logging: false,
    ...(isVercel ? { dialectOptions: { mode: 1 } } : {}),
  },
};

const sequelize = new Sequelize(config[env]);

module.exports = sequelize;
