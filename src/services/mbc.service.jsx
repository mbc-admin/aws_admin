// services/apiService.js
import axios from 'axios';

const API_URL = 'http://82.223.37.251:8000/api';


export const apiPath = {
    PATH: {
      login: '/login',
      my_profile: '/my_profile',
      update_profile_image: '/update_profile_image',
      change_user_password: '/change_user_password',
      send_fcm_token : '/devices',
    }
  }

 export const mbcApi = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type':  'multipart/form-data',
    },
  });

  export const mbcApiMultiPart = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  mbcApiMultiPart.interceptors.request.use(
    async(config) =>  {
        let token = await localStorage.getItem('token')
        console.log("token:" + token)
        if(token ){
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    }
)


  mbcApi.interceptors.request.use(
    async(config) =>  {
        let token = await localStorage.getItem('token')
        console.log("token:" + token)
        if(token ){
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    }
)


export const mbcGet = async (path) => {
  try {
    const response = await mbcApi.get(path);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    throw error;
  }
};

export const mbcPost = async (path,postData) => {
  console.log('mbcPost')
  try {
    const response = await mbcApi.post(path, postData);
    console.error(response);
    return response.data;
  } catch (error) {
    console.error('Error al crear el post:', error);
    throw error;
  }
};

export const mbcUpdate = async (path,postId, postData) => {
  try {
    const response = await mbcApi.put(`${path}${postId}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    throw error;
  }
};

export const mbcPostDelete = async (path,postId) => {
  try {
    console.log("triying to delete")
    console.log(`${path}${postId}`)
    const response = await mbcApi.post(`${path}${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    throw error;
  }
};

export const mbcDelete = async (path,postId) => {
  try {
    console.log("triying to delete")
    console.log(`${path}${postId}`)
    const response = await mbcApi.delete(`${path}${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    throw error;
  }
};

export const mbcImageUpload = async (path, postData) => {
  try {
    const response = await mbcApiMultiPart.post(`${path}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    throw error;
  }
};

const ImageService = {
  upload: (data) => mbcImageUpload('/update_profile_image/', data),
}

const UserService = {
  getAll: () => mbcGet('/users_only'),
  create: (data) => mbcPost('/users', data),
  update: (id, data) => mbcUpdate('/users/',id, data),
  delete: (id) => mbcPostDelete('/users/', id),
};

const CoachService = {
  getAll: () => mbcGet('/coaches_only/'),
  getAvailable: () => mbcGet('/coaches/'),
  delete: (id) => mbcPostDelete('/users/', id),
  update: (id, data) => mbcUpdate('/users/',id, data),
  create: (data) => mbcPost('/users', data),
  addHours: (data) => mbcPost('/add_working_hours', data),
  deleteHours: (data) => mbcPost('/delete_working_hours', data)
};

const OrganizationService = {
  getAll: () => mbcGet('/organizations'),
  getById: (id) => mbcGet(`/organizations/${id}`),
  create: (data) => mbcPost('/organizations', data),
  delete: (id) => mbcPostDelete('/organizations/', id),
  update: (id, data) => mbcUpdate('/organizations/',id, data),
};

const DepartmentService = {
  getAll: () => mbcGet('/departments'),
  create: (data) => mbcPost('/departments/', data),
};

const SpecialtiesService = {
  getAll: () => mbcGet('/specialities'),
  create: (data) => mbcPost('/specialities/', data),
  delete: (id) => mbcPostDelete('/specialities/', id),
  update: (id, data) => mbcUpdate('/specialities/',id, data),
  addToUser: (data) =>  mbcPost('/add_user_speciality', data),
};

const PostService = {
    getAll: () => mbcGet('/post_categories'),
    create: (data) => mbcPost('/post_categories/', data),
};

const ChatService = {
    getChats: () => mbcGet('/channels_index_admin')
}


export { OrganizationService, DepartmentService, UserService, CoachService, SpecialtiesService, ImageService, ChatService, PostService };


