import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt as solidComment } from '@fortawesome/free-regular-svg-icons';

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
        const {liked, id, handleMessageClick} = this.props;

        let like = liked ? faCommentAlt: this.state.heart;
        let color = liked ? 'red': this.state.heartColor;
        return (<div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
            <FontAwesomeIcon icon={like} color={color} size={'2x'} onClick={()=>{}}/>
        </div>);
    }
}

export default MessageIcon;