import React,{Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import OwnerProfile from './OwnerProfile';

//create the Navbar Component
class OwnerAccount extends Component {

    render(){
      let redirectVar = null;
      let fname = null;
      if(!localStorage.getItem('token')){
        redirectVar = <Redirect to= "/owner/login"/>
      } else {
        fname = localStorage.getItem('fname');
      }
    return(
        <div >
            {redirectVar}
            <Navbar firstName = {fname}/>
            <Sidebar user = {'owner'} options = {['Profile']} module = {'account'}/>
            <div >
                <Switch>
                    <Route path="/owner/account/profile" component={OwnerProfile}/>
                    {/* <Route path="/owner/account/sections" component={Section}/> */}

                    {/* <Route path = {match.url} component={OwnerLogin}/>
                    <Route path = {match.url} component={OwnerHome}/>
                    <Route path = {match.url} component={OwnerSignup}/>
                    <Route path = {match.url} component={OwnerAccount}/> */}
                </Switch>
            </div>
        </div>
        )
    }
}

export default OwnerAccount;