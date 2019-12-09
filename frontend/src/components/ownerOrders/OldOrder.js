import React,{Component} from 'react';
import MessagesModal from '../messaging/MessagesModal';

class OldOrder extends Component {
     constructor(props){
        super(props);

        this.state = {
            showMessages: false
        }
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.showMessageModal = this.showMessageModal.bind(this);
        this.hideMessageModal = this.hideMessageModal.bind(this);
    }

    showMessageModal = e => {
        this.setState({
            showMessages: true
        });
    }

    hideMessageModal = e => {
        this.setState({
            showMessages: false
        });
    }

    handleSendMessage(message){
        this.props.onSendMessage(message);
    }

    render(){
        let itemDetails = this.props.order.items.map(item => {
            return(
                <div style = {{display:'flex'}}>
                    <label>Menu Item:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{item.name}</h7>
                    <label style = {{paddingLeft:'25px'}}>Quanity:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{item.quantity}</h7>
                    <label style = {{paddingLeft:'25px'}}>Price:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{item.price}</h7>
                </div>
            );
        });
        return(
            <div>
                <hr/>
                <label style = {{fontSize:'17px'}}>Order# {this.props.order.id}</label>
                <button style = {{marginLeft:'20px'}} onClick = {this.showMessageModal}
                className="btn btn-primary btn-sm">View/Send Message</button>
                <h5 style = {{textDecoration:'underline'}}>Buyer Details</h5>
                <div style = {{display:'flex'}}>
                    <label>Buyer Name:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{this.props.order.buyerName}</h7>
                    <label style = {{paddingLeft:'25px'}}>Buyer Address:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{this.props.order.buyerAddress}</h7>
                </div>
                <h5 style = {{textDecoration:'underline'}}>Order Details</h5>
                {itemDetails}
                <div style = {{display:'flex'}}>
                    <label>Total Price:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{this.props.order.totalPrice}</h7>
                </div>
                <div style = {{display:'flex'}}>
                    <label>Order Status:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{this.props.order.status}</h7>
                </div> 
                {this.state.showMessages ? <MessagesModal 
                orderId = {this.props.order.id} senderName={this.props.order.restName} 
                messages = {this.props.order.messages} onSendMessage = {this.handleSendMessage}
                hideMessageModal={this.hideMessageModal}/> : null}                
            </div>
        )
    }
}

export default OldOrder;