const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    age:{
      type: Sequelize.INTEGER,
      allowNull:false
    },
    LicenseID:{
      type: Sequelize.INTEGER,
      allowNull:false
    },
    Address:{
      type: Sequelize.STRING,
      allowNull:false
    },
    RegisterationDate:{
      type: Sequelize.DATE,
      allowNull:false
    },
    MembershipExpirationDate:{
      type: Sequelize.DATE,
      allowNull:false
    },
    CardPayment:{
      type: Sequelize.INTEGER,
      allowNull:false
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
