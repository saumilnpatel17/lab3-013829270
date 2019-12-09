import React,{Component} from 'react';
import OldOrder from './OldOrder';

class OldOrdersList extends Component {
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
                                <h4>Old Orders</h4>
                                {
                                    this.props.orders ? 
                                        this.props.orders.map(order => {
                                            return <OldOrder order = {order} onSendMessage = {this.handleSendMessage}/>
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

export default OldOrdersList;