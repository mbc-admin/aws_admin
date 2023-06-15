import React, {useState} from 'react';

import './stateUser.css';

const StateUser = () => {
    const [dot, setDot] = useState('Disponible')

    return (
        <div className={'containerStateUser'}>
            <p className={'textStateUser'}>Estado</p>

            <div className={'containerSelectStateUser'}>
                <div className={dot === 'Disponible' ? 'dotGreen' : 'dotRed'}></div>

                <select
                    className={'selectStateUser'}
                    onChange={value => setDot(value.target.value)}
                >
                    <option>Disponible</option>
                    <option>No disponible</option>
                </select>
            </div>
        </div>
    )
}

export default StateUser;
