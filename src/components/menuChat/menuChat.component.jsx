import React from 'react';

import './menuChat.css';

import {useNavigate} from 'react-router-dom';

const MenuChat = () => {
    const navigate = useNavigate();

    return (
        <div className={'containerMenuChat'}>
            <div className={'itemMenuChat'}>
                <p className={'textItemMenu'}>Iniciar videochat</p>
            </div>
            <div className={'itemMenuChat border'}>
                <p className={'textItemMenu'}>Finalizar sesión</p>
            </div>
            <div className={'itemMenuChat halfBorder'} onClick={() => navigate('/report')}>
                <p className={'textItemMenu'}>Banear usuario</p>
            </div>
            <div className={'itemMenuChat'}>
                <p className={'textItemMenu'}>Adjuntar archivo</p>
            </div>
            <div className={'itemMenuChat'} onClick={() => navigate('/rating')}>
                <p className={'textItemMenu'}>Valorar</p>
            </div>
        </div>
    )
}

export default MenuChat;
