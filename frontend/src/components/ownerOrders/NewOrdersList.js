import React,{Component} from 'react';
import NewOrder from './NewOrder';

class NewOrdersList extends Component {
     constructor(props){
        super(props);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    handleSendMessage(message){
        this.props.onSendMessage(message);
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="owner-order-list">
                        <div className="main-div">
                            <div className="panel">
                                <div style = {{display:'flex'}}>
                                    <h4>New Orders</h4>
                                    <button style = {{marginLeft:'20px'}} onClick = {()=> {window.location.reload()}}
                                    className="btn btn-primary btn-status-change">Refresh</button>
                                </div>
                                {
                                    this.props.orders ?
                                    this.props.orders.map(order => {
                                        return <NewOrder order = {order} onSendMessage = {this.handleSendMessage}/>
                                    })
                                    : <span/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewOrdersList;