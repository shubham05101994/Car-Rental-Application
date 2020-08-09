import React, { Component } from 'react';
import { Col, Row, Card, Button, Container } from 'react-bootstrap';
import { getAllUsers, deleteUser } from "./UserFunctions";

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            userData: [],
        };
       
     this.getAllUserDetails = this.getAllUserDetails.bind(this);
     this.onDelete = this.onDelete.bind(this);
 
    }

    componentDidMount() {
        if (this.state.userData.length == 0) {
            this.getAllUserDetails()
          }
    }
    getAllUserDetails() {
        getAllUsers()
          .then(json => {
            console.log(json);
            if (!json.error) {
              this.setState({
                userData: json,
              });
            }
          })
          .catch(reason => {
            console.log("Failed to fetch data from server, reason is : ", reason);
          });
      }
    
      onDelete(email) {
        deleteUser(email)
          .then(json => {
            console.log(json);
            this.getAllUserDetails();
            alert("User Terminated Successfully");
          })
          .catch(reason => {
            console.log("Failed to fetch data from server, reason is : ", reason);
            alert(reason);
          });
      }
    render() {
      const { userData } = this.state;
        return (
            <div>
                <Container>
          
            <Row xs={1} sm={2} md={4} lg= {6} xl={6}>
            {
              userData && userData.map(value => {
                return (
                  <Col  style={{ marginTop: "20px" }} key={value.id} xs={1} sm={2} md={4} lg= {4} xl={4}>

                    <Card key={value.id} >
                      <Card.Body>
                        <h4>{value.first_name} {value.last_name}</h4>
                        <h5 style={{ marginTop: 5 }}>User Details : </h5>
                        <Card.Text>Age :  {value.age}</Card.Text>
                        <Card.Text>License ID :  {value.LicenseID}</Card.Text>
                        <Card.Text>Address :  {value.Address}</Card.Text>
                        <Card.Text>Registeration Date :  {value.RegisterationDate}</Card.Text>
                        <Card.Text>Membership Expiration Date :  {value.MembershipExpirationDate}</Card.Text>
                      </Card.Body>
                      <Card.Body>
                        <Button variant="outline-danger" onClick={e => this.onDelete(value.email)}> Terminate  </Button>
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

export default UserProfile;