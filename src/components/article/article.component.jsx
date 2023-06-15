import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './articleComponent.css';
import {IconAssets} from '../../utils/ImageAssets';

import DotQuantity from '../dotQuantity/dotQuantity.component';
import moment from 'moment';
import AddButton from "../addButton/addButton.component";

const ArticleComponent = ({section, press, idPost}) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const subarticles = [
        {
            title: 'Title',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
        },
        {
            title: 'Title',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
        },
        {
            title: 'Title',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
        },
        {
            title: 'Title',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
        },
        {
            title: 'Title',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
        },
    ]

    return (
        <div className={'containerCompleteArticleComponent'}>
            <div className={'containerArticleComponent'} onClick={() => setOpen(!open)}>

                <div className={'containerDetailsArticleComponent'}>
                    <div className={'detailsArticleComponent'}>
                        <p className={'titleArticleComponent'}>{section.name}</p>
                        <p className={'descriptionArticleComponent'}>{section.description}</p>
                    </div>

                    <div className={'detailsDateArticleComponent'}>
                        <p className={'dateArticleComponent'}>{moment(section.createdAt).format('DD/MM/yyyy')}</p>
                        {/*<DotQuantity />*/}
                    </div>

                    <img className={'iconArticleComponent'} src={open ? IconAssets.up : IconAssets.down}/>
                </div>
            </div>
            {open &&
                <div className={'containerSubarticlesArticlesComponent'}>

                    <div className={'subarticleArticleComponent'} onClick={() => navigate('/addArticle', {state: {id: section.id}})}>
                        <div className='addButtonArticleComponent'>
                            <img className={'iconMenuItemArtcileComponent'} src={IconAssets.add}/>
                            <p className={'textItemArticleComponent'}>{'Agregar Artículo'}</p>
                        </div>
                    </div>

                    {section.Posts.map((subarticle, index) => {
                        return (
                            <div className={index === subarticles.length + 2  ? 'lastSubarticleArticleComponent' : 'subarticleArticleComponent'}>
                                <div className={'subarticleTextArticleComponent'} onClick={() => navigate('/article', {state: {subarticle: subarticle}})}>
                                    <p className={'titleSubarticleArticleComponent'}>{subarticle.title}</p>
                                    <p className={'subtitleSubarticleArticleComponent'}>{subarticle.description}</p>
                                </div>

                                {/*<img className={'iconSubarticleArticleComponent'} src={IconAssets.right}/>*/}
                                <button className={'buttonDeleteArticle'} onClick={() => idPost(subarticle.id)}>
                                    Eliminar
                                </button>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </div>

    )
}

export default ArticleComponent;
