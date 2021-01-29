import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {toast} from 'react-toastify'

import StarRating from '../components/StarRating'

import {apiCall} from '../utils'
import ClockIcon from '../assets/icons/clock.svg'
import PlateIcon from '../assets/icons/plate.svg'

import ParseEditorJs from '../components/ParseEditorJs'
import {useAuthContext} from '../context'


import FavoritesIcon from '../components/FavoritesIcon'


const StyledRecipeHeader = styled.div`
    display:flex;
    flex-wrap: wrap;
    margin-top:30px;
    .image_container {

        position: relative;
        width: 300px;
        min-width: 300px;
        height:300px;
        background: ${({theme}) => theme.secondaryColor};
        margin: 10px;
        border-radius: 12px;
        overflow: hidden;
        img {
            width: 100%;
            min-height:100%;
            object-fit: cover;
        }
    }

    .recipe_details {
        margin: 10px;
        min-width: 300px;
        .prep_serv_info {
            display:flex;
            
            div {
                display:flex;
                align-items: center;
                margin-right:15px;
                img {
                    height: 30px;
                    margin-right: 10px;
                }
                span {

                }            
            }
        }

    }
`

const StyledIngredients = styled.div`

    width:100%;
    min-height:200px;
    background: ${(props) => props.theme.bgPrimary};
    border-radius: 12px;
    margin: 20px 0px;
    position: relative;
    padding: 30px 20px 20px 20px;

    ul {
        list-style: none;
        padding: 0;
        margin: 10px 0px;
    }

    li {
        padding-left: 1.3rem; 
        text-indent: -.7rem;
        margin: 5px 0px;
    }

    li::before {
        content: "• ";
        color: ${(props) => props.theme.primaryColor}; /* or whatever color you prefer */
    }
`

const StyledSectionTitle = styled.div`
        width:150px;
        display:flex;
        align-items: center;
        justify-content: center;
        padding: 0px 10px;
        height: 50px;
        font-size: 1.3rem;
        color: ${(props) => props.theme.bgSecondary};
        background: ${(props) => props.theme.primaryColor};
        border-radius: 8px;
        position: absolute;
        top: -20px;
        left: 10px;
`

const StyledInstructions = styled.div`
    width:100%;
    min-height:200px;
    background: ${(props) => props.theme.bgPrimary};
    border-radius: 12px;
    margin: 20px 0px;
    position: relative;
    padding: 30px 20px 20px 20px;

    ol {
        margin: 10px 10px 10px 40px;
    }

    ul {
        margin: 10px 10px 10px 40px;
    }
`

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const Recipe = () => {

    var {id} = useParams()

    const {user} = useAuthContext()

    const [recipe, setRecipe] = useState(null)
    const [rating, setRating] = useState(0)
    const [ratingId, setRatingId] = useState(null)

    useEffect(() => {
        
        async function getRecipeData() {

            try {
                const res = await apiCall(`/recipes/${id}`)         

                if(res.success) {

                    const ratingRes = await apiCall(`/recipes/${res.data._id}/rating`)

                    if(ratingRes.success) {
                        setRating(ratingRes.data.rating)
                        setRatingId(ratingRes.data._id)
                    }else{
                        setRating(0)
                        setRatingId(null)
                    }

                    setRecipe(res.data)                 

                }else{
                    return toast.error('Something went wrong')
                }


            }catch(err) {
                console.log(err);
                return toast.error('Coldn\'t fetch data for recipe. Please refresh')
            }
                        
        }
        getRecipeData()



    }, [])

    
    const ratingChangeHandler = async (index) => {
        
        const options = {}
        if(ratingId) {
            options.method = 'PUT'
            let body = JSON.stringify({
                rating: index
            })

            options.body = body
                        
        }else{
            options.method = 'POST'
            let body = JSON.stringify({
                rating: index,
                user: user._id,
                recipe: recipe._id
            })

            options.body = body
        }

        

        try {            
            const ratingRes = await apiCall(`/recipes/${recipe._id}/rating`, options)
    
            if(ratingRes.success) {
                setRatingId(ratingRes.data._id)
                setRating(ratingRes.data.rating)

                //backend need a bit more tome to calculate average rating
                // so giving it just a half a second breathing time 
                setTimeout(async () => {
                    const res = await apiCall(`/recipes/${id}`)
                    if(res.success) {                    
                        setRecipe(res.data)
                    }
                }, 500)
            }else{
                return toast.error('Could not set rating')    
            }
        }catch(err) {
            return toast.error('Could not set rating')
        }
        
    }    


    return (
        <div>
            {recipe && 
            <>
            <StyledRecipeHeader>
                <div className='image_container'>
                    <FavoritesIcon recipe={recipe} />
                    {recipe.photo && recipe.photo != 'no-photo.jpg' ?
                        <img src={`${process.env.REACT_APP_API}/uploads/${recipe.photo}`} alt=""/> :
                        <span>
                            No Image Available
                        </span>
                    }
                </div>
                <div className='recipe_details'>
                    <div className='prep_serv_info'>
                        <div>
                            <img src={ClockIcon} alt=""/>
                            <span>{recipe.preparationTime} min</span>
                        </div>
                        <div>
                            <img src={PlateIcon} alt=""/>
                            <span>{recipe.numberOfServings}</span>
                        </div>
                    </div>
                    <h1>{recipe.name}</h1>
                    <div>
                        {recipe.createdAt && <span style={{fontWeight:'bold'}}>{timeAgo.format(new Date(recipe.createdAt))}</span>} by <span style={{textTransform:'capitalize', fontWeight: 'bold'}}>{recipe.user.name}</span>
                    </div>

                    <div>
                        {
                            recipe.averageRating ? 
                            <span>Average rating: {Math.round(recipe.averageRating)}</span>
                            :
                            <span>Not rated yet</span>
                        }    
                    </div>

                    {user && recipe && user._id != recipe.user._id &&                         
                        <div>
                            <span>Your rating:</span>
                            
                                <StarRating 
                                    rating={rating}
                                    onChange={ratingChangeHandler}                           
                                />
                        </div>
                    }
                </div>
            </StyledRecipeHeader>

            <StyledIngredients>
                    <StyledSectionTitle>Ingredients</StyledSectionTitle>
                    <ul>
                        {recipe.ingredients && recipe.ingredients.map(i => <li key={i}>{i}</li>)}
                    </ul>
            </StyledIngredients>

            <StyledInstructions style={{marginTop:'40px'}}>
                <StyledSectionTitle>Instructions</StyledSectionTitle>
                {recipe.preparationDescription != '' && 
                    <ParseEditorJs data={recipe.preparationDescription}/>                
                }
            </StyledInstructions>
            </>
            }
        </div>
    )
}

export default Recipe
