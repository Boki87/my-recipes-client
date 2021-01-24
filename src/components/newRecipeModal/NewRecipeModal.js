import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {toast} from 'react-toastify'

import Modal from '../modal/Modal'
import {apiCall} from '../../utils'
import {useModalsContext, useRecipeContext, useAuthContext} from '../../context'



import RecipeModalHeader from './RecipeModalHeader'
import RecipeModalIngredients from './RecipeModalIngredients'
import RecipeModalDirections from './RecipeModalDirections'

import Button from '../../ui/Button'

export const StyledWrapper = styled.div`

    width: 90vw;
    max-width: 800px;
    min-height:90vh;
    padding: 20px;
    position: relative;
    .closeBtn {
        width: 30px;
        height:30px;
        border-radius: 50%;
        background: ${({theme}) => theme.primaryColor};
        color: ${({theme}) => theme.bgPrimary};
        position: absolute;
        top:5px;
        right: 5px;
        cursor: pointer;
        display:flex;
        align-items:center;
        justify-content: center;
    }

`
const NewRecipeModal = ({show}) => {

    const {getMyRecipes, recipeToEdit, setRecipeToEdit} = useRecipeContext()
    const {setNewRecipeModal, newRecipeModalState} = useModalsContext()
    useEffect(() => {
        if(recipeToEdit) {            
            async function getRecipe() {                
                try {
                    const res = await apiCall(`/recipes/${recipeToEdit}`)
                    
                    if(res.success) {
                        
                        let {
                            photo,
                            name,
                            category,
                            ingredients,
                            numberOfServings,
                            preparationTime,
                            preparationDescription
                        } = res.data

                        setRecipe({
                            name,
                            category: category._id,
                            ingredients,
                            numberOfServings,
                            preparationTime,
                            preparationDescription: preparationDescription != '' ? JSON.parse(preparationDescription) : {}
                        })

                        setPhoto(`${process.env.REACT_APP_API}/uploads/${photo}`)
                    }else{
                        return toast.error('Something went wrong getting the recipe data')
                    }
                }catch(err) {
                    console.log(err);
                }
            }

            getRecipe()
        }
    }, [recipeToEdit])

    
    const {user} = useAuthContext()

    

    const [loading, setLoading] = useState(false)

    const [photo, setPhoto] = useState('')

    const [recipe, setRecipe] = useState({        
        name: '',
        category: '',
        ingredients: [],
        numberOfServings: 1,
        preparationTime: 1,
        preparationDescription: null
    })

    


    const closeModal = () => {
        setPhoto('')
        setRecipe({
            name: '',
            category: '',
            ingredients: [],
            numberOfServings: 1,
            preparationTime: 1,
            preparationDescription: null
        })
        setNewRecipeModal('Add', false)
        setRecipeToEdit(null)
    }

    const changeHandler = (prop, val) => {
        const recipeCopy = {...recipe}
        recipeCopy[prop] = val
        setRecipe(recipeCopy)
    }

    const addIngredient = (item) => {
        const ingCopy = [...recipe.ingredients, item]
        changeHandler('ingredients', ingCopy)
    }

    const deleteIngredient = (index) => {
        const ingCopy = recipe.ingredients.filter( (item, i) => i != index)
        changeHandler('ingredients', ingCopy)
    }



    const submitHandler = async () => {

        
        if(recipe.name.trim() == '' || recipe.category == '') {            
            return toast.error('Please ad a name and select a category')
        }


        setLoading(true)
        try {
            let url = '/recipes'
            const body = JSON.stringify({...recipe, preparationDescription: JSON.stringify(recipe.preparationDescription)})
            
            let options = {
                body,
                method: 'POST'
            }
            if(recipeToEdit){
                options.method = 'PUT'
                url = `/recipes/${recipeToEdit}`
            }
 
            const res = await apiCall(url, options)
            
            if(res.success) {

                if(typeof(photo) === 'object' && photo != '') {                    
                    
                    
                    var formdata = new FormData();
                    formdata.append("file", photo, "tomato.jpeg");

                    var requestOptions = {
                        method: 'PUT',
                        body: formdata,
                        redirect: 'follow'
                    };

                    let uploadPhotoRes = await fetch(`${process.env.REACT_APP_API_BACKEND_URL}/recipes/${res.data._id}/photo`, requestOptions)
                    
                    let uploadPhoto = await uploadPhotoRes.json()
                    console.log(uploadPhoto);
                    if(uploadPhoto.success) {
                        console.log(uploadPhoto);
                    }else{
                        setLoading(false)
                        return toast.error(uploadPhoto.error)        
                    }

                }


                getMyRecipes(user._id)
                setLoading(false)
                closeModal()
                return toast.info('Recipe saved')
            }else{
                setLoading(false)
                console.log(res);
                return toast.error(res.error)
            }
        }catch (err) {
            setLoading(false)
            return toast.error(err.message)
        }

    }

    const deleteHandler = async () => {
        
        try{
            setLoading(true)
            const res = await apiCall(`/recipes/${recipeToEdit}`, {method: 'DELETE'})
            
            if(res.success) {

                getMyRecipes(user._id)
                setLoading(false)
                closeModal()
                toast.success('Recipe deleted successfully')
            }else{
                toast.error('Could not delete recipe, please try again')
            }

            setLoading(false)
        }catch(err) {
            setLoading(false)
            console.log(err);
            return toast.error(err.message)
        }
    }

    return (
        <Modal show={show} onClose={closeModal}>
            <StyledWrapper>
                    <div onClick={closeModal} className='closeBtn'>
                        <span className="material-icons">
                            close
                        </span>
                    </div>
                
                    <h1>{newRecipeModalState} Recipe</h1>

                    <RecipeModalHeader 
                        name={recipe.name}
                        photo={photo}
                        category={recipe.category}
                        preparationTime={recipe.preparationTime}
                        numberOfServings={recipe.numberOfServings}
                        changeHandler={changeHandler}
                        setPhoto={setPhoto}
                    />

                    <RecipeModalIngredients ingredients={recipe.ingredients} addIngredient={addIngredient} deleteIngredient={deleteIngredient}/>

                    {recipe.preparationDescription && 
                        <RecipeModalDirections directions={recipe.preparationDescription ? recipe.preparationDescription : {}} changeHandler={changeHandler}/>
                    }
                    
                    {
                        recipe.preparationDescription == null && 
                        <RecipeModalDirections directions={{}} changeHandler={changeHandler}/>
                    }
                    
                    
                    <div style={{display:'flex',justifyContent:'center'}}>

                        <Button onClick={submitHandler} style={{margin: '10px'}} loading={loading}>SUBMIT</Button>
                        {recipeToEdit && 
                            <Button onClick={deleteHandler} style={{margin: '10px',background:'#e4bb9c',color:'#fff'}} loading={loading}>                                
                                DELETE
                            </Button>
                        }
                    </div>
                
            </StyledWrapper>
        </Modal>
    )
}

export default NewRecipeModal
