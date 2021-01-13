import React from 'react'
import styled from 'styled-components'

import {StyledInputGroup} from '../../styles/StyledInputGroup'
import {StyledBtn} from '../../styles/StyledBtn'

import {useModalsContext} from '../../context'

const StyledWrapper = styled.div`

    .forgotPassContainer {
        display: flex;
        justify-content: flex-end;
        color: ${({theme}) => theme.textSecondary};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
            color: ${({theme}) => theme.primaryColor};
        }
    }

    .bottom {
        color: ${({theme}) => theme.textSecondary};
        text-align: center;
        a {
            color: ${({theme}) => theme.secondaryColor};
            cursor: pointer;
            &:hover {
                text-decoration: underline;
                color: ${({theme}) => theme.primaryColor};
            }
        }
    }

`

const Login = () => {

    let {setAuthModal} = useModalsContext()

    return (
        <StyledWrapper>
            <h2>Login</h2>
            <StyledInputGroup>
                <label htmlFor="">E-mail</label>
                <input type="text" placeholder='john.doe@email.com'/>
            </StyledInputGroup>
            <StyledInputGroup>
                <label htmlFor="">Password</label>
                <input type="password" placeholder='******'/>
            </StyledInputGroup>

            <div className='forgotPassContainer'>
                <span>Forgot password?</span>
            </div>

            <StyledBtn style={{margin: '20px auto'}}>Login</StyledBtn>

            <div className='bottom'>You don't have an account? <a onClick={() => setAuthModal(true, 'signup')}>Sign up!</a></div>
        </StyledWrapper>
    )
}

export default Login
