import {useEffect} from 'react'
import {apiCall} from '../utils'


const Home = () => {

    useEffect( () => {

        async function getRecipes() {
            const recipes = await apiCall('/recipes')
            
            console.log(recipes);
        }
        getRecipes()
    }, [])

    return (
        <div>
            Home page  
        </div>
    )
}

export default Home
