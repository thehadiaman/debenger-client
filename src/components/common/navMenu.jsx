import * as React from "react";
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

function NavMenu(props) {
    const {name, to} = props;
    console.log(window.location.pathname);
    return (
        <div>
            <Menu.Item
                active={to===window.location.pathname}
                as={Link}
                name={name}
                to={to}
                onClick={()=>props.setupMenu()}
            />
        </div>
    );
};

export default NavMenu;