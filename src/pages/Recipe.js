import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import {apiCall} from '../utils'
import ClockIcon from '../assets/icons/clock.svg'
import PlateIcon from '../assets/icons/plate.svg'

import ParseEditorJs from '../components/ParseEditorJs'

const StyledRecipeHeader = styled.div`
    display:flex;
    flex-wrap: wrap;
    margin-top:30px;
    .image_container {
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

    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        
        async function getRecipeData() {
            const res = await apiCall(`/recipes/${id}`)         
            setRecipe(res.data)
            console.log(res.data);
        }
        getRecipeData()

    }, [])

    return (
        <div>
            {recipe && 
            <>
            <StyledRecipeHeader>
                <div className='image_container'>
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
                        {recipe.createdAt && timeAgo.format(new Date(recipe.createdAt))}
                    </div>
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
