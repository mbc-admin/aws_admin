import React from 'react';

import './writer.css';
import {IconAssets} from '../../utils/ImageAssets';

const Writer = () => {

    return (
        <div className={'containerWriter'}>
            <input
                className={'inputWriter'}
                placeholder={'Escribe tu mensaje'}
                type={'text'}
                rows={10}
            />

            <div className={'senderWriter'}>
                <img src={IconAssets.sender}/>
            </div>
        </div>
    )
}

export default Writer;
