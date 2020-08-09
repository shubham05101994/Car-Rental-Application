import React, { Component } from 'react';
import Cards from 'react-credit-cards';
import jwt_decode from "jwt-decode";
import {updateMembershipExpiry} from "./UserFunctions";
class MembershipRenewal extends Component {
    constructor(props) {
        super(props);
        this.state = {  cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: ''
     }
    }
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
      }
      
      handleInputChange = (e) => {
        const { name, value } = e.target;
        
        this.setState({ [name]: value });
      }
      onPayment= (e) => {
        const token = localStorage.getItem("usertoken");
        const decoded = jwt_decode(token);
        const email = decoded.email;
        const after6months = new Date();
        after6months.setDate(after6months.getDate() + 180);
        after6months.setHours(0, 0, 0, 0);
        const membershipExtension = {
            after6months:after6months,
            email:email
        }
        updateMembershipExpiry(membershipExtension)
        .then(res=>{
            if(res.status==200){
            alert("Paid Successfully");
            this.props.history.push(`/profile`);
        }
        })
        .catch(err=>{
            alert(err);
        });
      }
    render() { 
        return (
            <div>
             <div className="form-group border rounded" style={{padding:'2%',marginTop:'5%'}}>
                <h3 className="text-center">Membership</h3>
              
              <div id="PaymentForm" style={{display:'flex'}}>
                <div class="col-md-6">
                <Cards style={{width:'20%'}}
                  cvc={this.state.cvc}
                  expiry={this.state.expiry}
                  focused={this.state.focus}
                  name={this.state.name}
                  number={this.state.number}
                />
                </div>
                <div class="col-md-5">
                  <input
                    type="text"
                    name="number"
                    className="form-control form_card2"
                    placeholder="Card Number"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    maxLength="16"
                    
                    required
                  />
                  <input
                    type="text"
                    name="name"
                    className="form-control form_card2"
                    placeholder="Card Holder Name"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    maxLength="18"
                    required
                  />
                  <input
                    type="text"
                    name="expiry"
                    className="form-control form_card2"
                    placeholder="Expiry"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    maxLength="4"
                    required
                  />
                  <input
                    type="number"
                    name="cvc"
                    className="form-control form_card2"
                    placeholder="CVC"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    maxLength="3"
                    required
                  />
                </div>
              </div>
              
              <span class="label success">Renewal membership charges for 600$</span>
              <div className="text-center">
              <button type="button" class="btn btn-success" style={{marginRight:"2%"}} onClick={this.onPayment}>Payment</button>
              <button type="button" class="btn btn-danger">Cancel</button>
              </div>
              </div>
            </div>
          );
    }
}
 
export default MembershipRenewal;