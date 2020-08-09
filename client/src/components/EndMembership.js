import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Col, Row, Card, Button, Container } from "react-bootstrap";
import { terminate } from "./UserFunctions";
class EndMembership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      RegisterationDate: "",
      MembershipExpirationDate: "",
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("usertoken");
    const decoded = jwt_decode(token);
    console.log("decoded", decoded);
    this.setState({
      id: decoded.id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      RegisterationDate: decoded.RegisterationDate,
      MembershipExpirationDate: decoded.MembershipExpirationDate,
    });
  }
  terminateMembership = () => {
    terminate(this.state.id)
      .then((res) => {
        if (res == 200) {
          alert("Your Membership is successfully Terminated");
          localStorage.removeItem("usertoken");
          localStorage.removeItem("logintype");
          localStorage.removeItem("email");
          this.props.history.push(`/`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="text-center">
        <h3>We feel so bad letting you go!!</h3>
        <h3>!!Do you really want to terminate the Membership!!</h3>
        <div>
          <div>
            <h2>Details of Membership</h2>
          </div>
          <ul
            class="col-md-5"
            style={{ margin: "auto", marginTop: "5%", marginBottom: "5%" }}
          >
            <li class="list-group-item">First Name: {this.state.first_name}</li>
            <li class="list-group-item"> Last Name: {this.state.last_name}</li>
            <li class="list-group-item">
              Registeration Date: {this.state.RegisterationDate}
            </li>
            <li class="list-group-item">
              {" "}
              Membership Expiration Date: {this.state.MembershipExpirationDate}
            </li>
          </ul>
          <Button variant="danger" onClick={this.terminateMembership}>
            Terminate
          </Button>
        </div>
      </div>
    );
  }
}

export default EndMembership;
