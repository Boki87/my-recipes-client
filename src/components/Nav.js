import styled from 'styled-components'

import Logo from '../assets/icons/restaurant.svg'

const NavWrapper = styled.nav`

    width: 100%;
    height: 55px;
    border-bottom: 1px solid ${({theme}) => theme.bgSecondary};
    display: flex;
    justify-content: center;
    align-items:center;

    .innerWrapper {
        display: flex;
        max-width: 1100px;
        width: 100%;
        height:100%;
        align-items:center;        
    }

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
const StyledSearch = styled.div`

    flex: 1;
    height:100%;
    position: relative;
    input {
        font-size: 1.1rem;
        width: 100%;
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

const StyledAvatarMenu = styled.div`
    width: 100px;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;    
`

const Nav = () => {
    return (
        <NavWrapper>
            <div className='innerWrapper'>
                <StyledLogo className='font2'>
                    <img src={Logo} alt=""/>
                    My Recipes
                </StyledLogo>

                <StyledSearch>
                    <input type="search" placeholder='Search recipe...'/>

                    <span className="material-icons">
                        search
                    </span>
                </StyledSearch>

                <StyledAvatarMenu>
                    <span className="material-icons">
                        face
                    </span>
                </StyledAvatarMenu>    
            </div>
            
        </NavWrapper>
    )
}

export default Nav
