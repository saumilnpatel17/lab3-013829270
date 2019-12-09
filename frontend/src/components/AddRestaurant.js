import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import restImage from '../images/rest_default_image.jpg';
import backendURL from '../urlconfig';

//create the Owner Signup Component
class AddRestaurant extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            phone:"",
            street : "",
            city : "",
            state: "",
            zip: "",
            cuisine: "",
            message: "",
            success: false
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
    }

    //Call the Did Mount to set the auth Flag to false
    componentDidMount(){
        this.setState({
            success : false,
            name: localStorage.getItem('restaurantName'),
            zip: localStorage.getItem('restaurantZip')
        })
    }

    //Name and email change handlers to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    //submit Login handler to send a request to the node backend
    submitAdd = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            ownerId: localStorage.getItem('ownerId'),
            name: this.state.name,
            street: this.state.street,
            city : this.state.city,
            state : this.state.state,
            zip: this.state.zip,
            phone: this.state.phone,
            cuisine: this.state.cuisine
        }

        this.props.addRestaurantMutation
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
    }
    render(){
        //if Cookie is set render Owner Home Page
        let redirectVar = null;
        console.log("localStorage.getItem('restaurantName')= ", localStorage.getItem('restaurantName'))
        if(!localStorage.getItem('restaurantName') || this.state.success){
            redirectVar = <Redirect to= "/owner/login"/>
        }

        return(
            <div>
                {redirectVar}

                <Navbar/>
                
                <div className="container">
                    <form onSubmit = {this.submitAdd}>
                    <div className="signup-form">
                        <div className="main-div">
                            <div className="panel">
                            <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h2>Add Restaurant</h2>
                                <p>Add your restaurant in order to get started</p>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="text" className="form-control" 
                                name="name" placeholder="Name" value = {this.state.name}/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="number" min="1" step="1" className="form-control" name="phone" placeholder="Phone"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="text" className="form-control" name="street" placeholder="Street"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="text" className="form-control" name="city" placeholder="City"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="text" className="form-control" name="state" placeholder="State"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="number" min="1" step="1" className="form-control" 
                                name="zip" placeholder="Zip" value = {this.state.zip}/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="text" className="form-control" name="cuisine" placeholder="Cuisine"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Restaurant</button>                 
                        </div>
                    </div>
                    </form>
                    <p>Have Account? <Link to="/owner/login" >Login</Link></p>
                </div>
            </div>
            
        
        )
    }
}

export default AddRestaurant;