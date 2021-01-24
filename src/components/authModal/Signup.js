import React, {useState} from 'react'
import styled from 'styled-components'
import {toast} from 'react-toastify'

import {StyledInputGroup} from '../../styles/StyledInputGroup'
import Button from '../../ui/Button'

import {useModalsContext, useAuthContext} from '../../context'
import {apiCall} from '../../utils'

const StyledWrapper = styled.form`

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

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    let {setAuthModal} = useModalsContext()
    let {user, setUser} = useAuthContext()

    const submitHandler = async (e) => {
        e.preventDefault()        

        if(name != '' && email == '' && password == '') {
            return toast.error('Please fill all input fields')
        }
        setLoading(true)
        const body = JSON.stringify({name, email, password})
        try {
            const {success, token, error} = await apiCall('/auth/register', {body})  
            if(success) {
                localStorage.setItem('token', token)  
            }else{
                setLoading(false)    
                localStorage.removeItem('token')  
                return toast.error(error)                
            }
            
        }catch(err) {                        
            setLoading(false)    
            return toast.error(err.message)                    
        }

        const {success, data} = await apiCall('/auth/me')

        if(success) {
            setUser(data)
        }else{
            setLoading(false)    
            return toast.error('A invalid token provided')
        }        

        setLoading(false)            
        setAuthModal('login', false)
        return toast.success('Successful login')
    }

    return (
        <StyledWrapper onSubmit={submitHandler}>
            <h2>Sign Up</h2>
            <StyledInputGroup>
                <label htmlFor="">Name</label>
                <input onInput={(e) => setName(e.target.value.trim())} type="text" placeholder='John Doe' value={name} required/>
            </StyledInputGroup>
            <StyledInputGroup>
                <label htmlFor="">E-mail</label>
                <input onInput={(e) => setEmail(e.target.value.trim())} type="text" placeholder='john.doe@email.com' value={email} required/>
            </StyledInputGroup>
            <StyledInputGroup>
                <label htmlFor="">Password</label>
                <input onInput={(e) => setPassword(e.target.value.trim())} type="password" placeholder='******' required value={password}/>
            </StyledInputGroup>

            <Button style={{margin: '20px auto'}} loading={loading}>SignUp</Button>

            <div className='bottom'>Already have an account? <a onClick={() => setAuthModal('login', true)}>Login!</a></div>
        </StyledWrapper>
    )
}

export default Signup
