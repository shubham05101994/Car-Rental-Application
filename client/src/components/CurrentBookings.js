import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { getCurrentBooking, cancelAfter, cancelWithin, returnCar, returnCarLate } from "./UserFunctions";
import { Button } from "react-bootstrap";


class CurrentBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBooking: [],
      today: moment().format("MM DD YYYY, hh:mm:ss a"),
      comment: ''
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("usertoken");
    const decoded = jwt_decode(token);
    const email = decoded.email;
    console.log("today ",this.state.today._d);
    getCurrentBooking(email)
      .then((res) => {
        console.log('resssss',res);
        if (res) {
          this.setState({ currentBooking: res.data });
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  cancelBooking = (BookingID, Start, oneHourRentalFee) => {
    //alert(BookingID +' '+Start);
    console.log(this.state.today);
    var CurrentDate = moment().format("MM DD YYYY, hh:mm:ss a");
    let time = moment.duration("01:00:00");
    let date = moment(Start);
    date.subtract(time);
    //alert(date.format('MM DD YYYY, h:mm:ss a'));
    //alert(date);
    if (CurrentDate < date._i) {
      //alert("No fees");
      cancelWithin(BookingID)
        .then((res) => {
          alert('Great you have successfully cancelled you Booking fo ID ' + BookingID);
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    }
    else {
      cancelAfter(BookingID, oneHourRentalFee)
        .then((res) => {

          alert('You have charged ' + oneHourRentalFee + '.00$');
          window.location.reload();
          //console.log("after so should add the one hour fees ", res);
        }).catch((err) => {
          alert(err);
        });
    }
  };
  onChange = (e) => {
    let comment = e.target.value;
    this.setState({ comment: comment })
  }
  returnCar = (BookingID, End, OneHourRental) => {
    let current = moment().format("MM DD YYYY, hh:mm:ss a");
    let End1 = moment(End).utc().format("MM DD YYYY, hh:mm:ss a")
    if (current > End1) {
      let money = moment(current).diff(moment(End1)) / 3600000;
      let lateFees = money.toFixed(2) * OneHourRental;
      alert("You have been charged additional late return fee of " + lateFees.toFixed(2) + '$');
      returnCarLate(BookingID, this.state.comment, lateFees)
        .then(res => {
          if (res.affectedRows == 1) {
            alert("Thank you for using for service");
            window.location.reload();
          }
        })
        .catch(err => {
          alert(err);
        });
    }
    else {
      returnCar(BookingID, this.state.comment)
        .then(res => {
          if (res.affectedRows == 1) {
            alert("Thank you for using for service");
            window.location.reload();
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  };
  
  render() {
    let current;
    if (this.state.currentBooking.length > 0) {
      current = this.state.currentBooking.map((response) => (
        <div
          class="col-md-3 card text-white bg-info mb-3 mr-3"
          style={{ maxWidthidth: "18rem", display: "inline-flex", maxheight: '360px',minHeight:'265px' }}
        >
          <div class="card-body">
            <p class="card-text">Booking ID: {response.BookingID}</p>
            <p class="card-text">
              Start:{moment(response.Start).utc().format("MMMM Do YYYY, hh:mm:ss")}
            </p>
            <p class="card-text">
              {" "}
              End: {moment(response.End).utc().format("MMMM Do YYYY, hh:mm:ss")}
            </p>
            <p class="card-text">User Email ID: {response.UserEmailID}</p>
            <p class="card-text">Rental Cost: {response.RentalCost}</p>
            <p class="card-text">
              OneHourRental Cost: {response.OneHourRental}
            </p>
          </div>
          <div className="text-center mb-2">
            {this.state.today < moment(response.Start).utc().format("MM DD YYYY, hh:mm:ss a")
              ? (<Button
                class=""
                variant="danger mr-2"
                onClick={() =>
                  this.cancelBooking(
                    response.BookingID,
                    moment(response.Start).format("MM DD YYYY, hh:mm:ss"),
                    response.OneHourRental
                  )
                }
              >
                Cancel Booking
              </Button>)
              : (<div>
                <div class="form-group">
                  <label for="comment">Comment:</label>
                  <textarea class="form-control" rows="5" id="comment" onChange={this.onChange}></textarea>
                </div>
                <Button
                  variant="danger"
                  onClick={() => this.returnCar(response.BookingID,
                    moment(response.End).format("MM DD YYYY, hh:mm:ss a"),
                    response.OneHourRental
                  )}
                >
                  Return Car
            </Button>
              </div>)
            }
          </div>
        </div>
      ));
    } else {
      current = (
        <div class="text-center">
          <h1>No current Bookings</h1>
        </div>
      );
    }
    return (
      <div>
        <h4 class="mb-3 mt-3">Current Bookings</h4>
        <div class="">{current}</div>
        
      </div>
    );
  }
}

export default CurrentBookings;
