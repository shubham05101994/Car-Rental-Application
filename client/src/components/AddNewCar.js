import React, { Component } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { addCarDetails, uploadFile } from "./UserFunctions";

class AddNewCar extends Component {
    constructor() {
        super();
        this.state = {
            newCar: {},
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
            LateReturnFee: "",
            files: [],
            result: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.updateYear = this.updateYear.bind(this);
        this.updateType = this.updateType.bind(this);
        this.updateCapacity = this.updateCapacity.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateCondition = this.updateCondition.bind(this);
        this.updateMileage = this.updateMileage.bind(this);
        this.updateTag = this.updateTag.bind(this);
        this.updateLastServicedDate = this.updateLastServicedDate.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.updateLateFees = this.updateLateFees.bind(this);
    }

    componentDidMount() {

    }
    onSubmit() {
        this.uploadFile();
        addCarDetails(this.state.newCar)
            .then(json => {
                console.log(json);
                alert("Car Details Added Successfully");
            })
            .catch(reason => {
                console.log("Failed to podt data to server, reason is : ", reason);
                alert(reason);
            });

    }
    updateModel(event) {
        var newCar = this.state.newCar;
        newCar.VehicleModel = event.target.value
        //newCar.VehicalPicture = event.target.value + ".jpg"
        //newCar["VehicleModel"] = event.target.value
        this.setState({
            VehicleModel: event.target.value,
            newCar: newCar
        })
    }
    updateYear(event) {
        var newCar = this.state.newCar;
        newCar["VehicleYear"] = event.target.value
        this.setState({
            VehicleYear: event.target.value,
            newCar: newCar
        })
    }
    updateType(event) {
        var newCar = this.state.newCar;
        newCar["VehicalType"] = event.target.value
        this.setState({
            VehicalType: event.target.value,
            newCar: newCar
        })
    }
    updateCapacity(event) {
        var newCar = this.state.newCar;
        newCar["RentalVehicalCapacity"] = event.target.value
        this.setState({
            RentalVehicalCapacity: event.target.value,
            newCar: newCar
        })
    }
    updatePrice(event) {
        var newCar = this.state.newCar;
        newCar["HrRentalPrice"] = event.target.value
        this.setState({
            HrRentalPrice: event.target.value,
            newCar: newCar
        })
    }
    updateCondition(event) {
        var newCar = this.state.newCar;
        newCar["VehicleCondition"] = event.target.value
        this.setState({
            VehicleCondition: event.target.value,
            newCar: newCar
        })
    }
    updateMileage(event) {
        var newCar = this.state.newCar;
        newCar["CurrentMileage"] = event.target.value
        this.setState({
            CurrentMileage: event.target.value,
            newCar: newCar
        })
    }
    updateTag(event) {
        var newCar = this.state.newCar;
        newCar["RegistrationTag"] = event.target.value
        this.setState({
            RegistrationTag: event.target.value,
            newCar: newCar
        })
    }
    updateLastServicedDate(event) {
        var newCar = this.state.newCar;
        newCar["LastServicedDate"] = event.target.value
        this.setState({
            LastServicedDate: event.target.value,
            newCar: newCar
        })
    }
    updateLocation(event) {
        var newCar = this.state.newCar;
        newCar["RentalLocationName"] = event.target.value
        this.setState({
            RentalLocationName: event.target.value,
            newCar: newCar
        })
    }
    updateAddress(event) {
        var newCar = this.state.newCar;
        newCar["RentalAddress"] = event.target.value
        console.log(this.state.newCar)
        this.setState({
            RentalAddress: event.target.value,
            newCar: newCar
        })
    }
    updateLateFees(event){
        var newCar = this.state.newCar;
        newCar["LateReturnFee"] = event.target.value
        console.log(this.state.newCar)
        this.setState({
            LateReturnFee: event.target.value,
            newCar: newCar
        })
    }
    uploadFile() {

        const files = this.state.files;
        if (files.length > 0) {
            var newCar = this.state.newCar;
            newCar.VehicalPicture = files[0].name
            this.setState({
                newCar: newCar
            })
            uploadFile(files[0])
                .then(json => {
                    console.log(json);
                    this.setState({
                        result: "File Uploaded successfully"
                    });
                })
                .catch(reason => {
                    console.log(reason);
                });
        }
    }

    render() {
        return (
            <div>
                <div style={{ margin: "20px", marginLeft: 5}}>
                    <Link to="/admin"><FaArrowLeft style={{ fontStyle: "Bold", color: "blue", marginRight:10}}/> Go Back</Link>
                </div>

                <Card>
                    <Card.Body>

                        <Form>
                            <Form.Group controlId="model">
                                <Form.Label>Vehicle Model</Form.Label>
                                <Form.Control type="text" placeholder="Enter Vehicle Model" value={this.state.VehicleModel} onChange={this.updateModel} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Vehicle Model.
                                        </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="year">
                                <Form.Label>Vehicle Year</Form.Label>
                                <Form.Control type="number" placeholder="Enter Vehicle Year" value={this.state.VehicleYear} onChange={this.updateYear} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Vehicle Year.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="type">
                                <Form.Label>Vehicle Type</Form.Label>
                                <Form.Control type="text" placeholder="Enter Vehicle Type" value={this.state.VehicalType} onChange={this.updateType} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Vehicle Type.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="capacity">
                                <Form.Label>Rental Vehicle Capacity</Form.Label>
                                <Form.Control type="number" placeholder="Enter Vehicle capacity" value={this.state.RentalVehicalCapacity} onChange={this.updateCapacity} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Vehicle capacity.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Hourly Rental Price($)</Form.Label>
                                <Form.Control type="number" placeholder="Enter Hr Rental Price" value={this.state.HrRentalPrice} onChange={this.updatePrice} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Hr Rental Price.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="condition">
                                <Form.Label>Vehicle Condition</Form.Label>
                                <Form.Control type="text" placeholder="Enter Vehicle Condition" value={this.state.VehicleCondition} onChange={this.updateCondition} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Vehicle Condition.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="mileage">
                                <Form.Label>Current Mileage(mpg)</Form.Label>
                                <Form.Control type="number" placeholder="Enter Current Mileage" value={this.state.CurrentMileage} onChange={this.updateMileage} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Current Mileage.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="tag">
                                <Form.Label>Registration Tag</Form.Label>
                                <Form.Control type="text" placeholder="Enter Registration Tag" value={this.state.RegistrationTag} onChange={this.updateTag} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Registration Tag.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="serviceDate">
                                <Form.Label>Last Service Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter Last Service Date" value={this.state.LastServicedDate} onChange={this.updateLastServicedDate} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Last Service Date.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.Label>Rental Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter Rental Location" value={this.state.RentalLocationName} onChange={this.updateLocation} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Rental Location.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Rental Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter Rental Address" value={this.state.RentalAddress} onChange={this.updateAddress} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Rental Address.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="lateFees">
                                <Form.Label>Late Return Fees($)</Form.Label>
                                <Form.Control type="number" placeholder="Enter Late Return Fees" value={this.state.LateReturnFee} onChange={this.updateLateFees} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Late Return Fees.
                                        </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="image">
                                <Form.Label>Upload Car Image: </Form.Label>
                                <input type="file" style={{ "marginLeft": "20px" }} onChange={e => this.setState({
                                    files: e.target.files
                                })}>
                                </input>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={this.onSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

            </div>
        );
    }
}

export default AddNewCar;