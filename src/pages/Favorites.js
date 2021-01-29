import React from 'react'
import styled from 'styled-components'
import AdminLayout from '../components/adminLayout/AdminLayout'
import RecipeCard from '../components/RecipeCard'

import {useAuthContext} from '../context'




const StyledRecipesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;    
    margin-top: 30px;
`


const Favourites = () => {

    const {user} = useAuthContext()

    const favs = localStorage.getItem(`${user._id}_favs`) ? JSON.parse(localStorage.getItem(`${user._id}_favs`)) : []

    return (
        <AdminLayout>
            <StyledRecipesWrapper>
                {
                    favs.length > 0 ?
                    favs.map(recipe =>      
                        <RecipeCard 
                            recipe={recipe}
                            key={recipe._id}
                        />                
                    )
                    :
                    <p>No recipes in favorites</p>
                }
            </StyledRecipesWrapper>
        </AdminLayout>
    )
}

export default Favourites
