import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import menuImage from '../../images/menu_default_image.png'
import backendURL from '../../urlconfig';

class MenuAddForm extends Component {
     constructor(props){
        super(props);
        
        this.state = {
            // sections: [],
            name: "",
            description: "",
            price: "",
            section: "",
            message: "",
            isNewImage: false
        }
        //Bind the handlers to this class
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
    }

    //input change handler to update state variable with the text entered by the user
    changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleFileUpload = (e) => {
        const fileField = document.querySelector('input[type="file"]');
        var output = document.getElementById('pic');
        output.src = URL.createObjectURL(fileField.files[0]);
        this.setState({
            isNewImage: true
        })
    }

    postMenuData = (data,successcb) => {
        this.props.addMenuMutation
            ({
                variables: {
                    name: this.state.name,
                    description: this.state.description,
                    price: this.state.price,
                    section: this.state.section
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

    //submit Login handler to send a request to the node backend
    submitAdd = (e) => {
        //prevent page from refresh
        e.preventDefault();

        let section = this.props.sections.find(section => section.name === this.state.section);
        const data = {
            ownerId: localStorage.getItem('id'),
            sectionId: section.id,
            name : this.state.name,
            description: this.state.description,
            price: this.state.price
        }

        this.postMenuData(data, (success, menuId, sectionId) => {
            if(this.state.isNewImage){
                const formData = new FormData();
                formData.append('image', document.querySelector('input[type="file"]').files[0]);
                formData.append('menuId', menuId);
                formData.append('sectionId', sectionId);
                formData.append('ownerId', localStorage.getItem('id'));
                
                fetch(`${backendURL}/upload/menu-image`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                })
                .then(res => {
                    res.text().then(data => {
                        console.log(data);
                        this.setState({
                            message: JSON.parse(data).message + " " + success
                        })
                    });
                })
            }
        });
    }

    render(){
        return(
            <div>
                <div className="container">
                <form onSubmit = {this.submitAdd} >
                    <div className="add-menu-form">
                        <div className="main-div">
                            <div className="panel">
                            <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h4>Add Menu</h4>
                                <hr/>
                                <div style={{display:'flex'}}>
                                    <div class = "menu-image">
                                        <label>Image</label>
                                        <img className="rounded float-left img-thumbnail" id="pic" 
                                         src = {menuImage} alt="Responsive image"></img>
                                         <div class="form-group user-image">
                                            <input className = "upload-image" type="file" id="upload" onChange= {this.handleFileUpload}/>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{display:'flex', paddingBottom:'10px', paddingLeft:'100px'}}>
                                            <input required type="text" class="form-control name-input" onChange = {this.changeHandler}
                                            name="name" placeholder="Name"/>
                                            <input required type="text" class="form-control price-input" onChange = {this.changeHandler}
                                            name="price" placeholder="Price"/>
                                        </div>
                                        <div style={{display:'flex', paddingBottom:'10px', paddingLeft:'100px'}}>
                                            <textarea class="form-control desc-textarea" rows="3" name="description" onChange = {this.changeHandler}
                                            placeholder="Enter description of menu here"/>
                                            <div class="form-group">
                                                <select class="form-control" name="section" onChange = {this.changeHandler}>
                                                    <option selected>Select Section</option>
                                                    {this.props.sections.map((section) => (
                                                    <option>{section.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button style={{marginLeft:'300px', width:'80px'}} type = "submit" className="btn btn-primary">Add</button> 
                                
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            
        
        )
    }
}

export default MenuAddForm;