import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'https://node.innobing.net/api/'});

/**
 * Recoge los chats ya se hayan cerrado o esten activos (0 = cerrados || 1 = abiertos)
 * */
export const getConversations = async (status) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get(`channels?status=${status}`, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Recoge todos los chats si eres admin
 * */
export const getChats = async () => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get('channels_index_admin', {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
