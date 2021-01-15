import React from 'react'
import ModalsProvider, {useModalsContext} from './ModalsContext'
import AuthProvider, {useAuthContext} from './AuthContext'

export {
    useModalsContext,
    useAuthContext
}

const CombinedContext = ({children}) => {
    return (
        <AuthProvider>
            <ModalsProvider>
                {children}
            </ModalsProvider>
        </AuthProvider>
    )
}

export default CombinedContext
