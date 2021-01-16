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

const Login = () => {

    const [email, setEmail] = useState('admin@myrecipes.com')
    const [password, setPassword] = useState('123456')
    const [loading, setLoading] = useState(false)

    let {setAuthModal} = useModalsContext()
    let {user, setUser} = useAuthContext()

    const submitHandler = async (e) => {
        e.preventDefault()        
        
        if(email == '' && password == '') {
            return toast.error('Please enter email and password')
        }
        setLoading(true)
        const body = {email, password}
        try {
            const {success, token} = await apiCall('/auth/login', {body})  
            console.log({success, token});
            if(success) {
                localStorage.setItem('token', token)  
            }else{
                localStorage.removeItem('token')  
                setLoading(false)  
                return toast.error('Email or password are incorrect')                
            }
            
        }catch(err) {            
            console.log(err);
            setLoading(false)            
            return toast.error(err.message)
        }

        const {success, data} = await apiCall('/auth/me')

        if(success) {
            localStorage.setItem('user', JSON.stringify(data))
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
            <h2>Login</h2>
            <StyledInputGroup>
                <label htmlFor="">E-mail</label>
                <input onInput={(e) => setEmail(e.target.value)} type="text" placeholder='john.doe@email.com' value={email} required/>
            </StyledInputGroup>
            <StyledInputGroup>
                <label htmlFor="">Password</label>
                <input onInput={(e) => setPassword(e.target.value)} type="password" placeholder='******' required value={password}/>
            </StyledInputGroup>

            <div className='forgotPassContainer'>
                <span>Forgot password?</span>
            </div>

            <Button type='submit' style={{margin: '20px auto'}} loading={loading}>Login</Button>

            <div className='bottom'>You don't have an account? <a onClick={() => setAuthModal('signup', true)}>Sign up!</a></div>
        </StyledWrapper>
    )
}

export default Login
