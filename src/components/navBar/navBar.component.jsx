import React, {useEffect, useState} from 'react';

import './navBar.css';
import { ImageAssets } from '../../utils/ImageAssets';

import {useLocation} from 'react-router-dom';

import UserNavBar from '../userNavBar/userNavBar.component';
import StateUser from '../stateUser/stateUser.component';
import Menu from '../menu/menu.component';
import CloseSesion from '../closeSesion/closeSesion.component';
import {getProfile} from "../../services/user.service";

const NavBar = () => {
    const location = useLocation();
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserProfile();
    }, [])

    const getUserProfile = () => {
        getProfile().then(user => {
            console.log('Perfil recogido con exito', user.data);
            setUser(user.data);
        }).catch(err => {
            console.log('ERROR al recoger el perfil', err);
        })
    }

    return (
        <div className={'containerNavBar'}>
            <img className={'logoNavBar'} src={ImageAssets.originalLogo}/>


            <div className={'containerItemsNavBar'}>
                <UserNavBar
                    image={user && user.image}
                    fullName={user && user.name + ' ' + user.lastname}
                    email={user && user.email}
                />

                {/* <StateUser/> */}

                <Menu route={location.pathname}/>


            </div>

        </div>
    )
}

export default NavBar;
