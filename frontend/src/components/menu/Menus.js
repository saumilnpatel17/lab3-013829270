import React,{Component} from 'react';
import cookie from 'react-cookies';
import MenuAddForm from './MenuAddForm';
import MenusList from './MenusList';
import backendURL from '../../urlconfig';

class Menus extends Component {
    constructor(props){
        super(props);
        // this.getSectionsFromMenuFormComponent = this.getSectionsFromMenuFormComponent.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state = {
            menus: [],
            sections: []
        }
    }

    handleDelete = menuId => {
        this.setState( state => {
            const menus = state.menus.filter(menu => menu.id != menuId);
            return {
                menus
            };
        });
    };

    handleAdd = menu =>{
        this.setState(state => ({
            menus: [...state.menus, menu]
          }))
    }

    handleUpdate(menuId, newSectionId) {
        this.setState(state => {
            const menus = state.menus.map(menu => {
                // Find a menu with the matching id
                if(menu.id == menuId){
                    //Return a new object
                    return{
                        ...menu, //copy the existing menu
                        ["initial_section_id"]: newSectionId //replace the name with new name
                    }
                }
                // Leave every other menu unchanged
                return menu;
            });
            return {
                menus
            };
        });
    }

    handleEditChange(id, name, value) {
        this.setState(state => {
            const menus = state.menus.map(menu => {
                // Find a menu with the matching id
                if(menu.id == id){
                    //Return a new object
                    return{
                        ...menu, //copy the existing menu
                        [name]: value //replace the name with new name
                    }
                }
                // Leave every other menu unchanged
                return menu;
            });
            return {
                menus
            };
        });
    }
    
    componentDidMount(){
        // if(localStorage.getItem('token')){
        fetch(`${backendURL}/restaurant/menus/?ownerId=${localStorage.getItem('id')}`,{
            credentials: 'include'
            })
        .then(res => res.json())
        .then(data => {
            let sections = data.sections.map(section => {
                return{
                    name: section.name,
                    id: section._id
                }
            });
            let sectionsWithMenus = data.sections.filter(section => section.menus);
            let menus = sectionsWithMenus.map(section => {
                let availableMenus = section.menus.map( menu => {
                    return{
                        initial_section_id: section._id,
                        section_id: section._id,
                        id: menu._id,
                        name: menu.name,
                        description: menu.description,
                        price: menu.price,
                        image: menu.image
                    }
                })
                return availableMenus;
            })
            menus = menus.flat();
            this.setState({
                menus : this.state.menus.concat(menus),
                sections: this.state.sections.concat(sections)
            });
        })
        .catch(err => console.log(err));
    }    

    render(){
        return(
            <div>
                {/* <MenuAddForm onAdd = {this.handleAdd} onSectionsLoad = {this.getSectionsFromMenuFormComponent}/> */}
                <MenuAddForm onAdd = {this.handleAdd} sections = {this.state.sections}/>
                <MenusList menus = {this.state.menus} sections = {this.state.sections}
                onDelete = {this.handleDelete}
                onEditChange = {this.handleEditChange}
                onUpdate = {this.handleUpdate}/>
            </div>
            
        
        )
    }
}

export default Menus;