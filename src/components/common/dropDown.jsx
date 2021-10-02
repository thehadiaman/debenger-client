import React from 'react';
import {Link} from "react-router-dom";
const DropDown = ({data, component, className}) => {
    return(
        <div className={className}>
            {component}
            <div className="dropdown-content">
                {data.map(link=><Link key={link.name} to={link.link}>{link.name}</Link>)}
            </div>
        </div>
    );
}

export default DropDown;