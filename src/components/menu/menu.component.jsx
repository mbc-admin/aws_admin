import React from 'react';

import './menu.css';
import {IconAssets} from '../../utils/ImageAssets';

import {useNavigate} from 'react-router-dom';

import DotQuantity from '../dotQuantity/dotQuantity.component';
import CloseSesion from '../closeSesion/closeSesion.component';

const Menu = ({route}) => {
    const navigate = useNavigate();

    return (

        <div className={'containerMenu'}>
         <div className='menuOptions'>
            <div className={(route === '/' || route === '/coaches') ? 'MenuItem' : 'MenuItemNoFocus'} onClick={() => navigate('/coaches')}>
                <img className={'iconMenuItem'} src={(route === '/' || route === '/coaches') ? IconAssets.coachesFocus : IconAssets.coachesNoFocus}/>
                <p className={route === '/' || route === '/coaches' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Coaches</p>
            </div>

            <div className={route === '/companies' ? 'MenuItem' : 'MenuItemNoFocus'}  onClick={() => navigate('/companies')}>
                <img className={'iconMenuItem'} src={route === '/companies' ? IconAssets.empresasFocus : IconAssets.empresasNoFocus}/>
                <p className={route === '/companies' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Empresas</p>
            </div>

            <div className={route === '/schedules' ? 'MenuItem' : 'MenuItemNoFocus'}  onClick={() => navigate('/schedules')} >
                <img className={'iconMenuItem'} src={route === '/schedules' ? IconAssets.agendaFocus : IconAssets.agendaNoFocus}/>
                <p className={route === '/schedules' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Agenda</p>
            </div>

            <div className={route === '/users' ? 'MenuItem' : 'MenuItemNoFocus'} onClick={() => navigate('/users')}>
                <img className={'iconMenuItem'} src={route === '/users' ? IconAssets.usuariosFocus : IconAssets.usuariosNoFocus}/>
                <p className={route === '/users' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Usuarios</p>
            </div>

            <div className={route === '/specialties' ? 'MenuItem' : 'MenuItemNoFocus'}  onClick={() => navigate('/specialties')}>
                <img className={'iconMenuItem'} src={route === '/specialties' ? IconAssets.especialidadesFocus : IconAssets.especialidadesNoFocus}/>
                <p className={route === '/specialties' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Especialidades</p>
            </div>


            <div className={route === '/messages' ? 'MenuItem' : 'MenuItemNoFocus'} onClick={() => navigate('/messages')}>
                <img className={'iconMenuItem'} src={route === '/messages' ? IconAssets.messagesFocus : IconAssets.messagesNoFocus}/>
                <p className={route === '/messages' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Chats</p>
                {/*<DotQuantity style={{marginRight: 13}} size={'little'} focus={route === '/chat'}/>*/}
            </div>


            <div className={route === '/articles' ? 'MenuItem' : 'MenuItemNoFocus'} onClick={() => navigate('/articles')}>
                <img className={'iconMenuItem'} src={route === '/articles' ? IconAssets.articlesFocus : IconAssets.articlesNoFocus}/>
                <p className={route === '/articles' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Artículos</p>
                {/*<DotQuantity style={{marginRight: 13}} size={'little'} focus={route === '/articles'}/>*/}
            </div>

            <div className='optionsSeparator'>
            <img className={'iconMenuItem'} src={route === '/aaa' ? IconAssets.statistics : IconAssets.statistics}/>
            <h3 className="textSeparator" >Estadísticas</h3>
            </div>

            <div className={route === '/generalStats' ? 'MenuItemStats' : 'MenuItemNoFocusStats'} onClick={() => navigate('/generalStats')}>
                {/* <img className={'iconMenuItem'} src={route === '/users' ? IconAssets.usuariosFocus : IconAssets.usuariosNoFocus}/> */}
                <p className={route === '/generalStats' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>General</p>
            </div>


            <div className={route === '/coachStats' ? 'MenuItemStats' : 'MenuItemNoFocusStats'} onClick={() => navigate('/coachStats')}>
                {/* <img className={'iconMenuItem'} src={route === '/specialties' ? IconAssets.especialidadesFocus : IconAssets.especialidadesNoFocus}/> */}
                <p className={route === '/coachStats' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Servicio de coach</p>
            </div>


            <div className={route === '/companiesStats' ? 'MenuItemStats' : 'MenuItemNoFocusStats'} onClick={() => navigate('/companiesStats')}>
                {/* <img className={'iconMenuItem'} src={route === '/chat' ? IconAssets.messagesFocus : IconAssets.messagesNoFocus}/> */}
                <p className={route === '/companiesStats' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Servicio de empresas</p>
            </div>
            </div>

            <CloseSesion/>

            </div>

    )
}

export default Menu;
