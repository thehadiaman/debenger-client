import React, {Component} from "react";
import './App.css';
import Navbar from "./components/navbar";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import {Container, Grid} from "semantic-ui-react";
import LoginForm from "./components/loginForm";
import Verification from "./components/verification";
import SignupForm from "./components/signupForm";
import NotFound from "./components/not-found";
import ForgetPassword from "./components/forgetPassword";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {authUser} from "./services/authService";
import Home from "./components/home";
import Logout from "./components/logout";
import MyDebates from "./components/myDebates";
import Account from "./components/account";

class App extends Component {
    state={
        inverted: !!localStorage.getItem('inverted'),
        invIcon: faSun,
    };

    inverter = () => {
        const {inverted} = this.state;
        document.body.style.backgroundColor = inverted ? '#393B3B': 'white';

        const invIcon = inverted? faMoon : faSun;
        localStorage.getItem('inverted') ? localStorage.removeItem('inverted') : localStorage.setItem('inverted', 'true');
        this.setState({inverted: !inverted, invIcon});
    }

    render() {
        const {inverted, invIcon} = this.state;
        const user = authUser()
        document.body.style.backgroundColor = inverted ? '#393B3B': 'white';
        return (
            <div style={{color: inverted ? 'white': '#393B3B'}}>
                <BrowserRouter>
                    <Navbar inverted={inverted} inverter={this.inverter} invIcon={invIcon} user={user}/>
                    <Container>
                        <Grid stackable columns={1}>
                            <Switch>
                                <Route exact path={'/signup'} render={(props)=><SignupForm {...props} user={user} inverted={inverted}/>} />
                                <Route exact path={'/login'} render={(props)=><LoginForm {...props} user={user} inverted={inverted}/>} />
                                <Route exact path={'/forgetpassword'} render={(props)=><ForgetPassword {...props} user={user} inverted={inverted}/>} />
                                <Route exact path={'/verification'} render={(props)=><Verification {...props} user={user} inverted={inverted}/>} />
                                <Route exact path={'/404'} render={()=><NotFound inverted={inverted}/>}/>
                                <Route exact path={'/mydebates'} render={()=><MyDebates inverted={inverted} user={user} />}/>
                                <Route exact path={'/account'} render={()=><Account inverted={inverted} user={user} />} />
                                <Route exact path={'/logout'} render={()=><Logout />}/>
                                <Route exact path={'/'} render={(props)=><Home {...props} user={user} inverted={inverted}/>} />
                                <Redirect to={'/404'} />
                            </Switch>
                        </Grid>
                    </Container>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;