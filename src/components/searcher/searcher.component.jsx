import React from 'react';

import './searcher.css';
import {IconAssets} from '../../utils/ImageAssets';

const Searcher = () => {

    return (
        <div className='containerSearcher'>
            <img className={'iconSearchSearcher'} src={IconAssets.search}/>
            <input
                className={'inputSearcher'}
                placeholder={'Buscar'}
                type={'text'}
            />
            <img className={'iconDownSearcher'} src={IconAssets.down}/>
        </div>
    )
}

export default Searcher;
