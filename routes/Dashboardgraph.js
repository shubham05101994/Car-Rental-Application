const express = require("express");
const dashboard = express.Router();
const cors = require("cors");
const db = require("../database/db.js");
dashboard.use(cors());



dashboard.get("/", (req, res) => {
    db.sequelize
    .query("select File_description,sum(allcount) as count from user_login.user_file_details group by File_description order by sum(allcount) desc limit 5")
    .then(([results]) => {
        res.send(results);
        //console.log(results);
      })
    });

dashboard.get("/Country", (req, res) => {
    db.sequelize
    .query("select Country,sum(allcount) as count from user_login.user_file_details group by Country order by sum(allcount) desc limit 5")
    .then(([results]) => {
        res.send(results);
        //console.log(results);
      })
    });

    dashboard.get("/UnitedStatesCountry", (req, res) => {
        db.sequelize
        .query("select File_description,sum(allcount) as count from user_login.user_file_details where Country='United States' group by File_description order by sum(allcount) desc limit 5")
        .then(([results]) => {
            res.send(results);
            //console.log(results);
          })
        });
    
    dashboard.get("/IndiaCountry", (req, res) => {
        db.sequelize
        .query("select File_description,sum(allcount) as count from user_login.user_file_details where Country='India' group by File_description order by sum(allcount) desc limit 5")
            .then(([results]) => {
                res.send(results);
                //console.log(results);
              })
            });        
    dashboard.get("/JapanCountry", (req, res) => {
        db.sequelize
        .query("select File_description,sum(allcount) as count from user_login.user_file_details where Country='Japan' group by File_description order by sum(allcount) desc limit 5")
            .then(([results]) => {
                res.send(results);
                        //console.log(results);
                })
            });
    dashboard.get("/ChinaCountry", (req, res) => {
        db.sequelize
        .query("select File_description,sum(allcount) as count from user_login.user_file_details where Country='China' group by File_description order by sum(allcount) desc limit 5")
            .then(([results]) => {
                res.send(results);
                //console.log(results);
                })
            });

    dashboard.get("/SingaporeCountry", (req, res) => {
        db.sequelize
        .query("select File_description,sum(allcount) as count from user_login.user_file_details where Country='Singapore' group by File_description order by sum(allcount) desc limit 5")
            .then(([results]) => {
                res.send(results);
                        //console.log(results);
                })
            });

            dashboard.get("/iot", (req, res) => {
                db.sequelize
                .query("select * from user_login.Iots")
                    .then(([results]) => {
                        res.send(results);
                                //console.log(results);
                        })
                    });

module.exports = dashboard;