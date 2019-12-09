import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link} from 'react-router-dom';
import Navbar from '../Navbar';
import CartItem from './CartItem';

const initialState = {
    items: [],
    restId: "",
    restName:""
}
class Cart extends Component {
     constructor(props){
        super(props);
        this.totalPrice = 0
        this.state = initialState
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSetState = this.handleSetState.bind(this);
    }

    //get the first name of owner from backend  
    componentDidMount(){
        if(localStorage.getItem('token')){
            const cart = JSON.parse(localStorage.getItem('cart'));
            if(cart){
                this.setState({
                    items: this.state.items.concat(cart.items),
                    restId: cart.restId,
                    restName: cart.restName,
                    ownerId: cart.ownerId
                })
            }
        }
    }

    handleSetState = (itemId, successcb) => {
        this.setState( state => {
            const items = state.items.filter(item => item.id != itemId);
            return {
                items
            }
        }, function () {successcb()});
        
    }

    handleRemove = itemId => {
        this.handleSetState(itemId,() => {
            if(this.state.items.length < 1){
                this.setState(initialState);
                localStorage.removeItem('cart');
            } else {
                localStorage.setItem('cart', JSON.stringify(this.state));
            }
        });
    };

    emptyCart = e => {
        this.setState(initialState);
        localStorage.removeItem('cart');
    };
    
    render(){
        let redirectVar = null;
        let fname = null;
        let cartBody = null;
        let cartFooter = null;
        if(this.state.items.length < 1){
            cartBody = (
                <div>
                    <h4>Cart is Empty</h4>
                    <button class="btn btn-primary btn-sm" style= {{paddingLeft: '5px', marginTop:'10px'}}
                    disabled={this.state.isCartEmpty}
                    onClick={() => this.props.history.push("/buyer/home")}>Go to Home Page</button>
                </div>
            );
        } else {
            cartBody = this.state.items.map(item => {
                        this.totalPrice = this.totalPrice + (item.price * item.quantity);
                        return <CartItem item = {item} onRemove = {this.handleRemove}/>
                    });
            cartFooter = (
                <div>
                    <hr/>
                    <div style = {{display:'flex'}}>
                        <h7 style = {{width:'30%', textAlign:'center'}}>Item Subtotal:</h7>
                        <h7 style = {{width:'10%'}}>${this.totalPrice}</h7>
                        <button onClick = {this.emptyCart}
                        class="btn btn-primary btn-sm">Empty Cart</button>
                    </div>
                    <div style = {{display:'flex',marginTop:'20px'}}>
                        <button onClick={() => this.props.history.push(`/buyer/place-order/${this.state.restId}`)}
                        class="btn btn-primary btn-sm">Add Item</button>
                        <Link to={{ pathname: "/buyer/checkout", state: this.state, totalPrice: this.totalPrice }}>
                        <button style = {{marginLeft:'10px'}}
                        class="btn btn-primary btn-sm">Checkout</button></Link>
                    </div>
                </div>
            );
        }
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/buyer/login"/>
        } else {
            fname = localStorage.getItem('fname');
        }
        return(
            <div>
                {redirectVar}
                <Navbar firstName = {fname} />
                <div className="container">
                    <div className="buyer-cart">
                        <div className="main-div">
                            <div className="panel">
                                <h4>Your Order</h4>
                                <hr/>
                                {cartBody}
                                {cartFooter}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;