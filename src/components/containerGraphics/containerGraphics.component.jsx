import React from 'react';

import './containerGraphics.css';

import { Chart } from "react-google-charts";

const ContainerGraphics = ({title, data, type}) => {
    const optionDonut = {
        pieHole: 0.5
    }

    const data1 = [
        ['', 'Users', 'Logins'],
        ['5 may', 200, 150],
        ['6 may', 300, 233],
        ['7 may', 200, 100],
        ['8 may', 650, 300],
        ['9 may', 1000, 799],
    ]

    return (
        <>
            {type === 'donut' &&
            <div className={'containerGraphics'}>
                <div className={'headerContainerGraphic'}>
                    <span className={'textHeaderContainerGraphic'}>{title}</span>
                </div>
                <Chart
                    chartType={'PieChart'}
                    data={data}
                    options={optionDonut}
                    width={'100%'}
                />
            </div>
            }
            {type === 'bar' &&
            <div className={'containerGraphicsBar'}>
                <div className={'headerContainerGraphic'}>
                    <span className={'textHeaderContainerGraphic'}>{title}</span>
                </div>
                <div className={'containerGraphic'}>
                    <Chart
                        chartType={'Bar'}
                        data={data1}
                        width={'100%'}
                    />
                </div>
            </div>
            }
        </>


    )
}

export default ContainerGraphics;
