import {createContext, useContext, useState} from 'react'

const ModalsContext = createContext(null)

export const useModalsContext = () => useContext(ModalsContext)

const ModalsProvider = ({children}) => {

    const [authModal, setAuthModal] = useState({
        showAuthModal: false,
        authType: 'login'
    })

    const [newRecipeModal, setNewRecipeModal] = useState({
        showNewRecipeModal: false,
        newRecipeModalState: 'Add' //or Update
    })


    const setAuthModalState = (type, open) => {
        const authModalCopy = {...authModal}

        authModalCopy.showAuthModal = open
        authModalCopy.authType = type

        setAuthModal(authModalCopy)
    }
    
    const setNewRecipeModalState = (state = 'Add', isOpen) => {
        let stateCopy = {...newRecipeModal}
        stateCopy.showNewRecipeModal = isOpen
        stateCopy.newRecipeModalState = state

        setNewRecipeModal(stateCopy)
    }
    
    return (
        <ModalsContext.Provider value={{
            showAuthModal: authModal.showAuthModal,
            authType: authModal.authType,
            setAuthModal: setAuthModalState,

            showNewRecipeModal: newRecipeModal.showNewRecipeModal,
            setNewRecipeModal: setNewRecipeModalState,
            newRecipeModalState: newRecipeModal.newRecipeModalState

        }}>
            {children}
        </ModalsContext.Provider>
    )
}

export default ModalsProvider
