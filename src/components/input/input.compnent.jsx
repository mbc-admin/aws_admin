import React, {useState} from 'react';

import './input.css';
import {IconAssets} from '../../utils/ImageAssets';

const InputComponent = ({label, iconLeft, placeholder, type, changeValue, iconRight}) => {
    const [show, setShow] = useState(false);

    return (
        <div className={'realContainerInput'}>
            {label && <p className={'labelInput'}>{label}</p>}
            <div className={'containerInput'}>
                <img src={iconLeft}/>
                <input
                    className={'input'}
                    placeholder={placeholder}
                    type={!show ? type : 'text'}
                    onChange={value => changeValue(value.target.value)}
                />
                {(type === 'password' && !show) ? <img src={IconAssets.hide} onClick={() => setShow(true)}/> : (type === 'password' && show) && <img src={IconAssets.show} onClick={() => setShow(false)}/> }
            </div>
        </div>
        
    )
}

export default InputComponent;
