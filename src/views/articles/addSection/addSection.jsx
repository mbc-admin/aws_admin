import './addSection.css';
import {useNavigate} from 'react-router-dom';
import AddButton from '../../../components/addButton/addButton.component';
import InputText from '../../../components/inputText/inputText.component';
import Button from '../../../components/button/button.component';
import React, { useState, useRef } from 'react';
import TopNavBar from '../../../components/topNavBar/topNavBar.component';

import {createPostCategory} from '../../../services/posts.service'
import {message} from "antd";

const AddSection = () => {
    const navigate = useNavigate();
    const initialState =
        {
            name: '',
            description: '',
        }
    const [formData, setFormData] = useState(initialState);
    const formRef = useRef();

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChange = (event) => {
        if (event.target.value.length <= 500) {
            setFormData({ ...formData, description: event.target.value });
            formData.description = event.target.value
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createPostCategory(formData.name, formData.description).then(res => {
            console.log('Post category creado con exito', res.data);
            message.success('Articulo creado con exito.')
            navigate('/articles');
        }).catch(err => {
            console.log('ERROR al crear la post category', err);
        })
        /*e.preventDefault();
        // const validationErrors = validate();
        //  if (Object.keys(validationErrors).length === 0) {
        console.log('Procesar el envío del formulario:', formData);
        try {
            // const response = await UserService.create(formData);
            //resetForm()
        } catch (error) {
            console.error(error);
        }
        // } else {
        //   setErrors(validationErrors);
        // }*/
    };

    return (
        <div className={'containerArticlesSection'}>
            <TopNavBar text="Agregar sección"></TopNavBar>
            <div className={'containerBody'}>
                <p className='titleArticles'> Agregar sección</p>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <h3 className='left-align'>Nombre</h3>
                    <div className='form-field'>
                        <InputText placeholder="Nombre"
                                   name="name"
                                   value={formData.name} changeValue={handleChange}> </InputText>
                    </div>
                    <h3 className='left-align'>Descripción</h3>
                    <div>
            <textarea className="description-articles"
                      id="description"
                      name="description"
                      maxLength={500}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Escribe una descripción profesional.."
                      rows={5}
                      cols={50}
            />
                        <div>
                            <small>{formData.description.length}/500</small>
                        </div>
                    </div>
                    {/*<div className='articleAddButton'>
                        <AddButton text={"Agregar Articulo"}  press={() => navigate('/addArticle')}></AddButton>
                    </div>*/}
                    <div className='center'>
                        <Button text="Guardar" type="submit" ></Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddSection;
