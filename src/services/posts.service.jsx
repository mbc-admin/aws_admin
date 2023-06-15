import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'https://node.innobing.net/api/'});


/**
 * Crea una categoria de post
 * */
export const createPostCategory = async (name, description) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    const data = {
        name: name,
        description: description
    }

    return new Promise((resolve, reject) => {
        axiosInstance.post(`post_categories`, data, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Crea un articulo de una categoria
 * */
export const createPost = async (title, description, idPostCategory, file) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    }

    const data = {
        title: title,
        description: description,
        post_category_id: idPostCategory,
        file: file
    }

    return new Promise((resolve, reject) => {
        axiosInstance.post('posts', data, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Elimina un articulo
 * */
export const deletePost = async (idPost) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return new Promise((resolve, reject) => {
        axiosInstance.post(`posts/${idPost}`, {},  {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
