import styled from 'styled-components'

const StyledAvatarMenu = styled.div`
    width: 100px;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;   
    position: relative;

    .dropdown {
        display:none;
        position: absolute;
        top: 60px;
        right: 10px;
        min-height: 100px;
        width: 200px;
        background: ${({theme}) => theme.bgPrimary};
        border-radius: 4px;
        border: 1px solid ${({theme}) => theme.bgSecondary};
        padding-bottom: 10px;

        .dropdown_item {
            color: ${({theme}) => theme.textPrimary};
            cursor: pointer;
            height: 40px;
            width: 100%;
            display:flex;
            align-items:center;
            .material-icons {
                margin: 0px 10px 0px 20px;
                width: 30px;
                color: ${({theme}) => theme.primaryColor};
            }
            p {
                flex: 1;
            }

            &:hover {
                background: ${({theme}) => theme.bgSecondary};
            }
        }

        
    }


    #checkDropdown:checked~.dropdown {
        display:block;
    }
`

const NavUserDropdown = () => {
    return (
        <StyledAvatarMenu>
            <label htmlFor='checkDropdown' className="material-icons pointer">
                face
            </label>

            <input type="checkbox" id='checkDropdown' name='checkDropdown' style={{display:'none'}}/>

            <div className='dropdown'>
                <div className='dropdown_item'>
                    <span className="material-icons">
                        contact_page
                    </span>
                    <p>Profile</p>
                </div>
                <div className='dropdown_item'>
                    <span className="material-icons">
                        star
                    </span>
                    <p>Favorites</p>
                </div>
                <div className='dropdown_item'>
                    <span className="material-icons">
                        login
                    </span>
                    <p>Log in</p>
                </div>
                <div className='dropdown_item'>
                    <span className="material-icons">
                        how_to_reg
                    </span>
                    <p>Sign Up</p>
                </div>
            </div>
        </StyledAvatarMenu>  
    )
}

export default NavUserDropdown
