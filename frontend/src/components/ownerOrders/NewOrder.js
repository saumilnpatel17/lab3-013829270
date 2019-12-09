import React,{Component} from 'react';
import backendURL from '../../urlconfig';
import MessagesModal from '../messaging/MessagesModal';

class NewOrder extends Component {
     constructor(props){
        super(props);

        this.state = {
            showMessages: false,
            status: ""
        }
        //Bind the handlers to this class
        this.handleEditChange = this.handleEditChange.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
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
        console.log("New Orders Props called");
        this.props.onSendMessage(message);
    }

    updateStatus = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            id : this.props.order.id,
            status : this.state.status
        }

        fetch(`${backendURL}/restaurant/updateOrder`, {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.status === 200){
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data).message;
                    this.setState({
                        message: responseMessage,
                    })
                    // this.props.onEditChange(this.props.order.orderId, "orderStatus", this.state.status);
                });
            }else{
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data).message;
                    this.setState({
                        message: responseMessage
                    })
                })
                
            }
        })
        .catch(err => console.log(err));
    }

    handleEditChange = e => {
        this.setState({
            status: e.target.value
        })
    }

    render(){
        let statuses = ['New', 'Preparing', 'Ready', 'Delivered', 'Cancel'];
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
                <h2 style= {{color:"red"}}>{this.state.message}</h2>
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
                    <div class="form-group">
                        <label>Status:</label>
                        <select style = {{display:'inline', width:'auto'}} class="form-control" name="orderStatus"
                        onChange = {this.handleEditChange}>
                            <option selected>Select Status</option>
                            {statuses.map( status => {
                                if(status === this.props.order.status){
                                    return <option selected>{status}</option> ;
                                } else {
                                    return <option>{status}</option> ;
                                }
                            }
                            
                            )}
                        </select>
                    </div>
                    <button onClick = {this.updateStatus}
                    className="btn btn-primary btn-status-change">Change Status</button>
                </div>
                {this.state.showMessages ? <MessagesModal 
                orderId = {this.props.order.id} senderName={this.props.order.restName} 
                messages = {this.props.order.messages} onSendMessage = {this.handleSendMessage}
                hideMessageModal={this.hideMessageModal}/> : null} 
            </div>
        )
    }
}

export default NewOrder;