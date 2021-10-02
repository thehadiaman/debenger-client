import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as hollowHeart } from '@fortawesome/free-regular-svg-icons';

const Like = ({liked, handleLike, id}) => {
    let like = liked ? faHeart: hollowHeart
    let color = liked ? 'red': ''

    return (<div>
        <FontAwesomeIcon icon={like} color={color} size={'2x'} onClick={()=>handleLike(id)}/>
    </div>);
}


export default Like;
