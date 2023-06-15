import React from 'react';

import './avatar.css';
import { ImageAssets } from '../../utils/ImageAssets';

const Avatar = ({image}) => {

    return (
        <div className='containerAvatar'>
            <img className={'imageNavBar'} src={`https://node.innobing.net/${image}`}/>

            <div className='dotAvatarConnected'></div>
        </div>
    )
}

export default Avatar;
