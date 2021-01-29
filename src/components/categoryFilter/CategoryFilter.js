import React, {useEffect, useState} from 'react'
import styled, {createGlobalStyle, css} from 'styled-components'
import {useLocation} from 'react-router-dom'

import {categoriesIcons} from '../../utils'

import {apiCall} from '../../utils'
import {useRecipeContext} from '../../context'

export const StyledCatBtn = styled.div`
    min-width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 5px 10px;
    background: ${({theme}) => theme.primaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        height: 50px;
    }
    ${(props) => props.active && props.active == props.id && 
        css`            
            background: ${({theme}) => theme.secondaryColor};
        `
    }
`

export const CategoryBtn = ({id, icon, active, onClick}) => {    
    return (
        <StyledCatBtn onClick={onClick} active={active} id={id}>
            <img src={icon} alt=""/>
        </StyledCatBtn>
    )
}


const StyledCategoryFilterWrapper = styled.div`
    min-height: 60px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
   
`

const StyledH = styled.div`    
    display: flex;
    justify-content: center;
    margin-top: 20px;    
    margin-bottom: 10px;
`

const CategoryFilter = () => {

    let location = useLocation()

    const [categories, setCategories] = useState([])

    const [selectedCat, setSelectedCat] = useState('')


    const {setCategoryQuery} = useRecipeContext()


    let [route, setRoute] = useState('')

    useEffect(() => {
        //reset category query on route change
        if(route != location.pathname) {            
            setRoute(location.pathname)
            setSelectedCat('')
            setCategoryQuery('')            
        }
    }, [location.pathname])

    const setCategory = (id) => {
        if(selectedCat == id) {
            setSelectedCat('')
            setCategoryQuery('')
        }else{
            setSelectedCat(id)
            setCategoryQuery(id)
        }
    }

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
        <>
            <StyledH>Filter by category</StyledH>
            <StyledCategoryFilterWrapper>
                
                {categories.map(cat => 
                    <CategoryBtn title={cat.name} active={selectedCat} onClick={() => setCategory(cat._id)} id={cat._id} icon={categoriesIcons[cat.name]} key={`iconBtn${cat.name.split(" ").join('_')}`}/>
                )}
            </StyledCategoryFilterWrapper>
        </>
    )
}

export default CategoryFilter
