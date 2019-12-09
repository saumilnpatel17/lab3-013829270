import React,{Component} from 'react';

class CartItem extends Component {
     constructor(props){
        super(props);

        //Bind the handlers to this class
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem = e => {
        e.preventDefault();
        this.props.onRemove(this.props.item.id);
    }

    render(){
        return(
            <div>
                {/* <h2 style= {{color:"red"}}>{this.state.message}</h2> */}
                
                <div style = {{display:'flex', paddingTop:'20px'}}>
                    <h7 style = {{width:'10%'}}>{this.props.item.quantity} x</h7>
                    <h7 style = {{width:'20%'}}>{this.props.item.name}</h7>
                    <h7 style = {{width:'5%'}}>{`$${this.props.item.price * this.props.item.quantity}`}</h7>
                    <button class="btn btn-primary btn-sm"
                    onClick = {this.removeItem}>Remove From Cart</button>
                </div>
            </div>
        )
    }
}

export default CartItem;