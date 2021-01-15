import React from 'react'
import {StyledBtn} from '../styles/StyledBtn'


const Button = ({loading = false, onClick, children, ...rest}) => {
    return (
        <StyledBtn onClick={onClick} disabled={loading} {...rest}>
            {children}
            {loading && 
                <span className="material-icons" style={{marginLeft:'5px'}}>
                    cached
                </span>
            }
        </StyledBtn>
    )
}

export default Button
