import React, {useEffect, useState} from 'react';

import './login.css';
import {ImageAssets} from '../../../utils/ImageAssets';
import {IconAssets} from '../../../utils/ImageAssets';

import {useNavigate} from 'react-router-dom';
import {message} from 'antd';
import loginStore from "../../../store/loginStore";
import {login} from '../../../services/user.service';

import Input from '../../../components/input/input.compnent';
import Button from '../../../components/button/button.component';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(false);
    const setLogin = loginStore(state => state.setLogin);

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            login(email, password).then(res => {
                setLogin(true);
            }).catch(err => {
                message.error('No se ha podido realizar el login, credenciales incorrectas.');
    
            })
        } catch (err) {
            message.error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
      };
    
    
    useEffect(() => {
        if (!email || !password) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [email, password]);

    const goRememberPassword = () => {
        if (email) {
            navigate('/rememberPassword', {state: {email: email}});
        } else {
            message.error('Introduce tu correo para recordar la contraseña.');
        }
    }


    return (
        <div className={'containerLogin'}>
            <img className={'logo'} src={ImageAssets.originalLogoAuth}/>
            <form  onSubmit={handleSubmit} className={'formLogin'}>
                <Input
                    iconLeft={IconAssets.at}
                    placeholder={'Email'}
                    type={'text'}
                    changeValue={value => setEmail(value)}
                />

                <Input
                    iconLeft={IconAssets.pass}
                    placeholder={'Contraseña'}
                    type={'password'}
                    changeValue={value => setPassword(value)}
                />

                <a className={'rememberPasswordLogin'} onClick={goRememberPassword}>¿Olvidaste tu contraseña?</a>

                <Button
                    type="submit"
                    disabled={disable}
                    text={'Iniciar sesión'}
                    
                />
            </form>
        </div>
    )
}

export default Login;
