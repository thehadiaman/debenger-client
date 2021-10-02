import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class Home extends Component {
    render() {

        const {user} = this.props;
        if(user && !user.verified) return <Redirect to={"/verification"}/>
        else if(!user) return <Redirect to={"/login"}/>

        return (
            <React.Fragment>
                <h1>HOME</h1>
            </React.Fragment>
        );
    }
}

export default Home;