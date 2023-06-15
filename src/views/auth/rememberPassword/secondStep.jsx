import React, {useEffect, useState} from 'react';

import './rememberPassword.css';
import { ImageAssets } from '../../../utils/ImageAssets';

import {useLocation, useNavigate} from 'react-router-dom';

import Button from '../../../components/button/button.component';
import InputVerify from '../../../components/inputVerify/inputVerify.component';

const SecondStep = () => {
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [code5, setCode5] = useState('');

    const [disable, setDisable] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!code1 || !code2 || !code3 || !code4 || !code5) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [code1, code2, code3, code4, code5]);

    const verifyCode = () => {
        navigate('/changePassword');
    }

    return (
        <div className={'containerSecondStep'}>
            <img className={'logoRememberPassword'} src={ImageAssets.originalLogoAuth}/>

            <p className={'textSecondStep'}>Ingrese el código que a recibido a {location.state.email}</p>

            <div className={'containerInputsSecondStep'}>
                <InputVerify value={code1} changeValue={value => setCode1(value)}/>
                <InputVerify value={code2} changeValue={value => setCode2(value)}/>
                <InputVerify value={code3} changeValue={value => setCode3(value)}/>
                <InputVerify value={code4} changeValue={value => setCode4(value)}/>
                <InputVerify value={code5} changeValue={value => setCode5(value)}/>
            </div>

            <div className={'containerButtonSecondStep'}>
                <Button
                    text={'Verificar'}
                    disabled={disable}
                    press={verifyCode}
                />
            </div>
        </div>
    )
}

export default SecondStep;
