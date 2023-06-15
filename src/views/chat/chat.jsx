import React, {useState} from 'react';

import './chat.css';
import {IconAssets, ImageAssets} from '../../utils/ImageAssets';

import ChatItem from '../../components/chatItem/chatItem.component';
import Writer from '../../components/writer/writer.component';
import Message from '../../components/message/message.component';
import InfoUserCard from '../../components/infoUserCard/infoUserCard.component';
import MenuChat from '../../components/menuChat/menuChat.component';

const Chat = () => {
    const [showUserCard, setShowUserCard] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const messages = [
        {message: 'Hola Carlos, muchas gracias por este espacio. Quisiera contactar contigo', sender: false, time: '9:10'},
        {message: 'Hola Jorge, un gusto conversar contigo. ¿En qué puedo ayudarte? sdfsdfsdfsdffsdsdffsd', sender: true, time: '9:15'},
        {message: 'Me gustaría que hablemos por videollamada para conocernos. Te encuentras disponible?', sender: false, time: '9:20'},
        {message: 'Si, claro. Te la enviaré por aquí. ¿Vale?', sender: true, time: '9:25'},
        {message: 'Si, claro. Te la enviaré por aquí. ¿Vale?', sender: true, time: '9:25'},
        {message: 'Si, claro. Te la enviaré por aquí. ¿Vale?', sender: true, time: '9:25'},
    ]

    return (
        <div className={'containerBlocksChat'}>
            {showUserCard &&
                <InfoUserCard
                    close={value => setShowUserCard(value)}
                />
            }

            {showMenu && <MenuChat/>}

            <div className={'blockChatsChat'}>
                <div className={'headerChat'}>
                    <img className={'iconBackChat'} src={IconAssets.back}/>
                </div>

                <div className={'containerChatsChat'}>
                    <ChatItem size={'little'}/>
                    <ChatItem size={'little'}/>
                    <ChatItem size={'little'}/>
                    <ChatItem size={'little'}/>
                    <ChatItem size={'little'}/>
                    <ChatItem size={'little'}/>
                    <ChatItem size={'little'}/>
                </div>
            </div>

            <div className={'containerChatChat'}>
                <div className={'headerChat'}>
                    <img className={'imageUserChat'} src={ImageAssets.userTest} onClick={() => {
                        setShowUserCard(true);
                        setShowMenu(false);
                    }}/>
                    <p className={'nameUserChat'}  onClick={() => {
                        setShowUserCard(true);
                        setShowMenu(false);
                    }}>David Martinez</p>
                    <img className={'iconOptionsChat'} src={IconAssets.options} onClick={() => {
                        setShowMenu(!showMenu);
                        setShowUserCard(false);
                    }}/>
                </div>
                <div className={'containerChat'}>
                    <div className={'containerMessagesChat'}>
                        {messages.map(message => {
                                return (
                                    <Message
                                        sender={message.sender}
                                        message={message.message}
                                        time={message.time}
                                    />
                                )
                            })
                        }
                    </div>

                    <Writer/>
                </div>
            </div>

        </div>
    )
}

export default Chat;
