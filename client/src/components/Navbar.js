import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./sh.css"
import { Button } from "react-bootstrap";
class Landing extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
   
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    localStorage.removeItem("logintype");

    localStorage.removeItem("email");

    this.props.history.push(`/`);
  }

  render() {

    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    const adminLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/alluserprofile" className="nav-link">
            User Profiles
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    const terminateLink = (
      <Link to="/MembershipEnd"><Button>End Membership</Button></Link>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            User
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/CurrentBookings" className="nav-link">
            Current Booking
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

   
    

    const isAdmin  =  (localStorage.email == "admin@cloud.com");
    const isLoggedIn = localStorage.usertoken != undefined;
    console.log("Isadmin ="+isAdmin);
    console.log("isLoggedin="+isLoggedIn);

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark nav_color navcolo rounded">
          <h3 style={{ color: "white" }}>CarRental</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample10"
            aria-controls="navbarsExample10"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse justify-content-md-center"
            id="navbarsExample10"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
              </Link>
              </li>
            </ul>


            {/* 
            {localStorage.email == "admin@cloud.com" ? adminLink : ""}
            {localStorage.email != "admin@cloud.com" ? userLink : ""}
            {localStorage.usertoken == undefined ? loginRegLink : "" } */}

            { isAdmin && isLoggedIn ? adminLink : ""}
            { isAdmin == false && isLoggedIn ? userLink : ""}
            { isLoggedIn ? "" : loginRegLink}
 
            {/* {localStorage.usertoken ? userLink : loginRegLink}
 */}
          </div>
          {localStorage.email != "admin@cloud.com" && localStorage.usertoken ? terminateLink : ""}

        </nav>

      </div>

    );
  }
}

export default withRouter(Landing);
