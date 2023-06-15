import React, {useEffect, useState} from 'react';
import InfoUserCard from "../../components/infoUserCard/infoUserCard.component";
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import MenuChat from "../../components/menuChat/menuChat.component";
import {IconAssets, ImageAssets} from "../../utils/ImageAssets";
import ChatItem from "../../components/chatItem/chatItem.component";
import Message from "../../components/message/message.component";
import * as moment from 'moment';

import './chatHistory.css';
import {getConversations} from "../../services/chat.service";

const ChatHistory = () => {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [showUserCard, setShowUserCard] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [chats, setChats] = useState(null);
    const [message, setMessage] = useState('');
    const [lastMessage, setLastMessage] = useState(null);
    const [idChat, setIdChat] = useState(null);
    const [idSession, setIdSession] = useState(null);

    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [typeData, setTypeData] = useState(null);
    const [actualConversation, setActualConversation] = useState();
    const [fileSended, setFileSended] = useState(false);

    const [conversationsOpened, setConversationsOpened] = useState([]);

    const [channelPrevId, setChannelPrevId] = useState(null);
    const [channelNextId, setChannelNextId] = useState(location.state.channelId);

    useEffect(() => {
        setIdChat(location.state.channelId);
        setChats(location.state.chats);
        setActualConversation(location.state.actualConversation);
        setMessages(location.state.actualConversation.Messages);
        // console.log('LOCATIOOON', location);

        //RECOGE LAS CONVERSACIONES ABIERTAS
        /*getConversations(0).then(conversations => {
            console.log('Conversaciones recogidas con exito', conversations.data)
            setChannelNextId(location.state.channelId);
            setConversationsOpened(opened => [...opened, location.state.channelId]);
            let conversat = conversations.data.filter(conver => conver.id === Number(location.state.channelId));
            setActualConversation(conversat[0]);
            setIdSession(conversat[0].videocall_uuid)
            setMessages(conversat[0].Messages);
            /!*conversations.data.map(res => {
                res.Messages.reverse();
            })*!/
            setChats(conversations.data);
        }).catch(err => {
            console.log('ERROR al recoger las conversaciones', err);
        })*/
    }, []);

    return (
        <div className={'containerBlocksChat'}>


            {showUserCard &&
            <InfoUserCard
                user={actualConversation}
                close={value => setShowUserCard(value)}
            />
            }

            <div className={'blockChatsChat'}>
                <div className={'headerChat'}>
                    <img className={'iconBackChat'} src={IconAssets.back} onClick={() => {
                        navigate('/history')
                    }}/>
                </div>
                {chats !== null &&
                <div className={'containerChatsChat'}>
                    {chats.map((chat, index) => {
                        return (
                            <ChatItem
                                image={chat.channelUsers.coach.image}
                                fullName={`${chat.channelUsers.coach.name} ${chat.channelUsers.coach.lastname}`}
                                lastMessage={lastMessage !== null && chat.id === idChat ? lastMessage.content : (chat.Messages.length > 0 ? chat.Messages[0].content : '')}
                                size={'little'}
                                organization={chat.channelUsers.user.Organization ? chat.channelUsers.user.Organization.name : 'Sin organizacion'}
                                unreadMessages={idChat === chat.id ? 0 : chat.unreadMessages.length}
                                press={() => {
                                    console.log('THIS IS A ORGANIZATION USER', chat)
                                    setMessages(chat.Messages);
                                    setActualConversation(chat)
                                    /*if (chat.id !== channelNextId) {
                                        console.log('idCHAAAAAAAT', channelNextId)
                                        setChannelPrevId(location.state.channelId);
                                        setChannelNextId(chat.id);
                                        setIdChat(chat.id);

                                        console.log('channel prev id', channelPrevId);
                                        console.log('channel next id', channelNextId);
                                        /!*if (conversationsOpened.includes(chat.id)) {
                                            setActualConversation(chat);
                                            setMessages(chat.Messages);
                                        } else {
                                            setActualConversation(chat);
                                            setMessages(chat.Messages);
                                            setConversationsOpened(opened => [...opened, chat.id]);
                                        }*!/

                                        location.state.channelId = chat.id
                                    }*/
                                }}
                            />
                        )
                    })
                    }
                </div>
                }
            </div>

            <div className={'containerChatChat'}>
                {actualConversation &&
                <div className={'headerChat'}>
                    <div className={'containerImageUserChat'}>
                        <img className={'imageUserChat'} src={actualConversation.channelUsers.coach.image === null ? ImageAssets.userTest : `https://node.innobing.net/${actualConversation.channelUsers.coach.image}`} onClick={() => {
                            setShowUserCard(!showUserCard);
                            setShowMenu(false);
                        }}/>
                    </div>
                    <p className={'nameUserChat'}  onClick={() => {
                        setShowUserCard(!showUserCard);
                        setShowMenu(false);
                    }}>{`${actualConversation.channelUsers.coach.name} ${actualConversation.channelUsers.coach.lastname}`}</p>
                    {/*<img className={'iconOptionsChat'} src={IconAssets.options} onClick={() => {
                        setShowMenu(!showMenu);
                        setShowUserCard(false);
                    }}/>*/}
                </div>
                }
                <div className={'containerChat'}>
                    {typeData === null ?
                        <div id={'containerMessages'} className={'containerMessagesChat'} onLoad={() => console.log('BOTTTTTOMMMM')}>
                            {messages.length > 0 &&
                            (messages.map(message => {
                                    return (
                                        <Message
                                            sender={message.user_id === actualConversation.channelUsers.coach.id}
                                            message={message.content}
                                            idChat={message.channel_id}
                                            type={message.message_type}
                                            time={moment(message.createdAt).format('HH:mm')}
                                            file={message.file}
                                            pressFile={value => setFilePreview(value)}
                                            typeFile={value => setTypeData(value)}
                                            isSended={value => setFileSended(value)}
                                            press={() => {
                                                let token =localStorage.getItem('token');
                                                console.log("UUID videocall: ", )
                                                window.open(`https://mbcwebchat.innobing.net/sfu/${idSession}/${token}`);
                                            }}
                                        />
                                    )
                                })
                            )
                            }
                        </div>
                        :
                        <div className={'containerFilesChat'}>
                            {typeData === 'image' &&
                            <>
                                <img className={'iconCloseChat'} src={IconAssets.close} onClick={() => {
                                    setTypeData(null);
                                    setFile(null);
                                    setFilePreview(null);
                                    setFileSended(false);
                                }}/>
                                <img className={'imageFile'} src={filePreview}/>
                            </>
                            }
                            {typeData === 'video' &&
                            <>
                                <img className={'iconCloseChat'} src={IconAssets.close} onClick={() => {
                                    setTypeData(null);
                                    setFile(null);
                                    setFilePreview(null);
                                    setFileSended(false);
                                }}/>
                                <video style={{width: '100%', height: '90%'}} src={filePreview} controls/>
                            </>
                            }
                            {typeData === 'document' &&
                            <>
                                <img className={'iconCloseChat'} src={IconAssets.close} onClick={() => {
                                    setTypeData(null);
                                    setFile(null);
                                    setFilePreview(null);
                                    setFileSended(false);
                                }}/>
                                <iframe src={filePreview+'#toolbar=0'} width={'100%'} height={'90%'}/>
                            </>
                            }
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default ChatHistory;
