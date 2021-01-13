import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {apiCall} from '../utils'

import CategoryFilter from '../components/categoryFilter/CategoryFilter'
import RecipeCard from '../components/RecipeCard'

import {useModalsContext} from '../context'

const StyledRecipesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;    
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

    const [recipes, setRecipes] = useState([])

    let {setAuthModal} = useModalsContext()

    useEffect( () => {

        async function getRecipes() {
            const res = await apiCall('/recipes')
            setRecipes(res.data)
            console.log(res.data);
        }
        getRecipes()
    }, [])

    return (
        <div>
            <StyledHeader>
                <p>Welcome to <span className='font2 brand'>My Recipes</span></p>
                <p>Explore below a wast collection of user submitted recipes.</p>
                <p>To submit your own <span onClick={() => setAuthModal(true, 'login')} className='link'>Login</span> or <span onClick={() => setAuthModal(true, 'signup')} className='link'>SignUp</span> if you don't have an account.</p>
            </StyledHeader>

            <CategoryFilter />

            <StyledRecipesWrapper>
                {recipes && recipes.map(recipe => 
                    <RecipeCard 
                        recipe={recipe}
                        key={recipe._id}
                    />
                )}
                
            </StyledRecipesWrapper>
        </div>
    )
}

export default Home
