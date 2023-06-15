import React from 'react';

import './rememberPassword.css';
import {ImageAssets} from '../../../utils/ImageAssets';

import {useLocation, useNavigate} from 'react-router-dom';

import Button from '../../../components/button/button.component';

const FirstStep = () => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log('location', location);

    return (
        <div className={'containerRememberPassword'}>
            <div className={'containerFirstStep'}>
                <img className={'logoFirstStep'} src={ImageAssets.originalLogoAuth}/>

                <p className={'textFirstStep'}>Te enviaremos código para reestablecer la contraseña a {location.state.email}</p>

                <div className={'containerButtonsFirstStep'}>
                    <div className={'containerButtonFS'}>
                        <Button
                            text={'Cancelar'}
                            secondary
                            press={() => navigate('/')}
                        />
                    </div>

                    <div className={'containerButtonFS'}>
                        <Button
                            text={'Aceptar'}
                            press={() => navigate('/rememberPasswordCode', {state: {email: location.state.email}})}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstStep;
