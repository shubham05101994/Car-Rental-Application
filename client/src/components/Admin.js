import React, { Component } from "react";
import { Col, Row, Card, Button, Container } from 'react-bootstrap';
import { getAllCarDetails } from "./UserFunctions";
import { deleteCarDetails } from "./UserFunctions";
import { FaPlus } from "react-icons/fa";

import "./sh.css";
import { Link } from 'react-router-dom';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      allretuenfiles: [],
      carData: [],
      count: ""
    };
    this.getAllCarDetailsMain = this.getAllCarDetailsMain.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.carData.length == 0) {
      this.getAllCarDetailsMain()
    }
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

  onDelete(key) {
    deleteCarDetails(key)
      .then(json => {
        console.log(json);
        this.getAllCarDetailsMain();
        alert("Car Entry Deleted Successfully");
      })
      .catch(reason => {
        console.log("Failed to fetch data from server, reason is : ", reason);
        alert(reason);
      });
  }

  render() {
    const { carData } = this.state;
    return (
      <div>
        <Container>
          <Row style={{ display: "block" }}>
            <Col style={{ marginTop: "20px" }}>
              {
                <Card>
                  <Card.Body>
                    <Link to="/addnewCar"><FaPlus style={{ fontStyle: "Bold", color: "blue", marginRight:10}}/>Register New Car</Link>
                  </Card.Body>
                </Card>
              }
            </Col>
            </Row>
            <Row xs={1} sm={2} md={4} lg= {6} xl={6}>
            {
              carData && carData.map(value => {
                const UpdateCarDetailsURL = `/updateCarDetails/${value.VehicleNumber}`
                return (
                  <Col style={{ marginTop: "20px" }} key={value.VehicleNumber} xs={1} sm={2} md={4} lg= {6} xl={6}>

                    <Card key={value.VehicleNumber} >
                      <Card.Img variant="top" src={`${encodeURI(value.VehicalPicture)}`} style={{ height: "300px" }}/>
                      <Card.Body style={{ marginLeft: "10px" }}>
                        <h4>{value.VehicleModel} ({value.VehicleYear})</h4>
                        <Card.Subtitle className="mb-2 text-muted">{value.VehicalType}</Card.Subtitle>
                        <h5 style={{ marginTop: 5 }}>Vehicle Details : </h5>
                        <Card.Text>Vehicle Capacity :  {value.RentalVehicalCapacity}</Card.Text>
                        <Card.Text>Rental Price per hour :  {value.HrRentalPrice} $</Card.Text>
                        <Card.Text>Vehicle Condition :  {value.VehicleCondition}</Card.Text>
                        <Card.Text>Current Mileage :  {value.CurrentMileage} mpg</Card.Text>
                        <Card.Text>Registration Tag :  {value.RegistrationTag}</Card.Text>
                        <Card.Text>Last Service Date :  {value.LastServicedDate}</Card.Text>
                        <Card.Text>Rental Location :  {value.RentalLocationName}</Card.Text>
                        <Card.Text>Rental Address :  {value.RentalAddress}</Card.Text>
                        <Card.Text>Late Return Fees :  {value.LateReturnFee} $</Card.Text>
                      </Card.Body>
                      <Card.Body>
                        <Button variant="outline-danger" onClick={e => this.onDelete(value.VehicleNumber)}> Delete </Button>
                        <Link to={UpdateCarDetailsURL}><Button variant="outline-primary" style={{ marginLeft: "30px" }}>Update </Button></Link>
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

export default Admin;
