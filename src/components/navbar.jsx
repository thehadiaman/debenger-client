import React, {Component} from "react";
import {Button, Menu, Segment} from "semantic-ui-react";
import NavMenu from "./common/navMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {authUser} from "../services/authService";
import DropDown from './common/dropDown';

class Navbar extends Component {

    state={
        menu: [],
        navbarDropDownData: [
            {name: 'Account', link: '/account'},
            {name: 'Logout', link: '/logout'}
        ]
    }

    setupMenu = () => {
        if(!authUser()){
            const menu = [{name: 'login', to:'/login'}, {name: 'signup', to:'/signup'}];
            this.setState({menu});
        }
        else {

            const menu = [{name: 'home', to:'/'}, {name: 'my debates', to:'/mydebates'}];
            this.setState({menu});
        }
    };


    componentDidMount() {
        this.setupMenu()
    }


    render() {
        const {inverter, inverted, invIcon, user} = this.props;
        const {menu} = this.state;

        const dropDownLaunch = user && <Button inverted={inverted} className="dropdown-btn" style={{borderRadius: 0}}>{user.name}</Button>;

        return (
            <div>
                <Segment inverted={inverted} style={{borderRadius: 0, marginBottom: '20px'}}>
                    <Menu inverted={inverted} pointing secondary>
                        <Menu.Item>
                            <h3>Debenger</h3>
                        </Menu.Item>
                        {menu.map(menu=><NavMenu {...this} key={menu.name} name={menu.name} to={menu.to}/>)}
                        {user && <DropDown
                            user={user}
                            inverted={inverted}
                            data={this.state.navbarDropDownData}
                            component={dropDownLaunch}
                            className={"dropdown user-btn"}
                        />}
                        <Button style={{backgroundColor: inverted ? 'white': '#393B3B'}}
                                circular className={'inverter icon'}
                                floated={'right'}
                                onClick={inverter}>
                            <FontAwesomeIcon style={{color: inverted ? '#393B3B': 'white'}} icon={invIcon}/>
                        </Button>
                    </Menu>
                </Segment>
            </div>
        );
    }
}

export default Navbar;