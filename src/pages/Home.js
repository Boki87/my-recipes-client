import {useEffect, useState} from 'react'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate'

import CategoryFilter from '../components/categoryFilter/CategoryFilter'
import RecipeCard from '../components/RecipeCard'

import {useModalsContext, useAuthContext, useRecipeContext} from '../context'



const StyledWrapper = styled.div`

.pagination_container {
        display:flex;
        list-style: none;
        justify-content: center;
        margin-top: 30px;
        margin-bottom:50px;
        li {
            width: 30px;
            height:30px;            
            border-radius: 4px;
            border: 1px solid ${({theme}) => theme.primaryColor};
            color: ${({theme}) => theme.primaryColor};;
            margin: 0px 3px;
            cursor: pointer;
            a {
                color: inherit;
                width:100%;
                height:100%;
                display:flex;
                justify-content:center;
                align-items:center;
                outline: none;
            }

            a:hover {
                color: inherit;
            }

        }

        li:hover {
            border: 1px solid ${({theme}) => theme.primaryColor};
            color: ${({theme}) => theme.primaryColor};
        }

        .active_pagination {
            color: #fff;
            background: ${({theme}) => theme.primaryColor};
            border: 1px solid ${({theme}) => theme.primaryColor};
            outline: none;
        }

        .active_pagination:hover {
            color: #fff;
        }
        
    }

`


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

    const {recipes, 
        getRecipes, 
        recipesLoading, 
        setNameQuery, 
        setCategoryQuery,  
        numOfPages,
        page,
        setPage} = useRecipeContext()

    let {setAuthModal} = useModalsContext()
    let {user} = useAuthContext()

    useEffect( () => {
        setNameQuery('')
        setCategoryQuery('')
        getRecipes()
    }, [])


    const paginationClickHandler = ({selected}) => {
        setPage(selected)
    }

    return (
        <StyledWrapper>
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
            
                <ReactPaginate                            
                        onPageChange={paginationClickHandler}
                        previousLabel={<span className="material-icons">navigate_before</span>}
                        nextLabel={<span className="material-icons">keyboard_arrow_right</span>}
                        containerClassName="pagination_container"
                        activeClassName={'active_pagination'}
                        pageCount={numOfPages}       
                        forcePage={page}             
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                    />
            
        </StyledWrapper>
    )
}

export default Home
