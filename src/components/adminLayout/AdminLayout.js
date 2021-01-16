import styled from 'styled-components'

const StyledWrapper = styled.div`
    padding-top: 60px;
    height:100%;
    position: relative;
    .admin_navigation {
        position: absolute;
        top:0px;
        left:0px;
        width:100%;
        height:60px;
        background: ${({theme}) => theme.bgPrimary};
        z-index: 10;
    }
    
`

const AdminLayout = ({children}) => {
    return (
        <StyledWrapper>
                <div className='admin_navigation'></div>
                {children}
        </StyledWrapper>
    )
}

export default AdminLayout