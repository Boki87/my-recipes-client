import {useState, useEffect} from 'react'
import {Link, useLocation, useHistory} from 'react-router-dom'
import styled from 'styled-components'

import Logo from '../../assets/icons/restaurant.svg'
import NavUserDropdown from './NavUserDropdown'

import {Container} from '../../styles/Container'

import {useRecipeContext} from '../../context'


const NavWrapper = styled.nav`
    background: ${(props) => props.theme.bgPrimary};
    width: 100%;
    height: 55px;
    border-bottom: 1px solid ${({theme}) => theme.bgSecondary};
    display: flex;
    justify-content: center;
    align-items:center;

`

const StyledLogo = styled(Link)`
    height:100%;
    margin-left: 20px;
    display: flex;    
    align-items:center;
    color: ${({theme}) => theme.primaryColor};
    img {
        height: 80%;        
        margin-right: 10px;
    }


`
const StyledSearch = styled.div`

    flex: 1;
    height:100%;
    position: relative;
    input {
        font-size: 1.1rem;
        width: 100%;
        max-width: 400px;
        height:100%;
        border: none;
        outline: none;
        padding: 0px 10px 0px 50px;
    }

    .material-icons {
        font-size: 1.1.rem;
        position: absolute;
        left:20px;
        top:15px;
    }

`



const Nav = () => {

    let location = useLocation()
    let history = useHistory()

    let {setNameQuery} = useRecipeContext()

    let [searchQuery, setSearchQuery] = useState('')

    let [route, setRoute] = useState('')

    useEffect(() => {
        //reset search query on route change
        if(route != location.pathname) {            
            setSearchQuery('')
            setRoute(location.pathname)
        }
    }, [location.pathname])

    useEffect(() => {
        if(location.pathname != '/' && location.pathname != '/my-recipes') {
            history.push('/')
        }

        const timer = setTimeout(() => {
            searchHandler()
        }, 1000)

        return () => clearTimeout(timer)
    }, [searchQuery])


    const searchHandler = () => {              
            setNameQuery(searchQuery)                    
    }

    return (
        <NavWrapper>
            <Container style={{display:'flex', alignItems:'center', height:'100%'}}>
                <StyledLogo to='/' className='font2'>
                    <img src={Logo} alt=""/>
                    My Recipes
                </StyledLogo>

                <StyledSearch>
                    <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search recipe...'/>

                    <span className="material-icons">
                        search
                    </span>
                </StyledSearch>

                <NavUserDropdown />
            </Container>
            
        </NavWrapper>
    )
}

export default Nav
