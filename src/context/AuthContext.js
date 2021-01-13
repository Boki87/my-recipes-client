import {createContext, useContext, useState} from 'react'

const AuthContext = createContext(null)

export const useAuthContext = () => useContext(AuthContext)

const Auth = ({children}) => {

    const [state, setState] = useState({
        user: null,
        loading: false
    })

    
    
    return (
        <AuthContext.Provider value={{
            user: state.user,
            userLoading: state.loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Auth
