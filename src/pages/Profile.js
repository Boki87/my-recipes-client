import React, {useState} from 'react'
import styled from 'styled-components'
import AdminLayout from '../components/adminLayout/AdminLayout'
import Button from '../ui/Button'

import {StyledInputGroup} from '../styles/StyledInputGroup'

import {useAuthContext} from '../context'


const StyledForm = styled.form`
    width: 100%;
    max-width: 500px;
    min-height: 400px;
    background: ${({theme})=>theme.bgPrimary};
    border-radius: 12px;
    padding: 20px;
    margin: 30px auto 10px;
`

const Profile = () => {

    const {user} = useAuthContext()

    const [userDetails, setUserDetils] = useState({...user})
    
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const submitHandler = (e) => {
        e.preventDefault()

        
    }

    return (
        <AdminLayout>

            <StyledForm onSubmit={submitHandler}>    
                <StyledInputGroup>
                    <label>Name</label>
                    <input type='text' value={userDetails.name} onInput={(e) => setUserDetils({...userDetails, name: e.target.value.trim()})} required/>
                </StyledInputGroup>
                <StyledInputGroup>
                    <label>Email</label>
                    <input type='email' value={userDetails.email} onInput={(e) => setUserDetils({...userDetails, email: e.target.value.trim()})} required/>
                </StyledInputGroup>
                <StyledInputGroup>
                    <label>Current Password</label>
                    <input type='text' value={currentPassword} onInput={(e) => setCurrentPassword(e.target.value.trim())}/>
                </StyledInputGroup>
                <StyledInputGroup>
                    <label>New Password</label>
                    <input type='text' value={newPassword} onInput={(e) => setNewPassword(e.target.value.trim())}/>
                </StyledInputGroup>


                <Button type='submit' style={{margin: '20px auto'}} loading={loading}>Update</Button>
            </StyledForm>
            
        </AdminLayout>
    )
}

export default Profile
