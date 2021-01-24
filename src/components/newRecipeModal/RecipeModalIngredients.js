import React, {useState} from 'react'
import styled from 'styled-components'

import {StyledInputGroup} from '../../styles/StyledInputGroup'
import Button from '../../ui/Button'

const StyledIngredients = styled.div`
    .new_ing_input {
        display:flex;
        .btn {
            height:45px;
            margin: 0px 10px;
            font-size: 1.5rem;
        }
    }

    .ingredients_container {
        margin: 10px 0px 30px;
    }
`

const StyledIngredient = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    cursor: pointer;
    .bullet {
        width: 12px;
        height:12px;
        border-radius: 50%;
        border: 3px solid ${({theme}) => theme.primaryColor};
        margin-right: 15px;
    }

    .title {
        width: 400px;
    }

    button {
        background: ${({theme}) => theme.primaryColor};
        color: ${({theme}) => theme.bgSecondary};
        border:none;
        border-radius: 4px;
        display: none;
        align-items: center;
    }

    &:hover {
        .title {
            text-decoration: underline;
        }

        button {
            display: flex;
        }
    }
`

function Ingredient({ingredient, delIng}) {

    return (
        <StyledIngredient>
            <div className='bullet'></div>
            <div className='title'>
                {ingredient}
            </div>
            <button onClick={delIng}>
                <span className="material-icons">
                    close
                </span>
            </button>
        </StyledIngredient>
    )
}


const RecipeModalIngredients = ({ingredients, addIngredient, deleteIngredient}) => {

    const [ingredient, setIngredient] = useState('')

    const addIngredientHandler = () => {        
        if(ingredient.trim() == '') return        
        addIngredient(ingredient)
        setIngredient('')
    }

    const deleteIngredientHandler = (index) => {        
        deleteIngredient(index)
    }

    return (
        <StyledIngredients>

                <StyledInputGroup>
                    <label htmlFor="">Add Ingredient</label>
                    <div className='new_ing_input'>
                        <input type="text" placeholder='Ingredient XYZ' value={ingredient} onChange={(e) => setIngredient(e.target.value)} style={{width:'300px'}} required/>
                        <Button onClick={addIngredientHandler} className='btn'>+</Button>
                    </div>
                </StyledInputGroup>


                <div className='ingredients_container'>

                    {ingredients.map((ing, i) => <Ingredient ingredient={ing} delIng={() => deleteIngredientHandler(i)} key={`${i}-${ing}`}/>)}

                </div>
        </StyledIngredients>
    )
}

export default RecipeModalIngredients
