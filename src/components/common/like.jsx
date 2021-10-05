import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as hollowHeart } from '@fortawesome/free-regular-svg-icons';

class Like extends Component {

    state={
        heart: hollowHeart,
        heartColor: ''
    }

    handleMouseOver = ()=>{
        this.setState({heart: faHeart, heartColor: '#464646'})
    }

    handleMouseOut = ()=>{
        this.setState({heart: hollowHeart, heartColor: ''})
    }

    render() {
        const {liked, id, handleLike} = this.props;

        let like = liked ? faHeart: this.state.heart;
        let color = liked ? 'red': this.state.heartColor;
        return (<div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
            <FontAwesomeIcon icon={like} color={color} size={'2x'} onClick={()=>handleLike(id)}/>
        </div>);
    }
}

export default Like;