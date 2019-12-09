import React,{Component} from 'react';
import { Switch, Route ,Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Sections from './sections/Sections';
import RestaurantProfile from './RestaurantProfile';
import Menus from './menu/Menus';

//create the Restaurant Component
class Restaurant extends Component {

    render(){
      let redirectVar = null;
      let fname = null;
      if(!localStorage.getItem('token')){
        redirectVar = <Redirect to= "/owner/login"/>
      } else {
        fname = localStorage.getItem('fname')
      }
        return(
            <div >
                {redirectVar}
                <Navbar firstName = {fname}/>
                <div>
                    <Sidebar user = {'owner'} options = {['Profile', 'Sections', 'Menu']} module={'restaurant'}/>
                    <div className = "right-side-area">
                        <Switch>
                        <Route path="/owner/restaurant/profile" component={RestaurantProfile}/>
                        <Route path="/owner/restaurant/sections" component={Sections}/>
                        <Route path="/owner/restaurant/menu" component={Menus}/>

                        {/* <Route path = {match.url} component={OwnerLogin}/>
                        <Route path = {match.url} component={OwnerHome}/>
                        <Route path = {match.url} component={OwnerSignup}/>
                        <Route path = {match.url} component={OwnerAccount}/> */}
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default Restaurant;