import React, { useState, useRef, useEffect } from 'react';
import './articles.css';
import {useNavigate} from 'react-router-dom';
import AddButton from '../../components/addButton/addButton.component';
import ArticleComponent from '../../components/article/article.component';
import { PostService } from '../../services/mbc.service';
import {deletePost} from '../../services/posts.service';
import {message} from 'antd';
//import { name } from 'ejs';

const Articles = () => {
    const navigate = useNavigate();
    const [sections, setSections] = useState([]);

    useEffect(() => {
        fetchSectionArticles();
    }, []);

    const fetchSectionArticles = async () => {
        try {
            const data = await PostService.getAll()
            setSections(data);
            console.log('POSTS ENCONTRADOS', data);
        } catch (error) {
            console.error('Error al obtener los coaches:', error);
        }
    };

    const removePost = (idPost) => {
        deletePost(idPost).then(res => {
            console.log('Post eliminado con exito', res.data);
            fetchSectionArticles();
            message.success('Post eliminado con exito.')
        }).catch(err => {
            console.log('ERROR al eliminar el post', err);
        })
    }

    return (
        <div className={'containerArticles'}>
            <p className='titleArticles'>Artículos</p>

            <p className={'descriptionArticles'}>Aquí encontrarás las ultimas actualizaciones acerca de las mejores practicas coaching asi como comunicaciones de importantes de la empresa</p>

            <div className='articleAddButton'>
                <AddButton text={"Agregar Seccion"} press={() => navigate('/addSection')}></AddButton>
            </div>

            <div className={'containerItemArticles'}>
                <div className={'articleComponent'}>
                    {sections.map((section, index) => (
                        <ArticleComponent section={section} idPost={value => removePost(value)}></ArticleComponent>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Articles;
