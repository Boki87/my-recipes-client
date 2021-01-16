import React, {useState} from 'react'
import styled from 'styled-components'
import {toast} from 'react-toastify'

import AdminLayout from '../components/adminLayout/AdminLayout'
import Button from '../ui/Button'
import {StyledInputGroup} from '../styles/StyledInputGroup'
import {useAuthContext} from '../context'
import {apiCall} from '../utils'

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

    const {user, setUser} = useAuthContext()

    const [userDetails, setUserDetils] = useState({...user})
    
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const submitHandler = async (e) => {
        e.preventDefault()

        if(userDetails.email == '' && userDetails.name == '') {
            return toast.error('Please enter name and email')
        }

        setLoading(true)

        const body = {name: userDetails.name, email:userDetails.email}
        try{
            const updatedUser = await apiCall('/auth/updatedetails', {body, method: 'PUT'})
            if(updatedUser.success) {
                console.log(JSON.stringify(updatedUser));
                localStorage.setItem('user', JSON.stringify(updatedUser.data))
                setUser(updatedUser.data)
            }else{
                setLoading(false)
                return toast.error('Could not update user details')
            }

            if(currentPassword != '' && newPassword != '') {
                    const updatedPassword = await apiCall('/auth/updatepassword', {body:{currentPassword, newPassword},method: 'PUT'})
        
                    if(updatedPassword.success) {
                        localStorage.setItem('token', updatedPassword.token) 
                    }else{
                        setLoading(false)
                        return toast.error('Current password is incorrect')
                    }
            }

            setLoading(false)
        }catch(err) {
            setLoading(false)
            return toast.error(err.message)
        }
    }

    return (
        <AdminLayout>

            <StyledForm onSubmit={submitHandler}>    
                <StyledInputGroup>
                    <label>Name</label>
                    <input type='text' value={userDetails.name} onInput={(e) => setUserDetils({...userDetails, name: e.target.value})} required/>
                </StyledInputGroup>
                <StyledInputGroup>
                    <label>Email</label>
                    <input type='email' value={userDetails.email} onInput={(e) => setUserDetils({...userDetails, email: e.target.value})} required/>
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
