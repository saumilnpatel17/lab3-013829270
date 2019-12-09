import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import Landing from './Landing';
import Buyer from './Buyer';
import Owner from './Owner';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/* <div style={{border:"1px solid black"}}> */}
                <Switch>
                    <Route path="/" exact component={Landing}/>
                    {/* <Route path="/buyer"  component={Buyer}/> */}
                    <Route path="/buyer/:id"  component={Buyer}/>
                    <Route path="/owner/:id"  component={Owner}/>
                </Switch>
                {/* </div> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;