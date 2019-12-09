import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import burger from '../images/main_page_burger.jpg'

//create the Landing Component
class Landing extends Component {
    render(){
        //if Cookie is set render Logout Button
        let redirectVar = null;
        
        if(localStorage.getItem('token')){
            if(localStorage.getItem('userType') === 'buyer'){
                redirectVar = <Redirect to="/buyer/home"/>;
            }
            else{
                redirectVar = <Redirect to="/owner/home"/>;
            }
        }
        
        return(
                <div class="container-fluid">
                {redirectVar}
                    <div class = "login-image">
                        <img width = '100%' height = 'auto' src={burger} alt="Responsive image"></img>
                    </div>
                    <h1 style={{'font-family': "Impact",color:"red", 'font-size':'25px'}} 
                    className="page-header text-center">Welcome to GRUBHUB</h1>
                    <div class = "login-links">
                        <button type="button" class="btn btn-link">
                        <Link to="/buyer/login">
                            <span class="btn-link-format">Buyer Login</span>
                        </Link>
                        </button>
                        <br/>
                        <button type="button" class="btn btn-link">
                        <Link to="/owner/login">
                            <span class="btn-link-format">Owner Login</span>
                            </Link>
                        </button>
                    {/* </form> */}
                    </div>
                </div>
        
        )
    }
}

export default Landing;