import React, {useEffect, useState} from 'react';

import './messages.css';

import {useNavigate} from 'react-router-dom';
import {getConversations} from '../../services/chat.service';

import Searcher from '../../components/searcher/searcher.component';
import ChatItem from '../../components/chatItem/chatItem.component';
import HistoryItem from "../../components/historyItem/historyItem.component";

import {ChatService, OrganizationService} from '../../services/mbc.service';
import {getChats} from '../../services/chat.service';

import InputDateText from '../../components/inputDateText/inputDateText';
import CompaniesDropdown from '../../components/companiesDropdown/companiesDropdown';
import DepartmentDropdown from '../../components/departmentDropdown/departmentDropdown';
import GeneralDropdown from '../../components/generalDropdown/generalDropdown.component';
import Button from '../../components/button/button.component';

const Messages = () => {
    const navigate = useNavigate();
    const [chatSelected, setChatSelected] = useState(null);
    const [allChats, setAllChats] = useState(null)
    const [uuidSelected, setUuidSelected] = useState('');
    const [selectOrganization, setSelectOrganization] = useState(null)
    const [departments, setDepartments] = useState([])

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
    const [messagesNotRead, setMessagesNotRead] = useState([]);

    const ratedList = [
        {id: 1, name: '0.5'},
        {id: 2, name: '1'},
        {id: 3, name: '1.5'},
        {id: 4, name: '2'},
        {id: 5, name: '2.5'},
        {id: 6, name: '3'},
        {id: 7, name: '3.5'},
        {id: 8, name: '4'},
        {id: 9, name: '4.5'},
        {id: 10, name: '5'},
    ];

    const activeList = [

    ];

    useEffect(() => {
        getChats().then(res => {
            console.log('CHATS REcogidos cone xito', res.data);
            setChats(res.data.reverse())
        }).catch(err => {
            console.log('ERROR al recoger los chats',err);
        })
    }, []);

    const fetchDepartments = async (companyId) => {
        try {
            const company = await OrganizationService.getById(companyId)
            console.log('THIS IS A ORGANIZATION', company)
            setDepartments(company.Departments)
        } catch (error) {
            console.error('Error al obtener los coaches:', error);
        }
    };

    return (
        chats !== null &&
        <div className='containerMessages'>
            <p className='titleMessages'>Mensajes</p>

            {/*<Searcher/>*/}
            <div className={'containerFiltersStatus'}>
                <InputDateText/>
                <InputDateText/>
                <CompaniesDropdown initialText={'Organizaciones'} onChange={value => {
                    setSelectOrganization(value);
                    fetchDepartments(value.id)
                }}/>
                <DepartmentDropdown options={departments} initialText={'Departamentos'} disabled={selectOrganization ? false : true}/>
            </div>

            <div className={'containerFiltersStatus'}>
                <GeneralDropdown options={departments} initialText={'Profesionales'}/>
                <GeneralDropdown options={departments} initialText={'Usuarios'}/>
                <GeneralDropdown options={ratedList} initialText={'Rated'}/>
                <GeneralDropdown options={departments} initialText={'Activo'}/>
            </div>

            <div className={'containerButtonMessages'}>
                <Button text={'Aplicar'}/>
            </div>

            <div className={'containerChatsMessages'}>
                {chats.map(chat => {
                    return (
                        <HistoryItem
                            image={chat.channelUsers.coach.image}
                            name={`${chat.channelUsers.coach.name} ${chat.channelUsers.coach.lastname}`}
                            company={chat.channelUsers.user.Organization && chat.channelUsers.user.Organization.name}
                            date={chat.ended_at}
                            press={() => navigate(`/chatHistory`, {state: {channelId: chat.id, chats: chats, actualConversation: chat}})}
                        />
                    )
                })
                }
            </div>
        </div>
    )
}

export default Messages;
