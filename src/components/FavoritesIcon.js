import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import {useAuthContext} from '../context'


const StyledWrapper = styled.div`
    position: absolute;
    top: 0px;left:0px;
    width:50px;
    height:50px;
    background: rgba(255,255,255,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;    
    border-bottom-right-radius: 12px;
    .material-icons {
        font-size: 30px;
        color: ${({theme}) => theme.primaryColor};
    }
`


const FavoritesIcon = ({recipe}) => {

    const {user} = useAuthContext()

    const [favs, setFavs] = useState(localStorage.getItem(`${user._id}_favs`) ? JSON.parse(localStorage.getItem(`${user._id}_favs`)) : [])

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {        
        if(favs.length > 0) {
            let f = favs.find(f => f._id == recipe._id)

            if(f) {
                setIsFavorite(true)
            }else{
                setIsFavorite(false)
            }
        }

    }, [])

    const addFav = () => {
        console.log('add');
        const favsCopy = [...favs, recipe]
        setFavs(favsCopy)
        localStorage.setItem(`${user._id}_favs`, JSON.stringify(favsCopy))
        setIsFavorite(true)
    }

    const removeFav = () => {        
        const favsCopy = favs.filter(f => f._id !== recipe._id)
        setFavs(favsCopy)
        localStorage.setItem(`${user._id}_favs`, JSON.stringify(favsCopy))
        setIsFavorite(false)
    }

    return (
        <>
            {
                isFavorite ? 
                <StyledWrapper onClick={removeFav} className='favorites_icon'>
                    <span  className="material-icons">
                        favorite
                    </span>
                </StyledWrapper>
                :
                <StyledWrapper onClick={addFav} className='favorites_icon'>
                    <span  className="material-icons">
                        favorite_border
                    </span>
                </StyledWrapper>
            }
        </>
    )
}

export default FavoritesIcon
