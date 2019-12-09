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
import { loginBuyerQuery } from '../queries/queries';

//create the Navbar Component
class BuyerLogin extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            message: "",
            fname: ""
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    //Call the Will Mount to set the auth Flag to false
    componentDidMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
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
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }

        this.props.client
            .query({
                query: loginBuyerQuery,
                variables: {
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(response => {
                console.log("Response: ", response);
                if(response.data.buyerLogin.success){
                    localStorage.setItem('id', response.data.buyerLogin.buyerId);
                    localStorage.setItem('fname',response.data.buyerLogin.buyerData.firstName);
                    this.setState({
                        authFlag: true,
                        fname: response.data.buyerLogin.buyerData.firstName
                    })
                }
            })
        // fetch(`${backendURL}/buyer/login`, {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json,  text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify(data)
        // })
        // .then(res => {
        //     if(res.status === 200){
        //         localStorage.setItem('userType','buyer');
        //         res.text().then(data => {
        //             console.log(data);
        //             localStorage.setItem('id',JSON.parse(data).id);
        //             localStorage.setItem('fname',JSON.parse(data).firstName);
        //             localStorage.setItem('token',JSON.parse(data).token);
        //             this.setState({
        //                 authFlag : true,
        //                 fname: JSON.parse(data).firstName
        //             });
        //         });
        //     }else{
        //         res.text().then(data => {
        //             console.log(data);
        //             let responseMessage = JSON.parse(data).message;
        //             this.setState({
        //                 authFlag : false,
        //                 message: responseMessage
        //             })
        //         })
                
        //     }
        // })
        // .catch(err => console.log(err));
    }
    render(){
        //if Cookie is set render Buyer Home Page
        let redirectVar = null;
        if(this.state.authFlag){
            redirectVar = <Redirect to= {{ pathname: "/buyer/home", fname: this.state.fname}}/>
        }
        return(
            <div>
                {redirectVar}

                <Navbar/>
                
                <div className="container">
                    <form onSubmit = {this.submitLogin}>
                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h2>Buyer Login</h2>
                                <p>Sign in with your Grubhub Account</p>
                            </div>
                            
                            <div className="form-group">
                                <input required onChange = {this.emailChangeHandler} type="email" className="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                            <p><Link to="/buyer/signup">Create Account</Link></p>            
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            
        
        )
    }
}

export default withApollo(BuyerLogin);