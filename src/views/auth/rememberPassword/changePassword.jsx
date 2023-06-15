import React, {useState, useEffect} from 'react';

import '../login/login';
import { ImageAssets, IconAssets } from '../../../utils/ImageAssets';

import {useNavigate} from 'react-router-dom';
import {message} from 'antd';

import Input from '../../../components/input/input.compnent';
import Button from '../../../components/button/button.component';

const ChangePassword = () => {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const [disable, setDisable] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!password1 || !password2) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [password1, password2]);

    const goLogin = () => {
        if (password1 === password2) {
            navigate('/')
        } else {
            message.error('Las contraseñas no coinciden.');
        }
    }

    return (
        <div className={'containerLogin'}>
            <img className={'logo'} src={ImageAssets.originalLogoAuth}/>
            <form className={'formLogin'}>
                <Input
                    iconLeft={IconAssets.pass}
                    label={'Nueva contraseña'}
                    placeholder={'Nueva contraseña'}
                    type={'password'}
                    changeValue={value => setPassword1(value)}
                />

                <Input
                    iconLeft={IconAssets.pass}
                    label={'Confirmar nueva contraseña'}
                    placeholder={'Confirmar nueva contraseña'}
                    type={'password'}
                    changeValue={value => setPassword2(value)}
                />

                <Button
                    disabled={disable}
                    text={'Cambiar contraseña'}
                    press={goLogin}
                />
            </form>
        </div>
    )
}

export default ChangePassword;
