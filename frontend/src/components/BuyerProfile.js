import React,{Component} from 'react';
import backendURL from '../urlconfig';

//create the Buyer Profile Component
class BuyerProfile extends Component {
    constructor(props){
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);

        this.state = {
            message: "",
            isEditable:false,
            isNewImage: false,
            fname: "",
            lname: "",
            phone: "",
            street: "",
            unit: "",
            city: "",
            state: "",
            zip: "",
            imgURL: ""
        }
    }

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
                    phone: data.buyer.phone,
                    street: data.buyer.street,
                    unit: data.buyer.unit_no,
                    city: data.buyer.city,
                    state: data.buyer.state,
                    zip: data.buyer.zip_code
                });
            })
            .catch(err => console.log(err));

           
        }
    }
    
    //input change handler to update state variable with the text entered by the user
    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    editProfile = () => {
        this.setState({
            isEditable: true
        });
    }

    cancelEdit = () => {
        this.setState({
            isEditable: false
        });
    }

    handleFileUpload = (e) => {
        const fileField = document.querySelector('input[type="file"]');
        var output = document.getElementById('pic');
        output.src = URL.createObjectURL(fileField.files[0]);
        this.setState({
            isNewImage: true
        })
    }

    handleFileSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', document.querySelector('input[type="file"]').files[0]);
        formData.append('id', localStorage.getItem('id'));
        
        this.props.updateBuyerProfileMutation
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

    updateProfile = (e) => {
        e.preventDefault();
        const data = this.state;
        fetch(`${backendURL}/buyer/updateProfile/?id=${localStorage.getItem('id')}`, {
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
                        message: JSON.parse(data).message,
                        isEditable: false
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

    render(){
        let imageEdit = null;
        let profileEdit = null;
        let profileUpdate = null;
        
        if(this.state.isEditable){
            imageEdit = (
            <div>
                <form>
                    <div class="form-group user-image">
                        <input className = "upload-image" type="file" id="upload" onChange= {this.handleFileUpload}/>
                        <button className = "btn btn-primary btn-sm" 
                        disabled={!this.state.isNewImage} type="submit" onClick={this.handleFileSubmit}>Change Pic
                        </button>
                    </div>
                </form>
            </div>
            );
            
            profileUpdate = (
                <div className = "btn-toolbar">
                    <button type = "submit" className="btn btn-success">Update</button>
                    <button onClick = {this.cancelEdit} className="btn btn-danger">Cancel</button>
                </div>    
            );
        }else{
            profileEdit = (
                <div>
                    <button onClick = {this.editProfile} className="btn btn-primary">Edit</button>
                </div>
            );
        }
        
        return(
            <div>
                
                <div className="container">
                    <form onSubmit = {this.updateProfile}>
                    <div className="profile-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h2>Buyer Profile</h2>
                                <p>View or Update Profile</p>
                            </div>
                            <div class = "profile-image">
                                <label>Image</label>
                                <img className="rounded float-left img-thumbnail" id="pic" 
                                src={this.state.imgURL} alt="Responsive image"></img>
                            </div>
                            {imageEdit}
                            <div className="form-group form-inline">
                                <label >First Name</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="fname" placeholder="First Name"
                                value = {this.state.fname}/>
                            
                            </div>
                            <div className="form-group form-inline">
                                <label >Last Name</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="lname" placeholder="Last Name"
                                value = {this.state.lname}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Phone</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" min="1" step="1" className="form-control" name="phone" placeholder="Phone"
                                value = {this.state.phone}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Street</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="street" placeholder="Street"
                                value = {this.state.street}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Unit</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" min="1" step="1" className="form-control" name="unit" placeholder="Unit"
                                value = {this.state.unit}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >City</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="city" placeholder="City"
                                value = {this.state.city}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >State</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="state" placeholder="State"
                                value = {this.state.state}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Zip</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" min="1" step="1" className="form-control" name="zip" placeholder="Zip"
                                value = {this.state.zip}/>
                            </div>
                                {profileUpdate}   
                                {profileEdit}          
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            
        
        )
    }
}

export default BuyerProfile;