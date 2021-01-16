import {createContext, useContext, useState, useEffect} from 'react'
import {apiCall} from '../utils'


const AuthContext = createContext(null)

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({children}) => {

    const localSt = JSON.parse(localStorage.getItem('user'))

    const [user, setUser] = useState(localSt ? localSt : null)    

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
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
