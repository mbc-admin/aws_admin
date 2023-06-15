import React from 'react';

import './chatItem.css';
import {ImageAssets} from '../../utils/ImageAssets';

import DotQuantity from "../dotQuantity/dotQuantity.component";

const ChatItem = ({image, fullName, lastMessage, size, press}) => {
    const text = 'Me gustaría que hablemos por videollamada para conocernos. Te...'

    return (
        <div className={'containerChatItem'} onClick={press}>
            <img className={'imageChatItem'} src={image === null ? ImageAssets.userTest : `https://node.innobing.net/${image}`}/>

            <div className={'containerTextChatItem'}>
                <p className={'nameChatItem'}>{fullName}</p>
                <p className={'companyChatItem'}>Empresa XXX</p>
                <p className={'lastMessageChatItem'} >{size === 'little' ? lastMessage.slice(0, 20)+'...' : lastMessage}</p>
            </div>

            <div className={'containerDetailsChatItem'}>
                <p className={'timeChatItem'}>10:05</p>
                <DotQuantity
                    size={'big'}
                    focus={false}
                />
            </div>
        </div>
    )
}

export default ChatItem;
