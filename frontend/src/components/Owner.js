import React from 'react';
import { Switch, Route ,Link} from 'react-router-dom';
import OwnerLogin from './OwnerLogin';
import OwnerHome from './OwnerHome';
import OwnerSignup from './OwnerSignup';
import OwnerAccount from './OwnerAccount';
import AddRestaurant from './AddRestaurant';
import Restaurant from './Restaurant';

class Owner extends React.Component{
    
    render(){
        return (
        <div >
            <Switch>
                <Route path="/owner/login" component={OwnerLogin}/>
                <Route path="/owner/home" component={OwnerHome}/>
                <Route path="/owner/signup" component={OwnerSignup}/>
                <Route path="/owner/addRestaurant" component={AddRestaurant}/>
                <Route path="/owner/account/:id" component={OwnerAccount}/>
                <Route path="/owner/restaurant/:id" component={Restaurant}/>
            </Switch>
        </div>
        )
    }

}

export default Owner