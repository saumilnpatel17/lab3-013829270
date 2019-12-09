import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import backendURL from '../urlconfig';

//create the Navbar Component
class BuyerSearch extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstName: "",
            restaurants: [],
            menuItem: props.match.params.menuItem,
            dropdown: false,
            cuisines: null,
            cuisineName: "",
            filteredCuisine: "",
            initialrestaurants: [],
            startIdx: 0,
            endIdx:2,
            curPage: 1,
            restaurantsPerPage: 3
        }
        this.searchRestaurants = this.searchRestaurants.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
    }

    //get the first name of buyer from backend  
    componentDidMount(){
            if(localStorage.getItem('token')){
                this.state.menuItem = (this.state.menuItem) ? this.state.menuItem : "";
                this.searchRestaurants();
        }
    }

    searchRestaurants(){
        const token = localStorage.getItem('token');
        fetch(`${backendURL}/buyer/searchRestaurants/?menuItem=${this.state.menuItem}`,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
              },
            credentials: 'include',
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    restaurants: data.row,
                    initialrestaurants: data.row
                })
            })
            .catch(err => console.log(err));
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleEditChange = e => {
        // this.state.restaurants = this.state.initialrestaurants;
        const filteredRestaurants = this.state.initialrestaurants.filter(function (restaurant) {
            return restaurant.cuisine === e.target.value;
          });
        if (e.target.value === 'Filter Cuisine') {
            this.setState({
                restaurants: this.state.initialrestaurants,
                startIdx: 0,
                endIdx:2,
                curPage: 1
            })
        } else {
            this.setState({
            restaurants: filteredRestaurants,
            startIdx: 0,
            endIdx:2,
            curPage: 1
        })
        }
        
    }


    paginationHandler(event) {
        if (event.target.id === "prev") {
            if (this.state.startIdx > 0) {
                let startIdx = this.state.startIdx - this.state.restaurantsPerPage;
                this.setState({
                    curPage: this.state.curPage - 1,
                    startIdx: startIdx,
                    endIdx: startIdx + this.state.restaurantsPerPage - 1
                });
            } 
        } else {
            if(this.state.endIdx < this.state.restaurants.length - 1){
                let startIdx = this.state.startIdx + this.state.restaurantsPerPage;
                this.setState({
                    curPage: this.state.curPage + 1,
                    startIdx: startIdx,
                    endIdx: startIdx + this.state.restaurantsPerPage - 1
                });
            }
        }
    }

    render(){
        console.log("this.state***==== ", this.state);
        const isRestaurants = this.state.restaurants;
        const initialrestaurants = this.state.initialrestaurants;
        const result = [];
        const map = new Map();
        let redirectVar = null;
        let fname = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/"/>
        } else {
            fname = localStorage.getItem('fname')
        }
        return(
            <div>
                {redirectVar}

                { initialrestaurants 
                    ?
                    this.state.initialrestaurants.map(restaurant => {
                        if(!map.has(restaurant.cuisine)){
                            map.set(restaurant.cuisine, true);    // set any value to Map
                                result.push({
                                    cuisine: restaurant.cuisine,
                                    id: restaurant._id,
                                    name: restaurant.name
                            });
                        } 
                    })
                    : <span/>
                }
                <Navbar firstName = {fname} />
                <div>
                <div className="container">
                    {/* <div className="owner-order-list"> */}
                        {/* <div className="main-div"> */}
                            {/* <div className="panel"> */}
                                <h1 className="display-1">Restaurants</h1>
                                <hr/>

                                <div class="row input-group">
                                    <input type="search" name = "menuItem" onChange = {this.changeHandler} placeholder="Pizza, Sushi, Biryani..." class="form-control"/>
                                    <span class="input-group-btn">
                                        <button onClick = {this.searchRestaurants} class="btn btn-primary" type="button">
                                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Find Restaurants!</button>
                                    </span>
                                    <select style = {{display:'inline', width:'auto'}} class="form-control" name="orderStatus"
                                        onChange = {this.handleEditChange}>
                                            <option selected>Filter Cuisine</option>
                                            { result
                                                ?
                                                result.map(cuisineData => {
                                                    return (
                                                        <option>{cuisineData.cuisine}</option>
                                                 )
                                                })
                                                :
                                                <span/>
                                            }
                                            </select>
                                        
                                </div>
                                <div className = "paginate">
                                    <button className = "btn btn-primary btn-sm" id="prev" onClick={this.paginationHandler}>&lt;</button>
                                    <button disabled className = "btn btn-primary btn-sm" id="curr">
                                    {this.state.curPage}/{Math.ceil(this.state.restaurants.length/this.state.restaurantsPerPage)}</button>
                                    <button className = "btn btn-primary btn-sm" id="next" onClick={this.paginationHandler}>&gt;</button>
                                    <hr/>
                                </div>
                                <div>
                                {   
                                    isRestaurants 
                                    ?
                                    this.state.restaurants.filter(restaurant => {
                                        let index = this.state.restaurants.indexOf(restaurant);
                                        return index >= this.state.startIdx && index <= this.state.endIdx;
                                    }).map(restaurant => {
                                        return (
                                            <div className="container buyerSearList">
                                                <Link to={{ pathname: `/buyer/place-order/${restaurant._id}`, restName: restaurant.name, ownerId: restaurant.owner_id}}>
                                                <div class="row  listrow"> 
                                                    <div class="col-md-4 buyer-menu-image">
                                                        <img className="rounded float-left img-thumbnail" src = {`${backendURL}/buyer/restaurantImage/${restaurant._id}`} alt="Responsive image"></img>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <h4>{restaurant.name}</h4>
                                                        <span>{restaurant.city} {restaurant.street} {restaurant.state}</span>
                                                        <div>
                                                            <span>{restaurant.cuisine}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Link>
                                                <hr/>
                                            </div>
                                        )
                                    })
                                    : <span/>
                                        }
                                </div>
                                <div className = "paginate">
                                    <button className = "btn btn-primary btn-sm" id="prev" onClick={this.paginationHandler}>&lt;</button>
                                    <button disabled className = "btn btn-primary btn-sm" id="curr">
                                    {this.state.curPage}/{Math.ceil(this.state.restaurants.length/this.state.restaurantsPerPage)}</button>
                                    <button className = "btn btn-primary btn-sm" id="next" onClick={this.paginationHandler}>&gt;</button>
                                    <hr/>
                                </div>
                            </div>
                </div>
            </div>
        )
    }
}

export default BuyerSearch;