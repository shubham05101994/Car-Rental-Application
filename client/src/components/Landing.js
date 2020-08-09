import React, { Component } from "react";
import Footer from "./Footer";
class Landing extends Component {
  render() {
    return (
      <div className="">
        <div className="jumbotron color_back mt-4">
          <div className="col-sm-8 mx-auto">
            <h4 className="text-center">WELCOME TO</h4>
            <div>
            <h1 className="text-center name_app"><img src="flash.png" alt="Smiley face" height="42" width="42"></img>Car Rental Application</h1>
            </div>
          </div>
        </div>
        <div className="jumbotron mt-4" style={{marginLeft:'16%',marginRight:'16%'}}>
          <div className="col-sm-8 mx-auto">
            <p>**NOTE: Short Feature List:</p>
            <p className="">1. Application provides an Admin Panel</p>
            <p className="">2. New Car details are added by Admin</p>
            <p className="">3. Car details can be modified by Admin</p>
            <p className="">4. User authentication is required</p>
            <p className="">5. User Registration/Login</p>
            <p className="">6. Application verifies Driver's License</p>
            <p className="">7. 6 Months Membership (renewable)</p>
            <p className="">8. Browse and Search feature for rental location and vehicle</p>
            <p className="">9. Similar rental vehicle details are available</p>
            <p className="">10. Application provides feature for Users to Book a Car.</p>
            <p className="">11. Application provides feature to modify/Cancel existing booking.</p>
            <p className="">12. Late return fee may be applied</p>
            <p className="">13. Easy return vehicle system</p>
            <p className="">14. System is notified and updated on car return</p>
            <p className="">15. Users can provide comment on vehicle condition on return</p>
            <p className="">16. Application provides to get a Membership and terminate it.</p>
            <p className="">17. Admin can Terminate User membership in case of any issues.</p>
            <p className="">18. Membership fee is not refundable</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Landing;
