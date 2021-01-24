import React from 'react'
import ModalsProvider, {useModalsContext} from './ModalsContext'
import AuthProvider, {useAuthContext} from './AuthContext'
import RecipeProvider, {useRecipeContext} from './RecipesContext'

export {
    useModalsContext,
    useAuthContext,
    useRecipeContext
}

const CombinedContext = ({children}) => {
    return (
        <AuthProvider>
            <RecipeProvider>
                <ModalsProvider>
                    {children}
                </ModalsProvider>
            </RecipeProvider>
        </AuthProvider>
    )
}

export default CombinedContext
