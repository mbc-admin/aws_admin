import React from 'react';

import './history.css';

import Searcher from '../../components/searcher/searcher.component';
import HistoryItem from '../../components/historyItem/historyItem.component';

const History = () => {

    return (
        <div className={'containerHistory'}>
            <p className='titleHistory'>Historial de mensajes</p>

            <Searcher/>

            <div className={'containerItemsHistory'}>
                <HistoryItem/>
                <HistoryItem/>
                <HistoryItem/>
                <HistoryItem/>
                <HistoryItem/>
                <HistoryItem/>
                <HistoryItem/>
            </div>
        </div>
    )
}

export default History;
