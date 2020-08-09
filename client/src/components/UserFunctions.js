
import axios from "axios";

export const register = async newUser => {
  try {
     
  const response = await axios
    .post("users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      age:newUser.age,
      LicenseID:newUser.LicenseID,
      Address:newUser.Address,
      RegisterationDate:newUser.RegisterationDate,
      MembershipExpirationDate:newUser.MembershipExpirationDate,
      CardPayment:newUser.CardPayment,
      email: newUser.email,
      password: newUser.password
    });
    console.log("Registered");
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};

export const login = async user => {
  try {
    const response = await axios
      .post("users/login", {
        email: user.email,
        password: user.password
      });
   
    localStorage.setItem("usertoken", response.data);
    localStorage.setItem("email", user.email);
    return response.data;
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};

export const membershipCheck= async email =>{
  try {
    const response = await axios
      .get("driverspage/membershipCheck", {
        params:{
        email:email
        }
      });
    console.log('check membership', response);
    return response;
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};
export const updateMembershipExpiry= async membershipExtension =>{
  try {
    const response = await axios
      .post("driverspage/updateMembershipExpiry", {
        
          updateMembership:membershipExtension.after6months,
          email:membershipExtension.email
        
      });
    console.log('Update membership', response);
    return response;
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};
export const checkLicense= async licenseDetails =>{
  try {
    const response = await axios
      .get("driverspage/checkLicense", {
        params:{
          license_id:licenseDetails.LicenseID,
          first_name:licenseDetails.first_name
        }
      });
    console.log('Verify LicenseID', response);
    return response;
  }
  catch (err) {
    console.log(err);
    
  }
};
export const returnallfiles =  async emailid => {
  console.log('in return all file api', emailid);
  try {
    const response = await axios
      .get("returnfiles/", {
        params: {
          Email_id: emailid
        }
      });
    console.log('all files', response);
    return response.data;
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
  // console.log(response);
 };

 export const deletefile =  async key => {
  console.log('in delete all file api key', key);
  try {
     const response = await axios
       .get("returnfiles/delete", {
         params: {
           key: key
         }
       });
     console.log('all files', response);
     return response.data;
   }
   catch (err) {
     console.log(err);
     alert(err);
   }
  // console.log(response);
 };

 

 
 export const updatedatabase =  async (idfileupdate) => {
  console.log('in updatefile userfunction.js', idfileupdate);
  try {
     const response = await axios
       .post("returnfiles/updatedatabase", {
         
           idUser_file_details: idfileupdate
         
       });
      return response;
   }
   catch (err) {
     console.log(err);
     alert(err);
   }
 };

 export const getAllCarDetails= async() =>{
  try {
    const response = await axios
      .get("adminpageapi/allCarDetails");
    console.log('Car Details', response.data);
    return response.data;
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};

export const getCarDetail= async key =>{
  try {
    const response = await axios
      .get("adminpageapi/getCarDetails/"+key, {
        params: {
         VehicleNumber: key
        }
      });
    console.log('Car Details', response.data);
    return response.data;
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};

export const addCarDetails = async newCar => {
  try {
  const response = await axios
    .post("adminpageapi/addCarDetails", {
        VehicalType: newCar.VehicalType,
        VehicalPicture: newCar.VehicalPicture,
        HrRentalPrice: newCar.HrRentalPrice,
        RentalLocationName: newCar.RentalLocationName,
        RentalAddress: newCar.RentalAddress,
        RentalVehicalCapacity: newCar.RentalVehicalCapacity,
        VehicleModel: newCar.VehicleModel,
        VehicleYear: newCar.VehicleYear,
        RegistrationTag: newCar.RegistrationTag,
        CurrentMileage: newCar.CurrentMileage,
        LastServicedDate: newCar.LastServicedDate, 
        VehicleCondition: newCar.VehicleCondition,
        LateReturnFee: newCar.LateReturnFee,
    });
    console.log("Car Registered");
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};

export const deleteCarDetails =  async key => {
  console.log('delete key', key);
  try {
     const response = await axios
       .delete("adminpageapi/deleteCarDetails/"+key, {
         params: {
          VehicleNumber: key
         }
       });
     console.log('delete file', response);
     return response.data;
   }
   catch (err) {
     console.log(err);
     alert(err);
   }
  // console.log(response);
 };

 export const updateCarDetails = async newCar => {
  try {
  const response = await axios
    .post("adminpageapi/updateCarDetails/"+newCar.VehicleNumber, {
        params: {
          VehicleNumber: newCar.VehicleNumber
        },
        VehicalType: newCar.VehicalType,
        VehicalPicture: newCar.VehicalPicture,
        HrRentalPrice: newCar.HrRentalPrice,
        RentalLocationName: newCar.RentalLocationName,
        RentalAddress: newCar.RentalAddress,
        RentalVehicalCapacity: newCar.RentalVehicalCapacity,
        VehicleModel: newCar.VehicleModel,
        VehicleYear: newCar.VehicleYear,
        RegistrationTag: newCar.RegistrationTag,
        CurrentMileage: newCar.CurrentMileage,
        LastServicedDate: newCar.LastServicedDate, 
        VehicleCondition: newCar.VehicleCondition,
        LateReturnFee: newCar.LateReturnFee,
    });
    console.log("Car Details Updated");
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};
 export const uploadFile = async inputFile => {
  try {
    const formData = new FormData();
    formData.append('inputFile', inputFile);
    const response = await axios
    .post("adminpageapi/upload_file", formData);
    console.log("Car image uploaded");
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
}; 
export const getAllUsers= async() =>{
  try {
    const response = await axios
      .get("adminpageapi/getAllUsers");
    console.log('User Details', response.data);
    return response.data;
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};
export const deleteUser =  async emailId => {
  console.log('delete emailId', emailId);
  try {
     const response = await axios
       .post("adminpageapi/terminateUser/"+emailId, {
         params: {
          emailId: emailId
         }
       });
     console.log('delete file', response);
     return response.data;
   }
   catch (err) {
     console.log(err);
     alert(err);
   }
  // console.log(response);
 };

 export const searchCar= async(carModel,location) =>{
  var cm =  carModel;
  if(carModel == '') {
    cm = '-';
  }
  var loc = location;
  if(location == '') {
    loc = '-';
  }
  try {
    const response = await axios
      .get("adminpageapi/searchCar/"+cm+"/"+loc, {
        params: {
          carModel: cm,
          location: loc
        }
      });
    console.log('Car Details', response.data);
    return response.data;
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};
export const booking =  async bookinDetail => {
  console.log('booking details', bookinDetail);
  try {
     const response = await axios
       .post("driverspage/booking/", {
         params: {
          bookinDetail: bookinDetail
         }
       });
     console.log('booking details ', response);
     return response.data;
   }
   catch (err) {
     console.log(err);
     alert(err);
   }
  // console.log(response);
 };
 export const terminate =  async id => {
  console.log('terminate ', id);
  try {
     const response = await axios
       .delete("driverspage/terminate/", {
         params: {
          id: id
         }
       });
    
     return response.status;
   }
   catch (err) {
     console.log(err);
     alert(err);
   }
  // console.log(response);
 }; 
 export const getCurrentBooking= async UserEmailID =>{
  try {
    const response = await axios
      .get("driverspage/currentBookings", {
        params:{
          UserEmailID:UserEmailID
        }
      });
    console.log('User Details', response);
    return response;
  }
  catch (err) {
    console.log(err);
    //alert(err);
  }
};
export const cancelWithin =  async BookingID => {
  //console.log('booking details', cancelDetail);
  try {
     const response = await axios
       .post("driverspage/cancelledWithin/", {
         params: {
          BookingID: BookingID
         }
       });
     console.log('Cancellation details ', response);
     return response.data;
   }
   catch (err) {
     console.log(err);
     alert(err);
   }
  // console.log(response);
 };
 export const cancelAfter =  async (BookingID,OneHourRental) => {
  //console.log('booking details', bookinDetail);
  try {
     const response = await axios
       .post("driverspage/cancelledAfter/", {
         params: {
          BookingID: BookingID,
          OneHourRental:OneHourRental
         }
       });
     console.log('Cancellation details ', response);
     return response.data;
   }
   catch (err) {
     console.log(err);
     alert(err);
   }
  // console.log(response);
 };
 export const returnCarLate =  async (BookingID,ReturnComment,LateReturnFee) => {
  //console.log('booking details', cancelDetail);
  try {
     const response = await axios
       .post("driverspage/returnCarLate/", {
         params: {
          BookingID: BookingID,
          ReturnComment:ReturnComment,
          LateReturnFee:LateReturnFee
         }
       });
     console.log('returnCar ', response);
     return response.data;
   }
   catch (err) {
     console.log(err);
     alert(err);
   }
  // console.log(response);
 };
 export const returnCar =  async (BookingID,ReturnComment) => {
  //console.log('booking details', cancelDetail);
  try {
     const response = await axios
       .post("driverspage/returnCar/", {
         params: {
          BookingID: BookingID,
          ReturnComment:ReturnComment
         }
       });
     console.log('returnCar ', response);
     return response.data;
   }
   catch (err) {
     console.log(err);
     alert(err);
   }
  // console.log(response);
 };