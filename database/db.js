const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("CarRental", "admin", "admin123", {
  host: "sse202.c7gf8ktybcod.us-west-1.rds.amazonaws.com",
  port: 3306,
  dialect: "mysql",
  /*dialectOptions: {
    ssl:'Amazon RDS'
  },*/
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
