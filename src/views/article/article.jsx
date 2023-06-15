import React from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { saveAs } from "file-saver";

import './article.css';
import {ImageAssets, IconAssets} from '../../utils/ImageAssets';

import Button from '../../components/button/button.component';

const Article = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let article = location.state.subarticle;

    console.log('LOCATION', location.state.subarticle)

    const downloadFile = () => {
        saveAs(`https://node.innobing.net/${article.file}`)
    }

    return (
        <div className={'containerArticle'}>
            <div className={'containerGoBackArticle'} onClick={() => navigate('/articles')}>
                <img className={'iconGoBackArticle'} src={IconAssets.left}/>
                <p className={'goBackArticle'}>Volver</p>
            </div>

            <div className={'containerTitleArticle'}>
                <p className={'titleArticle'}>{article.title}</p>
                <div className={'containerButtonArticle'}>
                    <Button
                        text={'Descargar archivo'}
                        iconLeft={IconAssets.download}
                        press={() => downloadFile()}
                    />
                    {/*<Link className={'buttonArticle'} to={`https://node.innobing.net/${article.file}`} target="_blank" download>Descaragr</Link>*/}
                </div>
            </div>

            <p>{article.description}</p>

            <iframe className={'pdfArticle'} src={`https://node.innobing.net/${article.file}`+'#toolbar=0'} width={'100%'} height={'700px'}/>
        </div>
    )
}

export default Article;
