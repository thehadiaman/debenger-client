import * as React from "react";
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

function NavMenu(props) {
    const {name, to, currentLink, handleActiveLink} = props;
    return (
        <div>
            <Menu.Item
                active={to===currentLink}
                as={Link}
                onClick={()=>handleActiveLink(to)}
                name={name}
                to={to}
            />
        </div>
    );
};

export default NavMenu;