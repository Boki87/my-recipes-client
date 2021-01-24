import {createContext, useContext, useState, useEffect} from 'react'
import {apiCall} from '../utils'
import {toast} from 'react-toastify'

const RecipeContext = createContext(null)

export const useRecipeContext = () => useContext(RecipeContext)

const RecipeProvider = ({children}) => {

    const [myRecipes, setMyRecipes] = useState([])
    
    const [recipesLoading, setRecipesLoading] = useState(false)

    const [recipes, setRecipes] = useState([])
    
    const [recipeToEdit, setRecipeToEdit] = useState(null)
    
    const [nameQuery, setNameQuery] = useState('')
    const [categoryQuery, setCategoryQuery] = useState('')


    useEffect(() => {

            getRecipes()
        
    }, [nameQuery, categoryQuery])


    const getMyRecipes = async (userId) => {
        
            setRecipesLoading(true)
            try {
                const res = await apiCall(`/recipes?user=${userId}`)
                setMyRecipes(res.data)            
                setRecipesLoading(false)
            }catch(err) {
                setRecipesLoading(false)
                return toast.error('Error getting user recipes')
            }        
    }
        

    const getRecipes = async () => {
        setRecipesLoading(true)
        try {

            let name = ''

            if(nameQuery != '') {
                name = `name=${nameQuery}&`
            }

            let category = ''

            if(categoryQuery != '') {
                category = `category=${categoryQuery}`
            }
            console.log(`/recipes?${name}${category}`);
            const res = await apiCall(`/recipes?${name}${category}`)
            setRecipes(res.data)            
            setRecipesLoading(false)
        }catch(err) {
            setRecipesLoading(false)
            return toast.error('Error getting recipes')
        }      
    }
    

    return (
        <RecipeContext.Provider value={{
            myRecipes,
            setMyRecipes,
            getMyRecipes,
            recipesLoading,
            recipeToEdit,
            setRecipeToEdit,
            getRecipes,
            recipes,
            setNameQuery,
            setCategoryQuery
        }}>
            {children}
        </RecipeContext.Provider>
    )
}

export default RecipeProvider
