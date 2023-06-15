import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'http://82.223.37.251:8000/api/', responseType: 'json'});

/**
 * Iniciar sesion
 * */
export const login = (email, pass) => {
    const headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return new Promise((resolve, reject) => {
        axiosInstance.post('login', {email: email, password: pass}, {headers}).then(res => {
            console.log('THEN LOGIN', res)
            console.log(res.data.user.token)
            localStorage.setItem('token', res.data.user.token);
            localStorage.setItem('USER', JSON.stringify(res.data.user));
            resolve(res);
        }).catch(err => {
            console.log('CATCH LOGIN')
            reject(err);
        })
    })
}

/**
 * Cerrar sesion
 * */
export const logout = async () => {
    console.log("logout")
    console.log(localStorage.getItem('token'))
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get('logout', {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Recoge el perfil del usuario
 * */
export const getProfile = () => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get('my_profile', {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
