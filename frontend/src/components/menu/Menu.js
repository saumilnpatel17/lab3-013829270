import React,{Component} from 'react';
import backendURL from '../../urlconfig';

class Menu extends Component {
     constructor(props){
        super(props);
        this.state = {
            isEditable: false,
            isNewImage: false,
            imgURL: "",
            imageFile: "",
            message: ""
        }
        //Bind the handlers to this class
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.editMenu = this.editMenu.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
    }

    componentDidMount(){
        // fetch(`${backendURL}/restaurant/menuImage/${this.props.menu.id}`,{
            fetch(`${backendURL}/restaurant/menuImage/?name=${this.props.menu.image}`,{
                credentials: 'include'
            })
            .then(res => res.blob())
            .then(resAsBlob => {
                this.setState({
                    imgURL: URL.createObjectURL(resAsBlob)
                });
        })
    }
    
    handleEditChange = e => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;

        //in the case of section, we need section id and not section name, so sending section id instead of name
        if(fieldName === "section"){
            let section = this.props.sections.find(section => section.name === fieldValue)
            fieldName = "section_id";
            fieldValue = section.id;
        }
        this.props.onEditChange(this.props.menu.id, fieldName, fieldValue);
    }

    editMenu = () => {
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
        const fileField = e.target.files;
        var output = document.getElementById(`menu-pic-${this.props.menu.id}`);
        output.src = URL.createObjectURL(fileField[0]);
        this.setState({
            isNewImage: true,
            imageFile: fileField[0]
        })
    }

    postMenuData = (data,successcb) => {
        fetch(`${backendURL}/restaurant/updateMenu`, {
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
                    this.props.onUpdate(this.props.menu.id, this.props.menu.section_id);
                    if(this.state.isNewImage){
                        successcb(JSON.parse(data).message);
                    } else {
                        this.setState({
                            message: JSON.parse(data).message,
                            isEditable: false
                        })
                    }
                });
            }else{
                res.text().then(data => {
                    console.log(data);
                    this.setState({
                        message: JSON.parse(data).message
                    })
                }) 
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    //submit Login handler to send a request to the node backend
    updateMenu = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            id : this.props.menu.id,
            name : this.props.menu.name,
            price: this.props.menu.price,
            description: this.props.menu.description,
            newSectionId: this.props.menu.section_id,
            initialSectionId: this.props.menu.initial_section_id,
            image: this.props.menu.image,
            ownerId: localStorage.getItem('id')
        }

        this.postMenuData(data, success => {
            const formData = new FormData();
            formData.append('image', this.state.imageFile);
            formData.append('menuId', this.props.menu.id);
            formData.append('sectionId', this.props.menu.section_id);
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
                        message: JSON.parse(data).message + " " + success,
                        isEditable: false
                    })
                });
            })
        });
    }

    deleteMenu = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            id : this.props.menu.id,
            sectionId: this.props.menu.section_id,
            ownerId: localStorage.getItem('id')
        }

        fetch(`${backendURL}/restaurant/deleteMenu`, {
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
                res.text().then(data => console.log(data));
                this.props.onDelete(this.props.menu.id);
            }else{
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data).message;
                    this.setState({
                        message: responseMessage
                    })
                })
                
            }
        })
        .catch(err => console.log(err));
    }

    render(){
        let imageEdit = null;
        let menuEdit = null;
        let menuUpdate = null;
        let editCancel = null; 

        if(this.state.isEditable){
            imageEdit = (
                <div>
                    <form>
                        <div class="form-group user-image">
                            <input className = "upload-image" type="file" id="upload1" onChange={this.handleFileUpload}/>
                        </div>
                    </form>
                </div>
                );
            menuUpdate = (
                <button style={{marginLeft:'300px', width:'80px'}}
                onClick = {this.updateMenu} className="btn btn-success">Update</button>
            );
            editCancel = (
                <button onClick = {this.cancelEdit} className="btn btn-danger">Cancel</button>
            );
        }else{
            menuEdit = (
                <button style={{marginLeft:'300px', width:'80px'}}
                onClick = {this.editMenu} className="btn btn-primary">Edit</button>
            );
        }

        return(
            <div>
                <hr/>
            <h2 style= {{color:"red"}}>{this.state.message}</h2>
            <div className = "menu-card" >
                <div class = "menu-image">
                    <label>Image</label>
                    <img className="rounded float-left img-thumbnail" id={`menu-pic-${this.props.menu.id}`}
                    src = {this.state.imgURL} alt="Responsive image"></img>
                    {imageEdit}
                </div>
                <div>
                    <div style={{display:'flex', paddingBottom:'10px', paddingLeft:'100px'}}>
                        <input type="text" class="form-control name-input" 
                        onChange = {this.handleEditChange} disabled={!this.state.isEditable}
                        value = {this.props.menu.name} name="name" placeholder="Name"/>
                        <input type="text" class="form-control price-input" 
                        onChange = {this.handleEditChange} disabled={!this.state.isEditable}
                        value = {this.props.menu.price} name="price" placeholder="Price"/>
                    </div>
                    <div style={{display:'flex', paddingBottom:'10px', paddingLeft:'100px'}}>
                        <textarea class="form-control desc-textarea" rows="3" name="description" 
                        onChange = {this.handleEditChange} disabled={!this.state.isEditable}
                        value = {this.props.menu.description} placeholder="Enter description of menu here"/>
                        <div class="form-group">
                            <select class="form-control" name="section" 
                            onChange = {this.handleEditChange} disabled={!this.state.isEditable}>
                                <option selected>Select Section</option>
                                {this.props.sections.map((section) => {
                                    if(section.id === this.props.menu.section_id){
                                        return <option selected>{section.name}</option> ;
                                    } else {
                                        return <option>{section.name}</option> ;
                                    }
                                }
                                
                                )}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
                {menuEdit}
                {menuUpdate}
                {editCancel}
                <button onClick = {this.deleteMenu} disabled={this.state.isEditable}
                className="btn btn-primary">Delete</button>
            </div>
        )
    }
}

export default Menu;