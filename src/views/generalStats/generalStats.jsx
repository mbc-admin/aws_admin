import React, {useEffect, useState} from 'react';
import {message} from 'antd';

import './generalStats.css';

import InputDateText from '../../components/inputDateText/inputDateText';
import Button from '../../components/button/button.component';
import CardStats from '../../components/cardStats/cardStats.component';
import ContainerGraphics from "../../components/containerGraphics/containerGraphics.component";

import {getGeneralStats} from "../../services/stats.service";
import {IconAssets} from "../../utils/ImageAssets";

const GeneralStats = () => {
    const [stats, setStats] = useState(null)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        getStats('', '')
    }, [])

    const getStats = (start, end) => {
        getGeneralStats(start, end).then(res => {
            console.log('Estadisticas generales recogidas con exito', res.data);
            setStats(res.data)
        }).catch(err => {
            console.log('ERROR al recoger las estadisticas generales', err);
        })
    }

    const applyFilters = () => {
        if (startDate !== null && endDate !== null) {
            getStats(startDate, endDate);
        } else {
            message.error('Rellena los filtros.')
        }
    }

    return (
        <div className={'containerGeneralStats'}>
            <p className={'titleGeneralStats'}>General</p>

            <div className={'containerFiltersGeneralStats'}>
                <div className={'containerDateFiltersGeneralStats'}>
                    <InputDateText changeValue={value => setStartDate(value)} oneData/>
                    <InputDateText changeValue={value => setEndDate(value)} oneData/>
                    <div style={{width: 150}}>
                        <Button text={'Aplicar'} press={() => applyFilters()}/>
                    </div>

                </div>
                <div>
                    <Button text={'Descargar datos'}/>
                </div>
            </div>

            {stats &&
            <>
                <div className={'containerCardsGeneralStats'}>
                    <CardStats value={stats.total_organizations} text={'Total Empresas'} icon={IconAssets.companiesStats}/>
                    <CardStats value={stats.total_employees} text={'Total Empleados'} icon={IconAssets.groupStats}/>
                    <CardStats value={stats.total_logins} text={'Total Logins'} icon={IconAssets.lockStats}/>
                    <CardStats value={stats.total_active_users} text={'Total Usuarios con una interaccion'} icon={IconAssets.profileStats}/>

                    <CardStats value={stats.reponse_time} text={'Tasa de respuesta'} icon={IconAssets.increaseStats}/>
                    {/*<CardStats value={stats.total_mau} text={'Total MAU'} icon={IconAssets.responseStats}/>*/}
                    <CardStats value={stats.total_sessions} text={'Total Sesiones terminadas'} icon={IconAssets.messageStats}/>
                    <CardStats value={stats.rating} text={'Valoracion de los coaches'} icon={IconAssets.starStats}/>
                    {/*<CardStats value={stats.rating} text={'Consultas realizadas'} icon={IconAssets.messageStats}/>*/}
                </div>

                <ContainerGraphics title={'Tipología de sesión'} data={stats.specialities_graph} type={'donut'}/>
            </>
            }
        </div>
    )

}

export default GeneralStats;
