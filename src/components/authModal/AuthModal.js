import React from 'react'
import styled from 'styled-components'

import Modal from '../modal/Modal'
import Login from './Login'
import Signup from './Signup'

import {useModalsContext} from '../../context'

const StyledWrapper = styled.div`

    width: 400px;
    min-height:400px;
    padding: 20px;

`

const AuthModal = ({show}) => {

    let {authType, setAuthModal} = useModalsContext()

    const closeModal = () => {
        setAuthModal('login', false)
    }

    return (
        <Modal show={show} onClose={closeModal}>
            <StyledWrapper>
                {authType == 'login' ? 
                    <Login /> 
                    :
                    <Signup />
                }
                    
            </StyledWrapper>
        </Modal>
    )
}

export default AuthModal
