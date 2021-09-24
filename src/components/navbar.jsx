import React, {Component} from "react";
import {Button, Menu, Segment} from "semantic-ui-react";
import NavMenu from "./common/navMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Navbar extends Component {

    state={
        menu: [{name: 'login', to:'/login'}, {name: 'signup', to:'/signup'}]
    }

    render() {
        const {inverter, inverted, invIcon} = this.props;
        const {menu} = this.state;
        return (
            <div>
                <Segment inverted={inverted} style={{borderRadius: 0, marginBottom: '20px'}}>
                    <Menu inverted={inverted} pointing secondary>
                        <Menu.Item>
                            <h3>Debenger</h3>
                        </Menu.Item>
                        {menu.map(menu=><NavMenu key={menu.name} name={menu.name} to={menu.to}/>)}
                        <Button circular className={'inverter icon'} floated={'right'} onClick={inverter}>
                            <FontAwesomeIcon icon={invIcon}/>
                        </Button>
                    </Menu>
                </Segment>
            </div>
        );
    }
}

export default Navbar;