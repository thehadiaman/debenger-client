import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

import React, {Component} from "react";

class NavMenu extends Component {


    state={
        path: window.location.pathname
    }

    componentDidMount() {
        setInterval(()=>{
            if(this.state.path!==window.location.pathname)
                this.setState({path: window.location.pathname})
        }, 500)
    }


    render() {
        const {name, to, setupMenu} = this.props;
        return (
            <div>
                <Menu.Item
                    active={to===this.state.path}
                    as={Link}
                    name={name}
                    to={to}
                    onClick={()=>setupMenu()}
                />
            </div>
        );
    }
}
export default NavMenu;