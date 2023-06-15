import './addArticle.css';
import {useNavigate, useLocation} from 'react-router-dom';
import AddButton from '../../../components/addButton/addButton.component';
import InputText from '../../../components/inputText/inputText.component';
import Button from '../../../components/button/button.component';
import React, { useState, useRef } from 'react';
import { IconAssets } from '../../../utils/ImageAssets';
import TopNavBar from '../../../components/topNavBar/topNavBar.component';
import {createPost} from '../../../services/posts.service';
import {message} from 'antd';

const AddArticle = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const initialState =
        {
            name: '',
            description: '',
        }
    const [formData, setFormData] = useState(initialState);
    const [file, setFile] = useState(null);
    const formRef = useRef();
    let formDataFile = new FormData();

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
        console.log('1 ', formData.name)
        console.log('2 ', formData.description)
        console.log('3 ', formData.image)
        createPost(formData.name, formData.description, location.state.id, formData.image).then(res => {
            console.log('Post creado cone xito', res.data);
            message.success('Articulo creado con exito.')
            navigate('/articles');
        }).catch(err => {
            console.log('ERROR al crear el post', err);
        })
        /*// const validationErrors = validate();
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

    const handleFileChange = (e) => {
        const fileTarget = e.target.files[0];
        setFile(fileTarget)
        setFormData({ ...formData, image: fileTarget });
        console.log("handleFileChange")
        if (fileTarget) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result)
                //setPreview(reader.result);
            };
            reader.readAsDataURL(fileTarget);
        } else {
            //setPreview(null);
        }
    };

    /*const changeImage = async (value) => {
        console.log('AAAAA', value.target.files[0])
        let file = document.getElementById('inputFile').files[0];
        let objectURL = URL.createObjectURL(file);

        await formDataFile.append('file', value.target.files[0]);
        console.log('OBJECTURL', objectURL)
        setFile(formDataFile)

        /!*editProfileImage(formData).then(res => {
            getUserProfile();
            console.log('Imagen de perfil editada con exito', res);
        }).catch(err => {
            console.log('ERROR al editar la imagen de perfil', err);
        })*!/
    }*/

    return (
        <div className={'containerAddArticles'}>
            <TopNavBar text="Agregar articulo"></TopNavBar>
            <div className={'containerBody'}>
                <p className='titleArticles'> Agregar Articulo</p>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <h3 className={'left-align'}>Nombre</h3>
                    <div className='form-field'>
                        <InputText placeholder="Nombre"
                                   name="name"
                                   value={formData.name} changeValue={handleChange}> </InputText>
                    </div>
                    <h3 className={'left-align'}>Descripción</h3>
                    <div>
            <textarea className="description-articles"
                      id="description"
                      name="description"
                      maxLength={500}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Escribe una descripción del articulo.."
                      rows={5}
                      cols={50}
            />
                        <div>
                            <small>{formData.description.length}/500</small>
                        </div>
                    </div>
                    <div className='articleAddButton'>
                        <input id={'inputFile'} type={'file'} onChange={value => handleFileChange(value)}/>
                        {/*<AddButton icon={IconAssets.upload} text={"Subir Archivo"}  press={() => navigate('/addSection')}></AddButton>*/}
                    </div>
                    <div className='center'>
                        <Button text="Guardar" type="submit" ></Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddArticle;
