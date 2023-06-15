import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'https://railsmbc.innobing.net/stats/'});


/**
 * Recoge las estadisticas generales
 * */
export const getGeneralStats = async (startDate, endDate) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return new Promise((resolve, reject) => {
        axiosInstance.get(`general?startDate=${startDate}&endDate=${endDate}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}


/**
 * Recoge las estadisticas generales
 * */
export const getCoachStats = async (startDate, endDate, id) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return new Promise((resolve, reject) => {
        axiosInstance.get(`coach_services?startDate=${startDate}&endDate=${endDate}&coach_id=${id}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}


/**
 * Recoge las estadisticas de una empresa
 * */
export const getCompanyStats = async (startDate, endDate, organizationId, gender, age, departmentId) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return new Promise((resolve, reject) => {
        axiosInstance.get(`usage?startDate=${startDate}&endDate=${endDate}&organization_id=${organizationId}&gender=${gender}&age=${age}&department_id=${departmentId}`, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
