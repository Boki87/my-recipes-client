import {createContext, useContext, useState} from 'react'
import {apiCall} from '../utils'


const AuthContext = createContext(null)

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)    

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }
    
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            logout                        
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
