import React, {Component} from "react";
import {Button, Menu, Segment} from "semantic-ui-react";
import NavMenu from "./common/navMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

class Navbar extends Component {

    state={
        inverted: true,
        invIcon: faSun,
        menu: [{name: 'login', to:'/login'}, {name: 'signup', to:'/signup'}]
    }

    inverter = () => {
        const inverted = !this.state.inverted;
        const invIcon = this.state.inverted? faMoon : faSun;
        this.setState({inverted, invIcon});
    }

    render() {
        const {inverted, menu, invIcon} = this.state;
        return (
            <div>
                <Segment inverted={inverted} style={{borderRadius: 0, marginBottom: '20px'}}>
                    <Menu inverted={inverted} pointing secondary>
                        <Menu.Item>
                            <h3>Debenger</h3>
                        </Menu.Item>
                        {menu.map(menu=><NavMenu key={menu.name} name={menu.name} to={menu.to}/>)}
                        <Button circular className={'inverter icon'} floated={'right'} onClick={this.inverter}>
                            <FontAwesomeIcon icon={invIcon}/>
                        </Button>
                    </Menu>
                </Segment>
            </div>
        );
    }
}

export default Navbar;