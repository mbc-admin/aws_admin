import React, {useState} from 'react';

import './statusDot.css';

const StatusDot = ({status}) => {
    return (
            <div className={(status === 'connect' || status === 'Online') ? 'dotGreen' : 'dotRed'}>

            </div>
    )
}

export default StatusDot;
