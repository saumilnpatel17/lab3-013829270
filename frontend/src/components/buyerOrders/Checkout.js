import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link} from 'react-router-dom';
import Navbar from '../Navbar';
import backendURL from '../../urlconfig';

class Checkout extends Component {
     constructor(props){
        super(props);
        this.state = {
            street: "",
            unit: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            message: "",
            success: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateBuyerDetails = this.updateBuyerDetails.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }

    //get the first name of owner from backend  
    componentDidMount(){
        if(localStorage.getItem('token')){
            fetch(`${backendURL}/buyer/details/?id=${localStorage.getItem('id')}`,{
                credentials: 'include'
             })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    fname: data.buyer.fname,
                    lname: data.buyer.lname,
                    street: data.buyer.street,
                    unit: data.buyer.unit_no,
                    city: data.buyer.city,
                    state: data.buyer.state,
                    zip: data.buyer.zip_code,
                    phone: data.buyer.phone
                });
            })
            .catch(err => console.log(err));
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    updateBuyerDetails = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = this.state;
        fetch(`${backendURL}/buyer/updateAddress/?id=${localStorage.getItem('id')}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.status === 200){
                res.text().then(data => {
                    console.log(data);
                    this.setState({
                        message: JSON.parse(data).message
                    })
                });
            }else{
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data).message;
                    this.setState({
                        message: responseMessage
                    })
                });
            }
        })
        .catch(err => console.log(err));
    }

    placeOrder = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            buyerId: localStorage.getItem('id'),
            buyerAddress: `${this.state.unit}, ${this.state.street}, ${this.state.city}, ${this.state.state}, ${this.state.zip}`,
            buyerName: `${this.state.fname} ${this.state.lname}`,
            ownerId: this.props.location.state.ownerId,
            restId: this.props.location.state.restId,
            restName: this.props.location.state.restName,
            items: this.props.location.state.items,
            totalPrice: this.props.location.totalPrice
        }
        console.log("data==-=-=-=-==", data);
        fetch(`${backendURL}/buyer/placeOrder`, {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.status === 200){
                res.text().then(data => {
                    console.log(data);
                    let resdata = JSON.parse(data);
                    this.setState({
                        message: resdata.message,
                        success: resdata.success
                    });
                    localStorage.removeItem('cart');
                });
            }else{
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data).message;
                    this.setState({
                        message: responseMessage
                    })
                });
            }
        })
        .catch(err => console.log(err));
    }
    
    render(){
        let redirectVar = null;
        let fname = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/buyer/login"/>
        }
        if(!this.props.location.state){
            redirectVar = <Redirect to= "/buyer/cart"/>
        }
        if(this.state.success){
            redirectVar = <Redirect to= "/buyer/account/upcoming-orders"/>
        } else {
            fname = localStorage.getItem('fname');
        }
        return(
            <div>
                {redirectVar}
                <Navbar firstName = {fname}/>
                <div className="container">
                <form onSubmit = {this.updateBuyerDetails}>
                    <div className="buyer-checkout">
                        <div className="main-div">
                            <div className="panel">
                            <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h4>Checkout</h4>
                                <hr/>
                                <h4>Please review address and phone</h4>
                                <div style = {{display:'flex', flexWrap:'wrap'}}>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input required type="text" className="form-control" name="street" placeholder="Street"
                                        onChange = {this.handleChange} value = {this.state.street}/>
                                    </div>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input required type="text" className="form-control" name="unit" placeholder="Unit"
                                        onChange = {this.handleChange} value = {this.state.unit}/>
                                    </div>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input required type="text" className="form-control" name="city" placeholder="City"
                                        onChange = {this.handleChange} value = {this.state.city}/>
                                    </div>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input required type="text" className="form-control" name="state" placeholder="State"
                                        onChange = {this.handleChange} value = {this.state.state}/>
                                    </div>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input required type="number" min="1" step="1" className="form-control" name="zip" placeholder="Zip"
                                        onChange = {this.handleChange} value = {this.state.zip}/>
                                    </div>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input required type="number" min="1" step="1" className="form-control" name="phone" placeholder="Phone"
                                        onChange = {this.handleChange} value = {this.state.phone}/>
                                    </div>
                                </div>
                                <button type= "submit" className="btn btn-primary btn-sm">Update Address and Phone</button><hr/>
                                <button onClick = {this.placeOrder} className="btn btn-primary">Place Order</button> 
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Checkout;