import styled from 'styled-components'

import Logo from '../assets/icons/restaurant.svg'

const NavWrapper = styled.nav`

    width: 100%;
    height: 55px;
    border-bottom: 1px solid ${({theme}) => theme.bgSecondary};
    display: flex;
    justify-content: space-between;
    align-items:center;
`

const StyledLogo = styled.div`
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


const Nav = () => {
    return (
        <NavWrapper>
            <StyledLogo className='font2'>
                <img src={Logo} alt=""/>
                My Recipes
            </StyledLogo>

            <div>
                <input type="search"/>
            </div>

            <div>
                <span className="material-icons">
                    face
                </span>
            </div>
        </NavWrapper>
    )
}

export default Nav
