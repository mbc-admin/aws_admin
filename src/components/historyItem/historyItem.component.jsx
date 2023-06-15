import React from 'react';

import './historyItem.css';
import {ImageAssets} from "../../utils/ImageAssets";

import DotQuantity from "../dotQuantity/dotQuantity.component";
import * as moment from 'moment';

const HistoryItem = ({image, name, company, date, press}) => {

    return (
        <div className={'containerHistoryItem'} onClick={press}>
            <div className={'containerImageHistoryItem'}>
                <img className={'imageHistoryItem'} src={`https://node.innobing.net/${image}`}/>
            </div>


            <div className={'containerTextHistoryItem'}>
                <p className={'nameHistoryItem'}>{name}</p>
                <p className={'companyHistoryItem'}>{company}</p>
            </div>

            {date === null ?
                <div className={'activeHistoryItem'}>Activa</div>
                :
                <p className={'dateHistoryItem'}>{moment(date).format('DD/MM/YYYY')}</p>
            }
        </div>
    )
}

export default HistoryItem;
