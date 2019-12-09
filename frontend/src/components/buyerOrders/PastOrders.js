import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import backendURL from '../../urlconfig';
import Order from './Order';

class PastOrders extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            orders: []
        }
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    //get the first name of owner from backend  
    componentDidMount(){
        if(localStorage.getItem('token')){
            fetch(`${backendURL}/buyer/pastOrders/?id=${localStorage.getItem('id')}`,{
            credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {                
                this.setState({
                    orders: this.state.orders.concat(data.orders)
                })
            })
            .catch(err => console.log(err));
        }
    }

    handleSendMessage(message){
        this.setState(state => {
            const orders = state.orders.map(order => {
                // Find a menu with the matching id
                if(order.id == message.orderId){
                    //Return a new object
                    let orderToUpdate = {...order}
                    orderToUpdate.messages = orderToUpdate.messages.concat(message);
                    return orderToUpdate;
                }
                // Leave every other menu unchanged
                return order;
            });
            return {
                orders
            };
        });
    }
    
    render(){
        let redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <div className="container">
                    <div className="buyer-order-list">
                        <div className="main-div">
                            <div className="panel">
                                <div style = {{display:'flex'}}>
                                    <h4>Past Orders</h4>
                                    <button style = {{marginLeft:'20px'}} onClick = {()=> {window.location.reload()}}
                                    className="btn btn-primary btn-status-change">Refresh</button>
                                </div>
                                {
                                    this.state.orders ? 
                                    this.state.orders.map(order => {
                                        return <Order order = {order} onSendMessage = {this.handleSendMessage}/>
                                    })
                                    :
                                    <span/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PastOrders;