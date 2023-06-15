import React from 'react';

import './notFound.css';
import {ImageAssets} from '../../utils/ImageAssets';

const NotFound = () => {

    return (
        <div className={'containerNotFound'}>
            <img src={ImageAssets.notFound}/>

            <div className={'containerContentNotFound'}>
                <p className={'titleNotFound'}>Página no encontrada</p>
                <p className={'subtitleNotFound'}>Lo sentimos, no se ha encontrado la página que buscas</p>

                <button className={'buttonNotFound'}>Volver al Inicio</button>
            </div>
        </div>
    )
}

export default NotFound;
