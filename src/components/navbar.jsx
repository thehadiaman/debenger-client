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
        ],
        currentLink: '/'
    }

    setupMenu = () => {
        if(!authUser()){
            const menu = [{name: 'login', to:'/login'}, {name: 'signup', to:'/signup'}];
            this.setState({menu, currentLink: '/login'});
        }
        else {

            const menu = [{name: 'home', to:'/'}, {name: 'my debates', to:'/mydebates'}];
            this.setState({menu});
        }
    };


    componentDidMount() {
        this.setupMenu()
    }

    handleActiveLink = (link) => {
        this.setState({currentLink: link})
    }


    render() {
        const {inverter, inverted, invIcon, user} = this.props;
        const {menu, currentLink} = this.state;

        const dropDownLaunch = user && <Button inverted={inverted} className="dropdown-btn" style={{borderRadius: 0}}>{user.name}</Button>;

        return (
            <div>
                <Segment inverted={inverted} style={{borderRadius: 0, marginBottom: '20px'}}>
                    <Menu inverted={inverted} pointing secondary>
                        <Menu.Item>
                            <h3>Debenger</h3>
                        </Menu.Item>
                        {menu.map(menu=><NavMenu key={menu.name} name={menu.name} currentLink={currentLink} to={menu.to} handleActiveLink={this.handleActiveLink}/>)}
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