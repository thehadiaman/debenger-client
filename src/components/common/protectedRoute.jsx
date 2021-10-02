import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {authUser} from "../../services/authService";

class ProtectedRoute extends Component {
    render() {
        const {path, inverted, render: Render} = this.props;
        const user = authUser();
        return (
            <Route
                exact
                path={path}
                render={(props)=>{
                    if(user && !user.verified) return <Redirect to={"/verification"}/>
                    else if(!user) return <Redirect to={"/login"} />
                    else if(user && user.verified) return <Render {...props} user={user} inverted={inverted}/>
                }}
            />
        );
    }
}

export default ProtectedRoute;