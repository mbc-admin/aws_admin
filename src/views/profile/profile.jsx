import React from 'react';

import './profile.css';
import {ImageAssets, IconAssets} from '../../utils/ImageAssets';

import { Rate } from 'antd';
import Speciality from '../../components/speciality/speciality.component';
import Button from '../../components/button/button.component';


const Profile = () => {

    return (
        <div className={'containerProfile'}>
            <p className='titleProfile'>Perfil</p>

            <div className={'containerContentProfile'}>
                <div className={'containerImageProfile'}>
                    <img className={'imageProfile'} src={ImageAssets.userTest}/>
                    <button className={'buttonEditImageProfile'}>
                        <img className={'iconEdit'} src={IconAssets.edit}/>
                    </button>
                </div>
                <p className={'titleRatingProfile'}>Valoración</p>
                <Rate
                    className={'rateProfile'}
                    value={5}
                />
            </div>

            <div className={'containerDataProfile'}>
                <p className={'titleDataProfile'}>Nombre y apellido</p>
                <p className={'nameProfile'}>Carlos Díaz</p>

                <p className={'titleDataProfile'}>Especialidades</p>
                <div className={'containerSpecialitiesProfile'}>
                    <Speciality text={'Autoestima y bienestar'}/>
                    <Speciality text={'Autoestima y bienestar'}/>
                    <Speciality text={'Autoestima y bienestar'}/>
                    <Speciality text={'Autoestima y bienestar'}/>
                </div>

                <p className={'titleDataProfile'}>Descripción profesional</p>
                <textarea
                    className={'textareaProfile'}
                    placeholder={'Escriba aqui...'}
                />

                <div className={'containerButtonProfile'}>
                    <Button
                        text={'Guardar'}
                        disabled
                    />

                </div>
            </div>

        </div>
    )
}

export default Profile;
