import React, {useEffect, useState} from 'react';
import {message} from 'antd';

import './companiesStats.css';

import InputDateText from '../../components/inputDateText/inputDateText';
import Button from '../../components/button/button.component';
import CardStats from '../../components/cardStats/cardStats.component';
import ContainerGraphics from "../../components/containerGraphics/containerGraphics.component";
import CompaniesDropdown from "../../components/companiesDropdown/companiesDropdown";
import GeneralDropdown from "../../components/generalDropdown/generalDropdown.component";
import DepartmentDropdown from "../../components/departmentDropdown/departmentDropdown";

import {getCompanyStats} from '../../services/stats.service';
import {IconAssets} from "../../utils/ImageAssets";
import {OrganizationService} from "../../services/mbc.service";

const CompaniesStats = () => {
    const [stats, setStats] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [organizationId, setOrganizationId] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);

    const sexList = [
        {id: 0, name: 'Hombre'},
        {id: 1, name: 'Mujer'},
        {id: 2, name: 'Otro'},
    ];

    const agesList = [
        {id: 0, name: '18-24'},
        {id: 1, name: '25-34'},
        {id: 2, name: '35-44'},
        {id: 3, name: '45-54'},
        {id: 4, name: '55-64'},
        {id: 5, name: '65+'},
    ]

    useEffect(() => {
        getStats('', '', '', '', '', '');
    }, [])

    const getStats = (start, end, organizationId, gender, age, departmentId) => {
        getCompanyStats(start, end, organizationId, gender, age, departmentId).then(res => {
            console.log('Estadisticas recogidas con exito', res.data);
            setStats(res.data);
        }).catch(err => {
            console.log('ERROR al recoger las estadisticas', err);
        })
    }

    const applyFilters = () => {
        if ((startDate !== null && endDate !== null) || organizationId !== null || sex !== null || age !== null) {
            getStats(startDate, endDate, organizationId, sex, age, departmentId);
        } else {
            message.error('Rellena todos los filtros.');
        }
    }

    const fetchDepartments = async (companyId) => {
        try {
            const company = await OrganizationService.getById(companyId)
            console.log('THIS IS A ORGANIZATION', company)
            setDepartments(company.Departments)
        } catch (error) {
            console.error('Error al obtener los coaches:', error);
        }
    };

    return (
        <div className={'containerCompaniesStats'}>
            <p className={'titleGeneralStats'}>Uso de servicio</p>

            <div className={'containerFiltersCompaniesStats'}>
                <div style={{display: 'flex', flexDirection:'column', width: '70%'}}>
                    <div className={'containerDateFiltersCompaniesStats'}>
                        <InputDateText changeValue={value => setStartDate(value)} oneData/>
                        <InputDateText changeValue={value => setEndDate(value)} oneData/>
                        <CompaniesDropdown initialText={'Empresas'} onChange={value => {
                            console.log('value', value)
                            setOrganizationId(value.id)
                            fetchDepartments(value.id)
                        }}/>
                    </div>
                    <div style={{marginTop: 20}} className={'containerDateFiltersCompaniesStats'}>
                        <GeneralDropdown initialText={'Sexo'} options={sexList} onChange={value => setSex(value)}/>
                        <GeneralDropdown initialText={'Edad'} options={agesList} onChange={value => setAge(value)}/>
                        <DepartmentDropdown options={departments} initialText={'Departamentos'} onChange={value => setDepartmentId(value.id)} disabled={organizationId === null}/>
                    </div>

                </div>
                <div style={{width: '20%'}}>
                    <Button text={'Aplicar'} press={() => applyFilters()}/>
                </div>
            </div>

            {stats &&
            <>
                <div className={'containerCardsCompaniesStats'}>
                    <CardStats value={stats.total_employees} text={'Total Empleados'} icon={IconAssets.groupStats}/>
                    <CardStats value={stats.total_logins} text={'Total Logins'} icon={IconAssets.lockStats}/>
                    {/*<CardStats value={stats.mauAbsolute} text={'Total Usuarios'} icon={IconAssets.profileStats}/>*/}
                    <CardStats value={stats.total_mau} text={'Total MAU'} icon={IconAssets.responseStats}/>
                    <CardStats value={stats.total_sessions} text={'Total Sesiones'} icon={IconAssets.readerStats}/>
                </div>

                <ContainerGraphics title={'Tipología de sesión'} data={stats.specialities_graph} type={'donut'}/>
                {/*<ContainerGraphics title={'Gráfico comparativo Usuarios / Logins'} type={'bar'}/>*/}
            </>
            }

        </div>
    )
}

export default CompaniesStats;
