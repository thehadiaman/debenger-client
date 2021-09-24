import * as React from "react";
import {Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export function NavMenu({name, to}) {
    return (
        <div>
            <Menu.Item
                as={NavLink}
                name={name}
                to={to}
            />
        </div>
    );
};