import {useRef, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import {useAuthContext, useModalsContext} from '../../context'
import {useOutsideClick} from '../../hooks/outsideClick'

const StyledAvatarMenu = styled.div`
    width: 100px;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;   
    position: relative;

    .triggerBtn {
        display: flex;
        align-items: center;
    }

    .dropdown {        
        position: absolute;
        top: 60px;
        right: 10px;
        min-height: 40px;
        width: 200px;
        background: ${({theme}) => theme.bgPrimary};
        border-radius: 4px;
        border: 1px solid ${({theme}) => theme.bgSecondary};        

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

`

function DropdownItemWrapper({children, onClick}) {
    return (
        <div onClick={onClick}>
            {children}
        </div>
    )
}

const NavUserDropdown = () => {

    const [showDropdown, setShowDropdown] = useState(false)

    const wrapperRef = useRef(null)
    
    
    useOutsideClick(wrapperRef, () => {
        setShowDropdown(false)
    })

    const closeMe = () => {
        setShowDropdown(false)
    }

    const {user, logout} = useAuthContext()
    const {setAuthModal} = useModalsContext()

    return (
        <StyledAvatarMenu ref={wrapperRef}>
            <label onClick={() => setShowDropdown(!showDropdown)} htmlFor='checkDropdown' className='triggerBtn pointer'>
                {user && <span style={{marginRight:'10px'}}>{user.name}</span>}
                <span className="material-icons">
                    face
                </span>
            </label>
{/* 
            <input type="checkbox" id='checkDropdown' name='checkDropdown' style={{display:'none'}}/> */}

            {showDropdown &&             
                <div className='dropdown'>
                    {user ? 
                        <>
                            <DropdownItemWrapper onClick={closeMe}>
                                <Link to='/profile' className='dropdown_item'>
                                    <span className="material-icons">
                                        contact_page
                                    </span>
                                    <p>Profile</p>
                                </Link>
                            </DropdownItemWrapper>

                            <DropdownItemWrapper onClick={closeMe}>
                                <div onClick={logout} className='dropdown_item'>
                                    <span className="material-icons">
                                        logout
                                    </span>
                                    <p>Logout</p>
                                </div>
                            </DropdownItemWrapper>
                        </>
                        :
                        <>
                            <DropdownItemWrapper onClick={closeMe}>
                                <div onClick={() => setAuthModal('login', true)} className='dropdown_item'>
                                    <span className="material-icons">
                                        login
                                    </span>
                                    <p>Log in</p>
                                </div>
                            </DropdownItemWrapper>
                            <DropdownItemWrapper onClick={closeMe}>
                                <div onClick={() => setAuthModal('signup', true)} className='dropdown_item'>
                                    <span className="material-icons">
                                        how_to_reg
                                    </span>
                                    <p>Sign Up</p>
                                </div>
                            </DropdownItemWrapper>
                        </>
                    }
                    
                
                    
                </div>
            }
        </StyledAvatarMenu>  
    )
}

export default NavUserDropdown
