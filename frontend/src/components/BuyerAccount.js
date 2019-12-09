import React,{Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BuyerProfile from './BuyerProfile';
import UpcomingOrders from './buyerOrders/UpcomingOrders';
import PastOrders from './buyerOrders/PastOrders'

class BuyerAccount extends Component {

    render(){
        //if Cookie is set render Buyer Home Page
        let redirectVar = null;
        let fname = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/buyer/login"/>
        } else {
            fname = localStorage.getItem('fname')
        }
        return(
            <div>
                {redirectVar}
                <Navbar firstName = {fname}/>
                <Sidebar user = {'buyer'} options = {['Profile', 'Past Orders', 'Upcoming Orders']} module = {'account'}/>
                <div >
                  <Switch>
                      <Route path="/buyer/account/profile" component={BuyerProfile}/>
                      <Route path="/buyer/account/past-orders" component={PastOrders}/>
                      <Route path="/buyer/account/upcoming-orders" component={UpcomingOrders}/>
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

export default BuyerAccount;