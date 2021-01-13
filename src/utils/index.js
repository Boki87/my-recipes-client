import SoupIcon from '../assets/icons/soup.svg'
import SaladIcon from '../assets/icons/vegetables.svg'
import MainCourseIcon from '../assets/icons/steak.svg'
import DessertIcon from '../assets/icons/pudding.svg'
import BreakfastIcon from '../assets/icons/breakfast.svg'
import BeverageIcon from '../assets/icons/ice cream.svg'


export const apiCall = async (endpoint, {body, ...customConfig} = {}) => {
    const token = localStorage.getItem('token')
    const headers = {'Content-Type': 'application/json'}

    if(token) {
        headers.Authorization = `Bearer ${token}`
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        }
    }

    if(body) {
        config.body = JSON.stringify(body)
    }

    const req = await fetch(`${process.env.REACT_APP_API_BACKEND_URL}${endpoint}`, config)
    
    const res = await req.json()
    
    return res
    
}


export const categories = [
    {title: "Soup", icon : SoupIcon},
    {title: "Salad", icon : SaladIcon},
    {title: "Main course", icon : MainCourseIcon},
    {title: "Dessert", icon : DessertIcon},
    {title: "Breakfast", icon : BreakfastIcon},
    {title: "Beverage", icon : BeverageIcon},
]