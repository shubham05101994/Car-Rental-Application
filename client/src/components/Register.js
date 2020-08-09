import React, { Component } from "react";
import { register } from "./UserFunctions";
import {checkLicense} from "./UserFunctions";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./sh.css";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      age: "",
      LicenseID: "",
      Address: "",
      CardPayment: "",
      email: "",
      password: "",
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
      membershipDivActive:"",
      errors: {},
      regexp: /^[0-9\b]+$/
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.onLicenseVerify = this.onLicenseVerify.bind(this);
    this.onLicenseChange = this.onLicenseChange.bind(this);
    this.handleExpiryInputChange = this.handleExpiryInputChange.bind(this);
    this.handlecvcInputChange = this.handlecvcInputChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onLicenseChange(e){
      let LicenseID = e.target.value;
      if (LicenseID === '' || this.state.regexp.test(LicenseID)) {
        this.setState({ [e.target.name]: LicenseID })
      }
      else{
        alert("Only 8 digit number is allowed");
      }
  }

  handleExpiryInputChange(e){
    let expiry = e.target.value;
      if (expiry === '' || this.state.regexp.test(expiry)) {
        this.setState({ [e.target.name]: expiry })
      }
      else{
        alert("Only numeric value allowed");
      }
  }

  handlecvcInputChange(e){
    let cvc = e.target.value;
      if (cvc === '' || this.state.regexp.test(cvc)) {
        this.setState({ [e.target.name]: cvc })
      }
      else{
        alert("Only 3 digits number is allowed");
      }
  }

  handleInputFocus(e) {
    this.setState({ focus: e.target.name });
  }

  handleInputChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }
  onLicenseVerify(){
    const licenseDetails={
      LicenseID:this.state.LicenseID,
      first_name:this.state.first_name
    }
    checkLicense(licenseDetails)
    .then(res=>{
      if(res){
        this.setState({ membershipDivActive:1 });
      }
      else{
        alert("License Verification Failure!!!!");
      }
      
    })
    .catch(err=>{
        alert(err);
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const after6months = new Date();
    after6months.setDate(after6months.getDate() + 180);
    after6months.setHours(0, 0, 0, 0);
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      age: this.state.age,
      LicenseID: this.state.LicenseID,
      Address: this.state.Address,
      RegisterationDate: today,
      MembershipExpirationDate: after6months,
      CardPayment: this.state.number,
      email: this.state.email,
      password: this.state.password
    };

    register(newUser).then(res => {
      alert("Registered Successfully!!");
      this.props.history.push(`/login`);
    });
  }

  render() {
    const membershipDiv = (
      <div>
        <div className="form-group border rounded" style={{ padding: "2%" }}>
          <h3>Membership</h3>
          <span class="label success">Membership charges 600$</span>
          <div id="PaymentForm" style={{ display: "flex" }}>
            <Cards
              cvc={this.state.cvc}
              expiry={this.state.expiry}
              focused={this.state.focus}
              name={this.state.name}
              number={this.state.number}
            />
            <div>
              <input
                type="text"
                name="number"
                className="form-control form_card1"
                placeholder="Card Number"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                maxLength="16"
                required
              />
              <input
                type="text"
                name="name"
                className="form-control form_card1"
                placeholder="Card Holder Name"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                maxLength="18"
                required
              />
              <input
                type="text"
                name="expiry"
                className="form-control form_card1"
                placeholder="Expiry"
                value={this.state.expiry}
                onChange={this.handleExpiryInputChange}
                onFocus={this.handleInputFocus}
                maxLength="4"
                required
              />
              <input
                type="text"
                name="cvc"
                className="form-control form_card1"
                placeholder="CVC"
                value={this.state.cvc}
                onChange={this.handlecvcInputChange}
                onFocus={this.handleInputFocus}
                maxLength="3"
                required
              />
            </div>
          </div>
          {/* <span class="label success">Compulsory to be purchased</span> */}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-lg btn-primary btn-block">
          Register!
        </button>
      </div>
    );
    const verifyButton=(
      <button type="button" class="btn btn-primary" onClick={this.onLicenseVerify}>Verify</button>
    );
    return (
      <div className="container" style={{ marginBottom: "5%" }}>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter your lastname name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  placeholder="Enter your Age"
                  value={this.state.age}
                  onChange={this.onChange}
                  maxLength="2"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">LicenseID</label>
                <input
                  type="text"
                  className="form-control"
                  name="LicenseID"
                  placeholder="Enter your LicenseID"
                  value={this.state.LicenseID}
                  onChange={this.onLicenseChange}
                  maxLength="8"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="Address"
                  placeholder="Enter your Address"
                  value={this.state.Address}
                  onChange={this.onChange}
                  required
                />
              </div>
              
              {this.state.membershipDivActive ? membershipDiv : verifyButton}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

