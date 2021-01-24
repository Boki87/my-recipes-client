import {useEffect, useState} from 'react'
import styled from 'styled-components'

import CategoryFilter from '../components/categoryFilter/CategoryFilter'
import RecipeCard from '../components/RecipeCard'

import {useModalsContext, useAuthContext, useRecipeContext} from '../context'

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

const StyledHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    .brand {
        color: ${({theme}) => theme.primaryColor};
        text-decoration: underline;
    }
`

const Home = () => {

    const {recipes, getRecipes, recipesLoading} = useRecipeContext()

    let {setAuthModal} = useModalsContext()
    let {user} = useAuthContext()

    useEffect( () => {
        getRecipes()
    }, [])

    return (
        <div>
            {!user &&  
                <StyledHeader>
                    <p>Welcome to <span className='font2 brand'>My Recipes</span></p>
                    <p>Explore below a wast collection of user submitted recipes.</p>
                    <p>To submit your own <span onClick={() => setAuthModal('login', true)} className='link'>Login</span> or <span onClick={() => setAuthModal('signup', true)} className='link'>SignUp</span> if you don't have an account.</p>
                </StyledHeader>
            }

            <CategoryFilter />


            

            <StyledRecipesWrapper>

                {recipesLoading && 
                    <span className="material-icons loader">
                        cached
                    </span>
                }

                {!recipesLoading && recipes && recipes.map(recipe => 
                    <RecipeCard 
                        recipe={recipe}
                        key={recipe._id}
                    />
                )}
                
                {
                    !recipesLoading && recipes && recipes.length == 0 && 
                    <p>No Recipes found</p>
                }
                
            </StyledRecipesWrapper>
        </div>
    )
}

export default Home
