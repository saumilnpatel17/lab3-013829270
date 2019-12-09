import React,{Component} from 'react';
import cookie from 'react-cookies';
import backendURL from '../urlconfig';

//create the Owner Profile Component
class OwnerProfile extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.state = {
            fname: "",
            lname: "",
            phone: "",
            restName: "",
            restZip: "",
            message: "",
            imgURL: "",
            isEditable:false,
            isNewImage: false
        }
    }
    
    componentDidMount(){
        if(localStorage.getItem('token')){
            fetch(`${backendURL}/owner/details/?id=${localStorage.getItem('id')}`,{
                credentials: 'include'
             })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    fname: data.owner.fname,
                    lname: data.owner.lname,
                    phone: data.owner.phone,
                    restName: data.owner.rest_name,
                    restZip: data.owner.rest_zip
                });
            })
            .catch(err => console.log(err));

            fetch(`${backendURL}/owner/profilePic/?id=${localStorage.getItem('id')}`,{
                credentials: 'include'
            })
            .then(res => res.blob())
            .then(resAsBlob => {
                this.setState({
                    imgURL: URL.createObjectURL(resAsBlob)
                });
            })
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
        
        this.props.updateOwnerProfileMutation
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
        fetch(`${backendURL}/owner/updateProfile/?id=${localStorage.getItem('id')}`, {
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
                                <h2>Owner Profile</h2>
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
                                <label >Restaurant Name</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="restName" placeholder="Restaurant Name"
                                value = {this.state.restName}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Restaurant Zip</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" min="1" step="1" className="form-control" name="restZip" placeholder="Restaurant Zip"
                                value = {this.state.restZip}/>
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

export default OwnerProfile;