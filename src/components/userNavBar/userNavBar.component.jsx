import React from 'react';

import './userNavBar.css';
import { ImageAssets } from '../../utils/ImageAssets';

import Avatar from '../avatar/avatar.component';

const UserNavBar = ({image, fullName, email}) => {
    console.log('imagenavbar', image)

    return (
        <div className={'containerUserNavBar'}>
            <Avatar image={image}/>

            <div className={'containerTextUserNavBar'}>
                <p className={'nameUserNavBar'}>{fullName}</p>
                <p className={'emailUserNavBar'}>{email}</p>
            </div>
        </div>
    )
}

export default UserNavBar;
