import styled, {css} from 'styled-components'

export const StyledBtn = styled.button`

    padding: 0px 15px;
    min-width: 100px;
    height: 35px;
    margin: 10px;
    background: ${({theme}) => theme.primaryColor};
    color: ${({theme}) => theme.bgPrimary};
    border: none;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    @keyframes spinner {
        to {transform: rotate(-360deg)}
    }

    .material-icons {
        animation: spinner 1s linear infinite;
    }
    ${(props) => props.disabled && 
        css`
            background: ${({theme}) => theme.secondaryColor};
            cursor: not-allowed;            
        `
    }
`