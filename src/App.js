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

class App extends Component {
    state={
        inverted: true,
        invIcon: faSun,
    }

    inverter = () => {
        const {inverted} = this.state;
        document.body.style.backgroundColor = inverted ? '#393B3B': 'white';

        const invIcon = inverted? faMoon : faSun;
        this.setState({inverted: !inverted, invIcon});
    }

    render() {
        const {inverted, invIcon} = this.state;
        document.body.style.backgroundColor = inverted ? '#393B3B': 'white';
        return (
            <div style={{color: inverted ? 'white': '#393B3B'
            }}>
                <BrowserRouter>
                    <Navbar inverted={inverted} inverter={this.inverter} invIcon={invIcon}/>
                    <Container>
                        <Grid stackable columns={1}>
                            <Switch>
                                <Route path={'/signup'} render={(props)=><SignupForm {...props} inverted={inverted}/>} />
                                <Route path={'/verification'} render={(props)=><Verification {...props} inverted={inverted}/>} />
                                <Route path={'/login'} render={(props)=><LoginForm {...props} inverted={inverted}/>} />
                                <Route path={'/forgetpassword'} render={(props)=><ForgetPassword {...props} inverted={inverted}/>} />
                                <Route path={'/404'} render={()=><NotFound inverted={inverted}/>}/>
                                <Redirect exact from={'/'} to={'/login'}/>
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