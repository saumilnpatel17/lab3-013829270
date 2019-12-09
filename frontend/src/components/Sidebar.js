import React,{Component} from 'react';
import {Link} from 'react-router-dom';

//create the Sidebar Component
class Sidebar extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        let menuOptions = this.props.options.map(option => {
            const route = option.replace(" ", "-")
            return(
                <li>
                    <Link to={`/${this.props.user}/${this.props.module}/${route.toLowerCase()}`}>{option}</Link>
                </li>
            )
        })
        return(
            <nav class="navbar navbar-inverse navbar-fixed-left">
                  <div>
                    <ul class="nav navbar-nav">
                      {menuOptions}
                    </ul>
                  </div>
            </nav>
        )
    }
}

export default Sidebar;