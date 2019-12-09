import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import backendURL from '../urlconfig';

//graphQL
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { withApollo } from "react-apollo";
import { signUpBuyerMutation } from '../queries/queries';

//create the Navbar Component
class BuyerSignup extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstName : "",
            lastName : "",
            email : "",
            password: "",
            message: "",
            success: false
        }
        //Bind the handlers to this class
        this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
        this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }

    //Call the Did Mount to set the auth Flag to false
    componentDidMount(){
        this.setState({
            success : false
        })
    }

    //Name and email change handlers to update state variable with the text entered by the user
    fnameChangeHandler = (e) => {
        this.setState({
            firstName : e.target.value
        })
    }
    lnameChangeHandler = (e) => {
        this.setState({
            lastName : e.target.value
        })
    }
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitSignup = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();

        this.props.signUpBuyerMutation
            ({
                variables: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(response => {
                console.log("Response", response);

                if(response.data.signUpBuyer.success){
                    this.setState({
                        success: true
                    });
                }
            })
        // fetch(`${backendURL}/buyer/signup`, {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json,  text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify(data)
        // })
        // .then(res => {
        //     console.log(res);
        //     if(res.status === 200){
        //         res.text().then(data => { 
        //             console.log(data);
        //             this.setState({
        //                 success : true
        //             });

        //         });
        //     }else{
        //         res.text().then(data => {
        //             console.log(data);
        //             let responseMessage = JSON.parse(data);
        //             this.setState({
        //                 success : false,
        //                 message: responseMessage.message
        //             });
        //         });
                
        //     }
        // })
        // .catch(err => console.log(err));
    }
    render(){
        //if Cookie is set render Buyer Home Page
        let redirectVar = null;
        // if(localStorage.getItem('token')){
        //     redirectVar = <Redirect to= "/buyer/home"/>
        // }
        if(this.state.success){
            redirectVar = <Redirect to= "/buyer/login"/>
        }
        return(
            <div>
                {redirectVar}

                <Navbar/>
                
                <div className="container">
                <form onSubmit = {this.submitSignup} >
                    <div className="signup-form">
                        <div className="main-div">
                            <div className="panel">
                            <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h2>Buyer Signup</h2>
                                <p>Create your account</p>
                            </div>
                            
                            <div className="form-group">
                                <input required onChange = {this.fnameChangeHandler} type="text" className="form-control" name="fname" placeholder="First Name"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.lnameChangeHandler} type="text" className="form-control" name="lname" placeholder="Last Name"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.emailChangeHandler} type="email" className="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button type= "submit" className="btn btn-primary">Create Account</button>
                            <p>Have Account? <Link to="/buyer/login" >Login</Link></p>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            
        
        )
    }
}

export default graphql(signUpBuyerMutation, { name: "signUpBuyerMutation" })(BuyerSignup);