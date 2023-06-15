import React from 'react';

import './infoUserCard.css';
import {IconAssets, ImageAssets} from '../../utils/ImageAssets';

const InfoUserCard = ({close}) => {

    return (
        <div className={'containerUserCard'}>
            <img className={'iconCloseUserCard'} src={IconAssets.close} onClick={() => close(false)}/>
            <img className={'imageUserCard'} src={ImageAssets.userTest}/>

            <p className={'nameUserCard'}>David Martinez</p>
            <p className={'companyUserCard'}>Empresa XXX</p>

            <p className={'titleUserCard'}>Departamento asignado</p>
            <p className={'textDetailsUserCard'}>XXXXXXXXXXXXXXX</p>

            <p className={'titleUserCard'}>Email</p>
            <p className={'textDetailsUserCard'}>david.martinez@gmail.com</p>

            <p className={'titleUserCard'}>Teléfono</p>
            <p className={'textDetailsUserCard'}>XX-XXX-XXX-XXX</p>

            <p className={'titleUserCard'}>Sexo</p>
            <p className={'textDetailsUserCard'}>Masculino</p>

            <p className={'titleUserCard'}>Fecha de nacimiento</p>
            <p className={'textDetailsUserCard'}>23/10/1975</p>
        </div>
    )
}

export default InfoUserCard;
