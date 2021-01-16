import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const StyledWrapper = styled.div`
        position: fixed;
        top:55px;
        left:0px;
        width:100%;
        height:50px;
        background: ${({theme}) => theme.bgPrimary};
        z-index: 10;
        display:flex;
        justify-content:center;
        align-items:center;
        .admin_nav_link {
            height:40px;
            width:150px;            
            border-bottom: 3px solid transparent;
            background: ${({theme}) => theme.secondaryColor};
            color: ${({theme}) => theme.textSecondary};
            display:flex;
            justify-content:center;
            align-items:center;
            margin: 0px 5px;
            border-radius: 4px;
            &:hover {
                filter: brightness(90%);
            }
        }

        .active {
            border-bottom: 3px solid ${({theme}) => theme.primaryColor};
        }
`




const AdminNavigation = () => {
    return (
        <StyledWrapper>
            <NavLink to='/profile' className='admin_nav_link' activeClassName='active'>Profile</NavLink>
            <NavLink to='/my-recipes' className='admin_nav_link' activeClassName='active'>My Recipes</NavLink>
            <NavLink to='/favourites' className='admin_nav_link' activeClassName='active'>Favourites</NavLink>            
        </StyledWrapper>
    )
}

export default AdminNavigation