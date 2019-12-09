import React,{Component} from 'react';
import SectionAddForm from './SectionAddForm';
import SectionsList from './SectionsList';
import backendURL from '../../urlconfig';

//create the Owner Profile Component
class Sections extends Component {
    constructor(props){
        super(props);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            sections: []
        }
    }

    handleDelete = sectionId => {
        this.setState( state => {
            const sections = state.sections.filter(section => section._id != sectionId);
            return {
                sections
            };
        });
    };

    handleAdd = section =>{
        this.setState(state => ({
            sections: [...state.sections, section]
          }))
    }

    handleEditChange(id, e) {
        this.setState(state => {
            const sections = state.sections.map(section => {
                // Find a section with the matching id
                if(section._id === id){
                    //Return a new object
                    return{
                        ...section, //copy the existing section
                        [e.name]: e.value  //replace the name with new name
                    }
                }
                // Leave every other section unchanged
                return section;
            });
            return {
                sections
            };
        });
    }
    
    componentDidMount(){
        if(localStorage.getItem('token')){
            fetch(`${backendURL}/restaurant/sections/?ownerId=${localStorage.getItem('id')}`,{
                credentials: 'include'
             })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    sections : this.state.sections.concat(data.sections)
                });
            })
            .catch(err => console.log(err));
        }
    }

    render(){
        console.log("Section state = ", this.state);
        return(
            <div>
                <SectionAddForm onAdd = {this.handleAdd}/>
                <SectionsList sections = {this.state.sections}
                onDelete = {this.handleDelete}
                onEditChange = {this.handleEditChange}/>
            </div>
            
        
        )
    }
}

export default Sections;