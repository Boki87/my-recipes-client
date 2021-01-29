import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import styled from 'styled-components'

import NewRecipeModal from '../components/newRecipeModal/NewRecipeModal'
import AdminLayout from '../components/adminLayout/AdminLayout'
import CategoryFilter from '../components/categoryFilter/CategoryFilter'
import RecipeCard from '../components/RecipeCard'
import {useAuthContext, useModalsContext, useRecipeContext} from '../context'
import {apiCall} from '../utils'

const StyledRecipesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;    

    @keyframes spinner {
        to {transform: rotate(-360deg)}
    }

    .loader {
        animation: spinner 1.5s linear infinite;
        font-size: 3rem;
        color: ${({theme}) => theme.primaryColor};
    }
`

const StyledAddBtn = styled.button`
    width: 60px;
    height:60px;
    border-radius: 50%;
    background: ${({theme}) => theme.primaryColor};
    color: ${({theme}) => theme.bgSecondary};
    display:flex;
    justify-content: center;
    align-items:center;
    border: none;
    font-size: 2rem;
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 11;
`


const MyRecipes = () => {

    const {showNewRecipeModal, setNewRecipeModal} = useModalsContext()
    const {user} = useAuthContext()
    const {myRecipes, recipesLoading, getMyRecipes} = useRecipeContext()
    

    useEffect(() => {
        getMyRecipes(user._id)
    }, [])

    return (
        <AdminLayout>
            <CategoryFilter />
            <StyledRecipesWrapper>

                {recipesLoading && 
                    <span className="material-icons loader">
                        cached
                    </span>
                }

                {   
                    !recipesLoading && 
                    myRecipes &&
                    myRecipes.map(recipe =>      
                        <RecipeCard 
                            recipe={recipe}
                            key={recipe._id}
                        />                
                    )
                }

                {
                    !recipesLoading && myRecipes && myRecipes.length == 0 &&
                    
                    <p>
                        No recipes...
                    </p>
                    
                }


            </StyledRecipesWrapper>

            <StyledAddBtn onClick={() => setNewRecipeModal('Add', true)}>+</StyledAddBtn>

            <NewRecipeModal show={showNewRecipeModal}/>
        </AdminLayout>
    )
}

export default MyRecipes
