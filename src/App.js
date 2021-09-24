import './App.css';
import Navbar from "./components/navbar";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import {Container, Grid} from "semantic-ui-react";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import NotFound from "./components/not-found";
import ForgetPassword from "./components/forgetPassword";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Container>
                <Grid stackable columns={1}>
                    <Switch>
                        <Route path={'/signup'} component={SignupForm} />
                        <Route path={'/login'} component={LoginForm} />
                        <Route path={'/forgetpassword'} component={ForgetPassword} />
                        <Route path={'/404'} component={NotFound}/>
                        <Redirect exact from={'/'} to={'/login'}/>
                        <Redirect to={'/404'} />
                    </Switch>
                </Grid>
            </Container>
        </BrowserRouter>
    );
}

export default App;
