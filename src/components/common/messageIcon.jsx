import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt as solidComment } from '@fortawesome/free-regular-svg-icons';
import {Link} from "react-router-dom";

class MessageIcon extends Component {

    state={
        heart:  solidComment,
        heartColor: ''
    }

    handleMouseOver = ()=>{
        this.setState({heart: faCommentAlt, heartColor: '#464646'})
    }

    handleMouseOut = ()=>{
        this.setState({heart:  solidComment, heartColor: ''})
    }

    render() {
        const {liked, id} = this.props;

        let like = liked ? faCommentAlt: this.state.heart;
        let color = liked ? 'red': this.state.heartColor;
        return (<Link to={`message/${id}`} onMouseOver={this.handleMouseOver} title={"Messages"} onMouseOut={this.handleMouseOut}>
            <FontAwesomeIcon icon={like} color={color} size={'2x'} onClick={()=>{}}/>
        </Link>);
    }
}

export default MessageIcon;