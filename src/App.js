import './App.css';
import Navbar from "./components/common/navbar";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import {Container, Grid} from "semantic-ui-react";
import Login from "./components/login";
import Signup from "./components/signup";
import NotFound from "./components/not-found";

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
      <Grid>
          <Container>
              <Grid.Column>
                  <Switch>
                      <Route path={'/signup'} component={Signup} />
                      <Route path={'/login'} component={Login} />
                      <Route path={'/404'} component={NotFound}/>
                      <Redirect exact from={'/'} to={'/login'}/>
                      <Redirect to={'/404'} />
                  </Switch>
              </Grid.Column>
          </Container>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
