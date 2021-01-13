import {createContext, useContext, useState} from 'react'

const ModalsContext = createContext(null)

export const useModalsContext = () => useContext(ModalsContext)

const ModalsProvider = ({children}) => {

    const [state, setState] = useState({
        showAuthModal: false,
        authType: 'login'
    })

    const setAuthModal = (open, type) => {
        const stateCopy = {...state}

        stateCopy.showAuthModal = open
        stateCopy.authType = type

        setState(stateCopy)
    }
    
    
    return (
        <ModalsContext.Provider value={{
            showAuthModal: state.showAuthModal,
            authType: state.authType,
            setAuthModal
        }}>
            {children}
        </ModalsContext.Provider>
    )
}

export default ModalsProvider
