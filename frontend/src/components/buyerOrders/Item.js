import React,{Component} from 'react';
import backendURL from '../../urlconfig';

class Item extends Component {
     constructor(props){
        super(props);

        this.state = {
            imgURL: "",
            message: "",
            quantity: 1
        }
        //Bind the handlers to this class
        this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount(){
        fetch(`${backendURL}/restaurant/menuImage/?name=${this.props.item.image}`,{
                credentials: 'include'
            })
            .then(res => res.blob())
            .then(resAsBlob => {
                this.setState({
                    imgURL: URL.createObjectURL(resAsBlob)
                });
        })
    }

    quantityChangeHandler = e => {
        this.setState({
            quantity : e.target.value
        })
    }

    addToCart = e => {
        let item = {
            id: this.props.item.id,
            name: this.props.item.name,
            price: this.props.item.price,
            quantity: this.state.quantity
        }
        this.props.onAdd(this.props.item.rest_id, this.props.item.rest_name, this.props.item.owner_id, [item]);
    }

    render(){
        console.log(this.state)
        return(
                <div className="item-list-panel">
                    <div style = {{display:'flex', float: 'left', width: '80%'}}>
                        <div class="item-image">
                            <img class="rounded float-left img-thumbnail" id= {`item-pic-${this.props.item.id}`}
                            src= {this.state.imgURL} alt="Responsive image"/>
                        </div>
                        <div>
                            <label style = {{paddingLeft:'5px'}}>{this.props.item.name}</label>  
                            <p style = {{paddingLeft:'5px'}}>{this.props.item.description}</p>
                            <p style = {{paddingLeft:'5px'}}>{`$${this.props.item.price}`}</p>
                            
                        </div> 
                    </div>
                        <div style = {{float: 'right', width: '20%'}}>
                            <label style = {{paddingLeft:'5px'}}>Quantity:</label>
                            <input type="text" class="form-control" onChange = {this.quantityChangeHandler} 
                            style={{width:'80px'}}
                            name="quanity" value = {this.state.quantity}/>
                            <button style = {{paddingLeft:'5px', marginTop: '5px'}}
                            onClick = {this.addToCart}
                            className="btn btn-primary btn-sm">Add to Cart</button>
                        </div>
                </div>
        )
    }
}

export default Item;