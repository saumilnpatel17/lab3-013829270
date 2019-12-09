import React,{Component} from 'react';
import backendURL from '../../urlconfig';

// const $ = window.$;
class MessagesModal extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.hideModal = this.hideModal.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
        // this.messagesEndRef = React.createRef()
        //maintain the state required for this component
        this.state = {
            message: ""
        }
    }

    //get the first name of owner from backend  
    componentDidMount(){
        this.scrollToBottom();
        // console.log("Inside Component Did Mount of Modal");
        // $(ReactDOM.findDOMNode()).modal('show');
        // $(ReactDOM.findDOMNode()).on('hidden.bs.modal', this.props.hideMessageModal);
        // $(ReactDOM.findDOMNode()).modal({
        //     backdrop: "static",
        //     show: false
        // });
        // let modal = ReactDOM.findDOMNode(this);
        // ReactDOM.findDOMNode(this).
        // ReactDOM.findDOMNode(this);
    }

    componentWillUnmount() {
        // $(ReactDOM.findDOMNode()).off();
        
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }

    hideModal = e => {
        this.props.hideMessageModal();
    }

    changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    clearMessage(e) {
        this.setState({
            message: ""
        })
    }

    submitSend = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const message = {
            orderId: this.props.orderId,
            senderName: this.props.senderName,
            sentDate: new Date().toLocaleString(),
            text : this.state.message
        }

        fetch(`${backendURL}/restaurant/addMessage`, {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(message)
        })
        .then(res => {
            if(res.status === 200){
                res.text().then(responseData => {
                    console.log(responseData);
                    let responseMessage = JSON.parse(responseData).message;
                    this.setState({
                        responseMessage: responseMessage,
                        message: ""
                    })
                    this.props.onSendMessage(message);
                });
            }else{
                res.text().then(responseData => {
                    console.log(responseData);
                    let responseMessage = JSON.parse(responseData).message;
                    this.setState({
                        responseMessage: responseMessage
                    })
                })
                
            }
        })
        .catch(err => console.log(err));
    }
    
    render(){
        return (
            <div className="modal" data-backdrop="false">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" onClick = {this.hideModal}
                    data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">{`Messages - Order Id: ${this.props.orderId}`}</h4>
                  </div>
                  <form onSubmit = {this.submitSend}>
                  <div className="modal-body">
                  <h2 style= {{color:"red"}}>{this.state.responseMessage}</h2>
                  {this.props.messages.length > 0 ? 
                    this.props.messages.map(message => {
                        return(
                            <div>
                                <h5 className="msg-info">{message.senderName}({message.sentDate})</h5>
                                <p className="bg-info msg-text">{message.text}</p>
                            </div>
                        )
                    }) :
                    <p>No messages related to this order Id</p>}
                    
                    <div ref={el => { this.el = el; }} />
                    
                    <textarea required onChange = {this.changeHandler} placeholder="New Message"
                        type="text" value = {this.state.message} className="form-control msg-textarea" name="message" rows='3' 
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" onClick = {this.hideModal}
                    className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" onClick = {this.clearMessage} className="btn btn-primary">Clear</button>
                    <button type="submit" className="btn btn-primary">Send</button>
                  </div>
                  </form>
                </div>
                
              </div>
            </div>
          )
    }
}

export default MessagesModal;