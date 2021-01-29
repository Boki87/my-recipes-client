import {createContext, useContext, useState, useEffect} from 'react'
import {apiCall} from '../utils'
import {toast} from 'react-toastify'
import {useLocation} from 'react-router-dom'
import {useAuthContext} from './AuthContext'

const RecipeContext = createContext(null)

export const useRecipeContext = () => useContext(RecipeContext)

const RecipeProvider = ({children}) => {

    let location = useLocation()

    const {user} = useAuthContext()

    const [myRecipes, setMyRecipes] = useState([])
    
    const [recipesLoading, setRecipesLoading] = useState(false)

    const [page, setPage] = useState(0)
    const [numOfPages, setNumOfPages] = useState(1)
    const [recipes, setRecipes] = useState([])
    
    const [recipeToEdit, setRecipeToEdit] = useState(null)
    
    const [nameQuery, setNameQuery] = useState('')
    const [categoryQuery, setCategoryQuery] = useState('')


    useEffect(() => {
            if(location.pathname == '/') {
                getRecipes()
            }else if(location.pathname == '/my-recipes') {
                getMyRecipes()
            }            
    }, [nameQuery, categoryQuery])

    useEffect(() => {
        if(location.pathname == '/') {
            getRecipes()
        }
    }, [page])


    const getMyRecipes = async () => {
        
            setRecipesLoading(true)
            try {

                let name = ''

                if(nameQuery != '') {
                    name = `&name=${nameQuery}`
                }

                let category = ''

                if(categoryQuery != '') {
                    category = `&category=${categoryQuery}`
                }

                const res = await apiCall(`/recipes?user=${user._id}${name}${category}&limit=1000`)
                
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
            const res = await apiCall(`/recipes?${name}${category}&page=${page + 1}`)
            
            setNumOfPages(res.pagination.totalPages)       
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
            setCategoryQuery,
            nameQuery,
            numOfPages,
            page,
            setPage
        }}>
            {children}
        </RecipeContext.Provider>
    )
}

export default RecipeProvider
