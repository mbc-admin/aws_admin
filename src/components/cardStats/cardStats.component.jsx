import React from 'react';

import './cardStats.css'

const CardStats = ({value, text, icon}) => {

    return (
        <div className={'containerCardStats'}>
            <div className={'containerTopCardStats'}>
                <p className={'titleCardStats'}>{value}</p>
                <div className={'containerIconGeneralStats'}>
                    <img className={'iconCardStats'} src={icon}/>
                </div>
            </div>
            <div className={'containerTextGeneralStats'}>
                <span className={'textGeneralStats'}>{text}</span>
            </div>
        </div>
    )
}

export default CardStats;
