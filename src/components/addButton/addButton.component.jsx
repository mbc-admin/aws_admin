import React from 'react';

import './addButton.css';
import {IconAssets} from '../../utils/ImageAssets';

const AddButton = ({text, press, id}) => {

    return (
        <div className='addButton' onClick={press} id={id}>
            <img className={'iconMenuItem'} src={IconAssets.add}/>
            <p className='textItem'>{text}</p>
        </div>
    )
}

export default AddButton;
