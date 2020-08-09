import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { membershipCheck } from "./UserFunctions";
import { getAllCarDetails, searchCar } from "./UserFunctions";
import { Col, Row, Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./sh.css";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carModel: "",
      location: "",
      first_name: "",
      last_name: "",
      email: "",
      carData: [],
      isOpen: false,
      propsLocation:props.location.rentalLocation,
      propsModelName:props.location.modelName
      
    };
    this.getAllCarDetailsMain = this.getAllCarDetailsMain.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateCarModel = this.updateCarModel.bind(this);
    //this.onBook = this.onBook.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }


  componentDidMount() {
    console.log(this.state.propsLocation);
    console.log(this.state.propsModelName);
    const token = localStorage.getItem("usertoken");
    const decoded = jwt_decode(token);
    const email = decoded.email;
    const first_name = decoded.first_name;
    const last_name = decoded.last_name;

    this.setState({
      first_name: first_name,
      last_name: last_name,
      email: email
    });
    membershipCheck(email)
      .then(res => {

        const membershipExpiration = new Date(res.data.MembershipExpirationDate);
        console.log(membershipExpiration);
        membershipExpiration.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (today > membershipExpiration) {
          this.props.history.push(`/membershiprenewal`);
        }

      })
      .catch(err => {
        alert(err);
      });
    //let temp=this.state.propsLocation.newLocation;
    //console.log(temp);
    if(this.state.propsLocation || this.state.propsModelName){
      this.onSearch(this.state.propsLocation,this.state.propsModelName)
    }
    else{
      this.getAllCarDetailsMain()
    }
    /* if (this.state.carData.length == 0) {
      this.getAllCarDetailsMain()
    }*/

  }
  
  getAllCarDetailsMain() {
    getAllCarDetails()
      .then(json => {
        console.log(json);
        if (!json.error) {
          this.setState({
            carData: json,
          });
        }
      })
      .catch(reason => {
        console.log("Failed to fetch data from server, reason is : ", reason);
      });
  }
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    //onClick={() => this.onBook(value.VehicleNumber)}
  }
  onBook=(VehicleNumber)=> {
    console.log("Book",VehicleNumber);
  }
  updateLocation(event) {
    this.setState({
      location: event.target.value
    })
  }
  updateCarModel(event) {
    this.setState({
      carModel: event.target.value
    })
  }
  onSearch(...a) {
    /*if(a){
      alert("As the Car is not available at specified location showing results for different location");
    }*/
    console.log('search ',a[0],a[1]);
    const location= this.state.location?this.state.location:a[0]
    const modelName=this.state.carModel?this.state.carModel:a[1]
    searchCar(modelName, location)
      .then(json => {
        console.log(json);
        if (Array.isArray(json)) {
          this.setState({
            carData: json,
          });
        }
      })
      .catch(reason => {
        console.log("Failed to fetch data from server, reason is : ", reason);
      });
  }
  render() {
    const { carData } = this.state;
    return (
      <div>
        <div className="container" style={{ marginTop: 15 }}>
          Welcome {this.state.first_name} {this.state.last_name}
        </div>
        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
          Here's some content for the modal
        </Modal>
        <section className="search-sec" style={{ margin: 15 }}>
          <div className="container">
            <form action="#" method="post" noValidate="novalidate">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-5 col-md-3 col-sm-12 p-0">
                      <input type="text" className="form-control search-slt" placeholder="Find Car Model" value={this.state.carModel} onChange={this.updateCarModel} />
                    </div>
                    <div className="col-lg-5 col-md-3 col-sm-12 p-0">
                      <input type="text" className="form-control search-slt" placeholder="Enter Location" value={this.state.location} onChange={this.updateLocation} />
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-12 p-0">
                      <button type="button" className="btn btn-danger wrn-btn" onClick={()=>this.onSearch()}>Search</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
        <Container>
          <Row xs={1} sm={2} md={4} lg={6} xl={6}>
            {
              carData && carData.map(value => {
                //const UpdateCarDetailsURL = `/updateCarDetails/${value.VehicleNumber}`;
                const bookingCar = `/BookingCar/${value.VehicleNumber}`;
                
                return (
                  <Col style={{ marginTop: "15px" }} key={value.VehicleNumber} xs={1} sm={2} md={4} lg={6} xl={6}>

                    <Card key={value.VehicleNumber} >
                      <Card.Img variant="top" src={`${encodeURI(value.VehicalPicture)}`} style={{ height: "300px" }} />
                      <Card.Body>
                        <h4>{value.VehicleModel} ({value.VehicleYear})</h4>
                        <Card.Subtitle className="mb-2 text-muted">{value.VehicalType}</Card.Subtitle>
                        <h5 style={{ marginTop: 5 }}>Vehicle Details : </h5>
                        <Card.Text>Vehicle Capacity :  {value.RentalVehicalCapacity}</Card.Text>
                        <Card.Text>Rental Price per hour :  {value.HrRentalPrice}</Card.Text>
                        <Card.Text>Vehicle Condition :  {value.VehicleCondition}</Card.Text>
                        <Card.Text>Current Mileage :  {value.CurrentMileage}</Card.Text>
                        <Card.Text>Registration Tag :  {value.RegistrationTag}</Card.Text>
                        <Card.Text>Last Service Date :  {value.LastServicedDate}</Card.Text>
                        <Card.Text>Rental Location :  {value.RentalLocationName}</Card.Text>
                        <Card.Text>Rental Address :  {value.RentalAddress}</Card.Text>
                      </Card.Body>
                      <Card.Body>
                        
                          <Link to={bookingCar}><Button variant="outline-primary">Book </Button></Link> 
                      </Card.Body>

                    </Card>


                  </Col>
                )
              })
            }

          </Row>
        </Container>
      </div>

    );
  }
}

export default Profile;
