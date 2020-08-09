import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import MembershipRenewal from "./components/MembershipRenewal";
import Admin from "./components/Admin";
import AddNewCar from "./components/AddNewCar";
import UpdateCarDetails from "./components/UpdateCarDetails";
import UserProfile from "./components/UserProfile";
import BookingCar from "./components/BookingCar";
import EndMembership from "./components/EndMembership";
import CurrentBookings from "./components/CurrentBookings";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/membershiprenewal" component={MembershipRenewal} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/alluserprofile" component={UserProfile} />
            <Route exact path="/addnewCar" component={AddNewCar} />
            <Route exact path="/updateCarDetails/:id" component={UpdateCarDetails} />
            <Route exact path="/BookingCar/:id" component={BookingCar} />
            <Route exact path="/MembershipEnd/" component={EndMembership} />
            <Route exact path="/CurrentBookings/" component={CurrentBookings} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
