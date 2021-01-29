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
        align-items:flex-end;
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
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            &:hover {
                filter: brightness(90%);
            }

            .material-icons {
                margin-right: 10px;
            }
        }

        .active {
            border-bottom: 3px solid ${({theme}) => theme.primaryColor};
            background: ${({theme}) => theme.secondaryColor}; 
        }
`




const AdminNavigation = () => {
    return (
        <StyledWrapper>
            <NavLink to='/profile' className='admin_nav_link' activeClassName='active'>
                <span className="material-icons">
                    contact_page
                </span>
                Profile
            </NavLink>
            <NavLink to='/my-recipes' className='admin_nav_link' activeClassName='active'>
                <span className="material-icons">
                    book
                </span>
                My Recipes
            </NavLink>
            <NavLink to='/favorites' className='admin_nav_link' activeClassName='active'>
                <span className="material-icons">
                    stars
                </span>
                Favorites
            </NavLink>            
        </StyledWrapper>
    )
}

export default AdminNavigation