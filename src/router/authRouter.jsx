import {Routes, Route} from 'react-router-dom';

import Login from '../views/auth/login/login';
import React, { Component }  from 'react';

import FirstStep from '../views/auth/rememberPassword/firstStep';
import SecondStep from '../views/auth/rememberPassword/secondStep';
import ChangePassword from '../views/auth/rememberPassword/changePassword';

import NotFound from '../views/notFound/notFound';

const AuthRouter = () => {

    return(
        <Routes>
            <Route path={'/'} element={<Login/>}/>
            {/*REMEMBER PASSWORD*/}
            <Route path={'/rememberPassword'} element={<FirstStep/>}/>
            <Route path={'/rememberPasswordCode'} element={<SecondStep/>}/>
            <Route path={'/changePassword'} element={<ChangePassword/>}/>

            <Route path={'*'} element={<NotFound/>}/>
        </Routes>
    )
}

export default AuthRouter;
