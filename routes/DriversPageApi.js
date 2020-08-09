const express = require("express");
const driverspage = express.Router();
const cors = require("cors");
const db = require("../database/db.js");
driverspage.use(cors());

driverspage.get("/membershipCheck", (req, res) => {
  db.sequelize
    .query("SELECT * FROM CarRental.users WHERE email=:email", {
      replacements: {
        email: req.query.email
      }
    })
    .then(([results]) => {
      res.json(results[0]);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

driverspage.post("/updateMembershipExpiry", (req, res) => {
  db.sequelize.query('update CarRental.users set MembershipExpirationDate = :MembershipExpirationDate where email = :email', {
    replacements: {
      email: req.body.email,
      MembershipExpirationDate: req.body.updateMembership
    }
  })
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log("error: " + err);
    });
});
driverspage.get("/checkLicense", (req, res) => {
  db.sequelize
    .query("SELECT * FROM CarRental.dmv_verify WHERE license_id=:license_id and first_name=:first_name", {
      replacements: {
        license_id: req.query.license_id,
        first_name: req.query.first_name
      }
    })
    .then(([results]) => {
      if (results.length >= 1) {
        res.send(results);
      }
      else {
        res.status(404).json('I dont have that');
      }

    })
    .catch(err => {
      res.send("error: " + err);
    });
});
driverspage.post("/booking", (req, res) => {
  var bookinDetail = req.body.params.bookinDetail;
  console.log("bookinDetail ", bookinDetail);

  db.sequelize
    .query("CALL CarBooking(:VehicleNumber,:Start,:End,:UserEmailID,:RentalCost,:OneHourRental,:LateReturnFee,:numberOfHours,:VehicalCondition)", {
      //.query('insert into CarRental.BookingDetail(vehicleNumber,Start,End,UserEmailID,RentalCost,OneHourRental,LateReturnFee,numberOfHours,VehicalCondition)'+
      //' values(:vehicleNumber,:Start,:End,:UserEmailID,:RentalCost,:OneHourRental,:LateReturnFee,:numberOfHours,:VehicalCondition)' , {
      //.query("SELECT * FROM CarRental.BookingDetail where VehicleNumber=:VehicleNumber and Start>=:Start and End<=:End" , {
      replacements: {
        VehicleNumber: req.body.params.bookinDetail.VehicleNumber,
        Start: req.body.params.bookinDetail.Start,
        End: req.body.params.bookinDetail.End,
        UserEmailID: req.body.params.bookinDetail.UserEmailID,
        RentalCost: req.body.params.bookinDetail.RentalCost,
        OneHourRental: req.body.params.bookinDetail.OneHourRental,
        LateReturnFee: req.body.params.bookinDetail.LateReturnFee,
        numberOfHours: req.body.params.bookinDetail.numberOfHours,
        VehicalCondition: req.body.params.bookinDetail.VehicalCondition
      }
    })
    .spread((result) => {
      console.log(result.sum);
      if (result.sum == 5) {
        console.log("Your booking is done");
        res.send(result);
      }
      else {
        db.sequelize
          .query("CALL SimilarCars(:VehicleNumber)", {
            replacements: {
              VehicleNumber: req.body.params.bookinDetail.VehicleNumber
            }
          })
          .then((result) => {
            if (result.length > 0) {
              console.log('res ', result);
              res.send(result);
            }
            else {
              let sum = 6;
              res.send('6');
            }
          })
          .catch(err => {
            console.log('err', err);
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.send("error: " + err);
    });

});
driverspage.delete("/terminate", (req, res) => {

  db.sequelize
    .query('delete from CarRental.users where id=:id', {
      replacements: {
        id: req.query.id
      }
    })
    .then((results) => {

      res.json(results);
    })
    .catch(err => {
      res.send("error: " + err);
    });

});
driverspage.get("/currentBookings", (req, res) => {
  db.sequelize
    .query("SELECT * FROM CarRental.BookingDetail WHERE UserEmailID=:UserEmailID and (VehicleReturn=0 or VehicleReturn is null) and (Cancelled=0 or Cancelled is null)", {
      replacements: {
        UserEmailID: req.query.UserEmailID
      }
    })
    .then(([results]) => {
      if (results.length > 0) {
        res.send(results);
      }
      else {
        res.status(404).json('I dont have that');
      }

    })
    .catch(err => {
      res.send("error: " + err);
    });
});
driverspage.post("/cancelledWithin", (req, res) => {
  db.sequelize
    .query("UPDATE CarRental.BookingDetail SET RentalCost=:RentalCost,Cancelled=:Cancelled where BookingID=:BookingID", {
      replacements: {
        RentalCost: 0,
        Cancelled: 1,
        BookingID: req.body.params.BookingID
      }
    })
    .then((results) => {
      console.log(results);
      res.json(results);
    })
    .catch(err => {
      res.send("error: " + err);
    });

});
driverspage.post("/cancelledAfter", (req, res) => {
  db.sequelize
    .query("UPDATE CarRental.BookingDetail SET RentalCost=:RentalCost,Cancelled=:Cancelled where BookingID=:BookingID", {
      replacements: {
        RentalCost: req.body.params.OneHourRental,
        Cancelled: 1,
        BookingID: req.body.params.BookingID
      }
    })
    .then((results) => {
      console.log(results);
      res.json(results);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
driverspage.post("/returnCar", (req, res) => {
  db.sequelize
    .query("UPDATE CarRental.BookingDetail SET VehicleReturn=:VehicleReturn,ReturnComment=:ReturnComment where BookingID=:BookingID", {
      replacements: {
        VehicleReturn: 1,
        ReturnComment: req.body.params.ReturnComment,
        BookingID: req.body.params.BookingID
      }
    })
    .then((results) => {
      if(results[0].affectedRows==1){
        res.send(results[0]);
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });

});

driverspage.post("/returnCarLate", (req, res) => {
  db.sequelize
    .query("UPDATE CarRental.BookingDetail SET VehicleReturn=:VehicleReturn,ReturnComment=:ReturnComment,LateReturnFee=:LateReturnFee where BookingID=:BookingID", {
      replacements: {
        VehicleReturn: 1,
        ReturnComment: req.body.params.ReturnComment,
        LateReturnFee: req.body.params.LateReturnFee,
        BookingID: req.body.params.BookingID
      }
    })
    .then((results) => {
      if(results[0].affectedRows==1){
        res.send(results[0]);
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });

});
module.exports = driverspage;
