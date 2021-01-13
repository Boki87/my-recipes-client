import styled from 'styled-components'

export const StyledInputGroup = styled.div`

    width:100%;
    display:flex;
    flex-direction: column;
    margin: 10px 0px;
    label {
        color: ${({theme}) => theme.textSecondary};
    }

    input {
        border: 1px solid ${({theme}) => theme.primaryColor};
        font-size:1rem;
        color: ${({theme}) => theme.textSecondary};
        padding-left: 15px;
        height: 45px;
        border-radius: 4px;

        &::placeholder {
            color: ${({theme}) => theme.textSecondary};
            filter: brightness(150%);
        }
    }
`