import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "semantic-ui-react";

const DropDown = ({user, inverted, data}) => {
    return(
        <div className="dropdown user-btn">
            <Button
                inverted={inverted}
                className="dropdown-btn"
                style={{borderRadius: 0}}
            >{user.name}
            </Button>
            <div className="dropdown-content">
                {data.map(link=><Link key={link.name} to={link.link}>{link.name}</Link>)}
            </div>
        </div>
    );
}

export default DropDown;