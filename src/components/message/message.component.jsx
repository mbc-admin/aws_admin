import React from 'react';

import './message.css';

const Message = ({sender, message, time}) => {

    return (
        <div className={sender ? 'containerMessageSender' : 'containerMessageNoSender'}>
            <div className={sender ? 'containerTextSender' : 'containerTextNotSender'}>
                {message}
            </div>
            <p className={'timeMessage'}>{time}</p>
        </div>
    )
}

export default Message;
