import React, {useState} from 'react';

import './inputText.css';
import {IconAssets} from '../../utils/ImageAssets';

const InputText = ({label, iconLeft, placeholder, type, changeValue, iconRight, value, name, index, oneData}) => {
    const [show, setShow] = useState(false);

    return (
        <div className={'realContainerInput'}>
            {label && <p className={'labelInput'}>{label}</p>}
            <div className={'containerInput'}>
                <img src={iconLeft}/>
                <input

                    className={'input'}
                    placeholder={placeholder}
                    value={value}
                    type={!show ? type : 'text'}
                    onChange={ val  => {
                        console.log("onChange")
                        console.log(val)
                        console.log(val.target)
                        if (oneData) {
                            changeValue(val.target.value)
                        } else {
                            changeValue(name,val.target.value,index)
                        }
                    }}
                />
                {(type === 'password' && !show) ? <img src={IconAssets.hide} onClick={() => setShow(true)}/> : (type === 'password' && show) && <img src={IconAssets.show} onClick={() => setShow(false)}/> }
            </div>
        </div>

    )
}

export default InputText;
