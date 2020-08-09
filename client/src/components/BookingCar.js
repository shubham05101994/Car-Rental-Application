import React, { Component } from "react";
import { getCarDetail, booking } from "./UserFunctions";
import "./input-moment.css";
import InputMoment from "input-moment";
import moment from "moment";
import "./sh.css";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Container } from "react-bootstrap";
class BookingCar extends Component {
  constructor(props) {
    super(props);
    console.log("Car ID ", props.match.params.id);
    this.state = {
      carId: props.match.params.id,
      VehicleModel: "",
      VehicleYear: "",
      VehicalType: "",
      RentalVehicalCapacity: "",
      HrRentalPrice: "",
      VehicleCondition: "",
      CurrentMileage: "",
      RegistrationTag: "",
      LastServicedDate: "",
      RentalLocationName: "",
      RentalAddress: "",
      VehicalPicture: "",
      LateReturnFee: "",
      m1: moment(),
      m2: moment(),
      checkHrBookButton:'',
      discount:''
    };
  }
  componentDidMount() {
    getCarDetail(this.state.carId)
      .then((json) => {
        console.log(json);
        if (Array.isArray(json)) {
          this.setState({
            VehicalPicture: json[0].VehicalPicture,
            VehicleModel: json[0].VehicleModel,
            VehicleYear: json[0].VehicleYear,
            VehicalType: json[0].VehicalType,
            RentalVehicalCapacity: json[0].RentalVehicalCapacity,
            HrRentalPrice: json[0].HrRentalPrice,
            VehicleCondition: json[0].VehicleCondition,
            CurrentMileage: json[0].CurrentMileage,
            RegistrationTag: json[0].RegistrationTag,
            LastServicedDate: json[0].LastServicedDate,
            RentalLocationName: json[0].RentalLocationName,
            RentalAddress: json[0].RentalAddress,
            LateReturnFee: json[0].LateReturnFee,
          });
        }
      })
      .catch((reason) => {
        console.log("Failed to fetch data from server, reason is : ", reason);
      });
  }
  handleChange1 = (m1) => {
    this.setState({ m1 });
  };
  handleChange2 = (m2) => {
    this.setState({ m2 });
  };
  handleSave1 = () => {
    console.log("saved", this.state.m1.format("L LTS"));
  };
  handleSave2 = () => {
    console.log("saved2 ", this.state.m2.format("L LTS"));
    let checkHours=(moment(this.state.m2).diff(moment(this.state.m1)) / 3600000).toFixed(2);
    if(checkHours>=1.00 && checkHours <=5.00){
      this.setState({discount:98});
    }
    else if(checkHours>=6.00 && checkHours <=10.00){
      this.setState({discount:96});
    }
    else if(checkHours>=11.00 && checkHours <=15.00){
      this.setState({discount:94});
    }
    else if(checkHours>=16.00 && checkHours <=20.00){
      this.setState({discount:92});
    }
    else if(checkHours>=21.00 && checkHours <=25.00){
      this.setState({discount:90});
    }
    else if(checkHours>=26.00 && checkHours <=30.00){
      this.setState({discount:88});
    }
    else if(checkHours>=31.00 && checkHours <=35.00){
      this.setState({discount:86});
    }
    else if(checkHours>=36.00 && checkHours <=40.00){
      this.setState({discount:85});
    }
    else if(checkHours>=41.00 && checkHours <=45.00){
      this.setState({discount:84});
    }
    else if(checkHours>=46.00 && checkHours <=50.00){
      this.setState({discount:83});
    }
    else if(checkHours>=51.00 && checkHours <=55.00){
      this.setState({discount:82});
    }
    else if(checkHours>=56.00 && checkHours <=60.00){
      this.setState({discount:81});
    }
    else if(checkHours>=61.00 && checkHours <=65.00){
      this.setState({discount:80});
    }
    else if(checkHours>=66.00 && checkHours <=72.00){
      this.setState({discount:78});
    }
    if(checkHours>72.00){
      alert("Cannot book the car more than 72 hours.Requesting you to select less than 72 hours");
      this.setState({checkHrBookButton:''});
    }
    else{
      this.setState({checkHrBookButton:1});
    }
  };
  onSubmit = (amount) => {
    /*
    
*/

    const email = localStorage.getItem("email");
    const bookinDetail = {
      VehicleNumber: parseInt(this.state.carId),
      Start: this.state.m1.format("YYYY-MM-DD hh:mm:ss"),
      End: this.state.m2.format("YYYY-MM-DD hh:mm:ss"),
      UserEmailID: email,
      RentalCost: parseInt(amount),
      OneHourRental: this.state.HrRentalPrice,
      LateReturnFee: 0,
      numberOfHours: parseInt(
        (moment(this.state.m2).diff(moment(this.state.m1)) / 3600000).toFixed(2)
      ),
      VehicalCondition: this.state.VehicleCondition,
    };
    console.log("bookinDetail ",bookinDetail);
    booking(bookinDetail)
      .then((res) => {
        console.log(res);
        if(res.length>0){
          this.props.history.push({
            pathname:'/Profile',
            rentalLocation:res[0].RentalLocationName,
            modelName:this.state.VehicleModel
          })
        }
        else if(res==6){
          alert("No cars available");
        }
        else{
          alert("!!Car successfully Booked!!");
          this.props.history.push(`/CurrentBookings`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let money = moment(this.state.m2).diff(moment(this.state.m1)) / 3600000;
    let diff = money.toFixed(2);
    let amount;
    let dis;
    if(( moment(this.state.m2).diff(moment(this.state.m1)) / 3600000) < 72.00){
      
      amount = (diff * this.state.HrRentalPrice*(this.state.discount/100)).toFixed(2);
      dis=<h5>Discount applied {100-parseFloat(this.state.discount)}%</h5>
    }
    else{
      amount='Please select less than 72 hours';
    }
    
    
    return (
      <div>
        <div style={{ marginBottom: "1%" }}>You Opted to book Car:</div>
        <div class="col-md-12" className="bookdetails">
          <div class="col-md-4">
            <img
              src={`${encodeURI(this.state.VehicalPicture)}`}
              style={{ width: "100%", height: "300px" }}
            />
            <div>
              <p>Vehicle Model: {this.state.VehicleModel}</p>

              <p>Hr Rental Price:{this.state.HrRentalPrice}</p>
              <p>Vehicle Condition: {this.state.VehicleCondition}</p>
              <p>Current Mileage:{this.state.CurrentMileage}</p>

              <p>Rental Location Name:{this.state.RentalLocationName}</p>
              <p>Rental Address:{this.state.RentalAddress}</p>
            </div>
          </div>

          <div class="col-md-8 text-center" style={{paddingLeft:'10%'}}>
            <div style={{ display: "flex", marginBottom: "3%" }}>
              <div style={{ marginRight: "7%" }}>
                <h5>Pickup Time</h5>
                <InputMoment
                  moment={this.state.m1}
                  onChange={this.handleChange1}
                  minStep={5}
                  onSave={this.handleSave1}
                />
              </div>

              <div>
                <h5>Drop Time</h5>
                <InputMoment
                  moment={this.state.m2}
                  onChange={this.handleChange2}
                  minStep={5}
                  onSave={this.handleSave2}
                />
              </div>
            </div>
            <h5 style={{ marginBottom: "2%" }}>Total Price :{amount}$</h5>
            {dis}

            {this.state.checkHrBookButton ? <Button
              variant="outline-primary"
              onClick={() => this.onSubmit(amount)}
            >
              Book{" "}
            </Button> :' ' }
            
          </div>

          <div></div>
        </div>
      </div>
    );
  }
}

export default BookingCar;
