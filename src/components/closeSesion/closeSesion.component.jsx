import React from 'react';
import {useNavigate} from 'react-router-dom'

import './closeSesion.css';
import {IconAssets} from '../../utils/ImageAssets';

import {logout} from '../../services/user.service';

import loginStore from "../../store/loginStore";

const CloseSesion = () => {
    const navigate = useNavigate();
    const setLogin = loginStore(state => state.setLogin);

    const logoutUser = () => {
        logout().then(res => {
            localStorage.clear();
            navigate('/');
            setLogin(false)
        }).catch(err => {

        })
    }

    return (
        <div className={'containerCloseSesion'} onClick={() => logoutUser()}>
            Cerrar sesión
            <img className={'iconCloseSesion'} src={IconAssets.closeSesion}/>
        </div>
    )
}

export default CloseSesion;
