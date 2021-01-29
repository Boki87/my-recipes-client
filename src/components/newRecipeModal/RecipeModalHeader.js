import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import {StyledInputGroup} from '../../styles/StyledInputGroup'
import {CategoryBtn} from '../categoryFilter/CategoryFilter'

import {categoriesIcons} from '../../utils'

import {apiCall} from '../../utils'

const StyledHeader = styled.div`
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .inputs_container {
        max-width: 500px;
        min-width: 300px;        
    }

    .image_container {        
        width: 200px;
        height:200px;
        border-radius: 12px;
        background: ${({theme}) => theme.primaryColor};
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({theme}) => theme.bgSecondary};
        position: relative;
        overflow: hidden;
        img {
            object-fit: cover;
            min-width:100%;
            min-height:100%;
            width:100%;
            z-index: 1;
        }

        label {
            height:30px;
            width:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            background: rgba(0,0,0,0.6);
            cursor: pointer;
            position: absolute;
            top: 45%;
            left: 0px;
            &:hover {
                text-decoration: underline;
            }
            z-index: 2;
        }
    }

    @media screen and (max-width: 799px) {
        .inputs_container {
            order: 2;        
        }

        .image_container {   
            order: 1;
        }
`

const RecipeModalHeader = ({name, photo, category, preparationTime, numberOfServings, changeHandler, setPhoto}) => {

    const photoChangeHandler = (e) => {        
        if(e.target.files[0]) {            
            const reader = new FileReader()

            reader.onload = function(e) {
                setPreviewPhoto(e.target.result)
            }

            reader.readAsDataURL(e.target.files[0])

            setPhoto(e.target.files[0])
        }else{
            setPreviewPhoto(null)
            setPhoto('')
        }
    }

    useEffect(() => {
        //getting photo from the api 
        if(photo != '' && typeof(photo) !== 'object') {
            if(photo.startsWith('http')) {
                setPreviewPhoto(photo)
            }
        }
    }, [photo])

    const [previewPhoto, setPreviewPhoto] = useState(null)

    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function getCategories() {
            let res = await apiCall('/categories')
            
            if(res.success) {
                setCategories(res.data)
            }
        }
        getCategories()
    }, [])

    return (
        <StyledHeader>

            <div className='inputs_container'>
                <StyledInputGroup>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Some Awesome Recipe Name' value={name} onChange={(e) => changeHandler('name', e.target.value)} style={{width:'300px'}} required/>
                </StyledInputGroup>

                <div style={{display:'flex', flexWrap: 'wrap', marginTop:'30px'}}>
                    {categories.length > 0 && categories.map(cat => 
                        <CategoryBtn onClick={(e) => changeHandler('category', cat._id)} active={category} id={cat._id} title={cat.name} icon={categoriesIcons[cat.name]} key={`iconBtn${cat.name.split(" ").join('_')}`}/>
                    )}
                </div>

                <div style={{display:'flex', width: '100%', marginTop:'30px'}}>
                    <StyledInputGroup style={{width:'150px'}}>
                        <label htmlFor="">Prep Time (min)</label>
                        <input type="number" min='1' placeholder='1 min' value={preparationTime} onChange={(e) => changeHandler('preparationTime', e.target.value)} style={{width:'100px'}} required/>
                    </StyledInputGroup>
                    <StyledInputGroup style={{width:'150px'}}>
                        <label htmlFor="">Num. Of Servings</label>
                        <input type="number" min='1' placeholder='2' value={numberOfServings} onChange={(e) => changeHandler('numberOfServings', e.target.value)} style={{width:'100px'}} required/>
                    </StyledInputGroup>
                </div>
            </div>

            <div className='image_container'>
                {previewPhoto && <img src={previewPhoto} alt=""/> }
                <label htmlFor="photo">Select photo to upload</label>
                <input onChange={photoChangeHandler} type="file" id='photo' style={{display:'none'}}/>
            </div>
        </StyledHeader>
    )
}

export default RecipeModalHeader
