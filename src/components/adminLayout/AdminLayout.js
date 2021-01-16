import styled from 'styled-components'

import AdminNavigsation from './AdminNavigsation'

const StyledWrapper = styled.div`
    padding-top: 60px;
    height:100%;
    position: relative;    
    
`

const AdminLayout = ({children}) => {
    return (
        <StyledWrapper>
                <AdminNavigsation />
                {children}
        </StyledWrapper>
    )
}

export default AdminLayout