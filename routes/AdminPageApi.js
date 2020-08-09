const express = require("express");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const adminpageapi = express.Router();
const cors = require("cors");
const db = require("../database/db.js");
adminpageapi.use(cors());


adminpageapi.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'tmp'
}));

adminpageapi.get("/allCarDetails", (req, res) => {
    db.sequelize
      .query("select * from VehicleDetails")
      .then(([results]) => {
        res.json(results);
        console.log(results);
      })
      .catch(err => {
        res.send("error: " + err);
      });
  });
  
adminpageapi.get("/getCarDetails/:VehicleNumber", (req, res) => {
    db.sequelize
      .query("select * from VehicleDetails WHERE VehicleNumber=:VehicleNumber" , {
        replacements: {
            VehicleNumber: req.params.VehicleNumber
        }
      })
      .then(([results]) => {
        res.json(results);
        console.log(results);
      })
      .catch(err => {
        res.send("error: " + err);
      });
});

adminpageapi.post("/addCarDetails", (req, res) => {

    db.sequelize.query('insert into CarRental.VehicleDetails(VehicalType, VehicalPicture, HrRentalPrice, RentalLocationName, RentalAddress, RentalVehicalCapacity, VehicleModel, VehicleYear, RegistrationTag, CurrentMileage, LastServicedDate, VehicleCondition, LateReturnFee) '+
    ' values(:VehicalType, :VehicalPicture, :HrRentalPrice, :RentalLocationName, :RentalAddress, :RentalVehicalCapacity, :VehicleModel, :VehicleYear, :RegistrationTag, :CurrentMileage, :LastServicedDate, :VehicleCondition, :LateReturnFee)', {
     replacements: {
        VehicalType: req.body.VehicalType,
        VehicalPicture: req.body.VehicalPicture,
        HrRentalPrice: req.body.HrRentalPrice,
        RentalLocationName: req.body.RentalLocationName,
        RentalAddress: req.body.RentalAddress,
        RentalVehicalCapacity: req.body.RentalVehicalCapacity,
        VehicleModel: req.body.VehicleModel,
        VehicleYear: req.body.VehicleYear,
        RegistrationTag: req.body.RegistrationTag,
        CurrentMileage: req.body.CurrentMileage,
        LastServicedDate: req.body.LastServicedDate, 
        VehicleCondition: req.body.VehicleCondition,
        LateReturnFee: req.body.LateReturnFee
     }
   })
   .then(response => {
      res.send(response);
   })
   .catch(err => {
     console.log("error: " + err);
     res.send("Got Error while adding car details")
   });
 });

 adminpageapi.delete("/deleteCarDetails/:VehicleNumber", (req, res) => {
   console.log("got delete request");
   console.log(req.params);
    db.sequelize
      .query("DELETE FROM CarRental.VehicleDetails WHERE VehicleNumber=:VehicleNumber", {
        replacements: {
            VehicleNumber: req.params.VehicleNumber
        }
      })
      .then(([results]) => {
        res.json(results);
      })
      .catch(err => {
        res.send("error: " + err);
      });
  });

  adminpageapi.post("/updateCarDetails/:VehicleNumber", (req, res) => {

    db.sequelize.query('update CarRental.VehicleDetails set VehicalType=:VehicalType, VehicalPicture=:VehicalPicture, HrRentalPrice=:HrRentalPrice, RentalLocationName=:RentalLocationName, RentalAddress=:RentalAddress, RentalVehicalCapacity=:RentalVehicalCapacity, VehicleModel=:VehicleModel, VehicleYear=:VehicleYear, RegistrationTag=:RegistrationTag, CurrentMileage=:CurrentMileage, LastServicedDate=:LastServicedDate, VehicleCondition=:VehicleCondition, LateReturnFee=:LateReturnFee WHERE VehicleNumber=:VehicleNumber', {
     replacements: {
        VehicleNumber: req.params.VehicleNumber,
        VehicalType: req.body.VehicalType,
        VehicalPicture: req.body.VehicalPicture,
        HrRentalPrice: req.body.HrRentalPrice,
        RentalLocationName: req.body.RentalLocationName,
        RentalAddress: req.body.RentalAddress,
        RentalVehicalCapacity: req.body.RentalVehicalCapacity,
        VehicleModel: req.body.VehicleModel,
        VehicleYear: req.body.VehicleYear,
        RegistrationTag: req.body.RegistrationTag,
        CurrentMileage: req.body.CurrentMileage,
        LastServicedDate: req.body.LastServicedDate, 
        VehicleCondition: req.body.VehicleCondition,
        LateReturnFee: req.body.LateReturnFee
     }
   })
   .then(response => {
      res.send(response);
   })
   .catch(err => {
     console.log("error: " + err);
   });
 });

 adminpageapi.post('/upload_file', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  console.log("tempFilePath:" + req.files.inputFile.tempFilePath);
  console.log(req.files.inputFile);
  var filename = req.files.inputFile.name;
  fs.rename(req.files.inputFile.tempFilePath, "/home/ubuntu/sp20-cmpe-202-sec-49-team-project-crackillusion/client/build/"+filename, (err) => {
    if (err) throw err; 
    console.log('Rename complete!');
  });

  res.send("Uploaded");
 // const fileContent = fs.createReadStream(req.files.inputFile.tempFilePath);
  //console.log("mimetype: " + req.files.inputFile.mimetype)

});

adminpageapi.get("/searchCar/:carModel/:location", (req, res) => {
  var cm =  req.params.carModel;
  if(req.params.carModel == '-' || req.params.carModel == 'undefined') {
    cm = '';
  }
  var loc =  req.params.location;
  if(req.params.location == '-' || req.params.location == "undefined") {
    loc = '';
  }
  db.sequelize
    .query("CALL SearchCar(:carModel,:location)" , {
      replacements: {
        carModel: cm,
        location: loc
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

adminpageapi.get("/getAllUsers", (req, res) => {
  db.sequelize
    .query("select * from CarRental.users Where email != 'admin@cloud.com'")
    .then(([results]) => {
      res.json(results);
      console.log(results);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

adminpageapi.post("/terminateUser/:emailId", (req, res) => {
  db.sequelize
    .query("CALL TerminateUserSP(:emailId)" , {
      replacements: {
        emailId: req.params.emailId,
      }
    })
    .then(response => {
      res.send(response);
   })
   .catch(err => {
     console.log("error: " + err);
   });
});



module.exports = adminpageapi;
