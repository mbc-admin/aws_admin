import React, {useEffect, useState} from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import AuthRouter from './router/authRouter';
import Router from './router/router';
import { isLogged } from './services/auth.service';
import loginStore from './store/loginStore';

import NavBar from './components/navBar/navBar.component';

function App() {

  const [checkingLogin, setCheckingLogin] = useState(true);
  const login = loginStore(state => state.login);
  const setLogin = loginStore(state => state.setLogin);

  useEffect(() => {
    isLogged().then(res => {
      console.log('res', res);
      setLogin(true);
    }).catch(err => {
      setLogin(false);
    }).finally(() => setCheckingLogin(false));
  }, [])

  return (
        <div className="App">
          <BrowserRouter>
            {login &&
            <div className={'containerNav'}>
              <NavBar/>
            </div>
            }

            <div className={login ? 'containerRouter' : 'containerRouterNoNav'}>
              {login ?
                  <Router/>
                  :
                  <AuthRouter/>
              }
            </div>
          </BrowserRouter>
        </div>
  );
}

export default App;
