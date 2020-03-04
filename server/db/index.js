const Sequelize = require('sequelize');
const path = require("path");
const loadEnv = require("./load-env");


const sequelizeConfig = {
  ...loadEnv(),
  operatorsAliases: false,
  modelPaths: [path.resolve(__dirname, "..", "models", "!(*test.*|index.js)")],
  logging: false, // enable this to show sequelize commands translated to their SQL queries
};

const sequelize = new Sequelize(sequelizeConfig);

module.exports = sequelize;
