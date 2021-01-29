import React from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';


const StarRating = ({maxRating = 5, rating = 0, onChange, readOnly = false, style={}}) => {

    const setRating = (index) => {
        if(!readOnly) {
            onChange(index + 1)
        }
    }

    return (
        <StyledWrapper style={style}>
            {[...Array(maxRating)].map((star, i) => {
                return (
                    <span onClick={() => setRating(i)} className="material-icons" key={uuidv4()}>
                        {i < rating ?
                            'star'
                            :
                            'star_border'
                        }
                        
                    </span>
                )
            })}
        </StyledWrapper>
    )
}

export default StarRating


const StyledWrapper = styled.div`

    min-width: 300px;
    height: 30px;
    display: flex;
    
    .material-icons {
        margin: 0px 2px;
        color: ${({theme}) => theme.secondaryColor};
        cursor: pointer;
    }
`