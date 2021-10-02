import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class Account extends Component {
    render() {
        const {user} = this.props;
        if(user && !user.verified) return <Redirect to={"/verification"}/>
        else if(!user) return <Redirect to={"/login"}/>

        return (
            <div>
                <h1>Account</h1>
            </div>
        );
    }
}

export default Account;