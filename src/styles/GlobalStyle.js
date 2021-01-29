import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

html {
		font-size: 16px;
		box-sizing: border-box;

		

	}
	*, *:before, *:after {
		padding: 0;
		margin: 0;
        box-sizing: inherit;
        font-family: 'Poppins', sans-serif;
	}
	body {
		font-family: 'Fira Sans', sans-serif;
		font-size: 1rem;
		line-height: 1.7;
		background: ${(props) => props.theme.bgSecondary};
		color: ${(props) => props.theme.textPrimary};
		overflow-x: hidden;
	}
	h1, h2, h3, h4, h5, h6 {
        font-weight: normal;
        font-family: 'Yusei Magic', sans-serif;
    }
    .font1 {
        font-family: 'Poppins', sans-serif;
    }
    .font2 {
        font-family: 'Yusei Magic', sans-serif;
    }
	a {
		text-decoration: none;
		cursor: pointer;
		color: inherit;
	}
	.pointer {
		cursor: pointer;
	}
	.secondary {
		color: ${(props) => props.theme.textSecondary};
	}
	button, svg {
	  cursor: pointer;
	}
	.bold {
		font-weight: 500;
	}
	*:focus {
	  outline: none;
	}

	.link {
		color: ${(props) => props.theme.secondaryColor};
		text-decoration: underline;
		cursor: pointer;
	}

	.Toastify__toast {
		border-radius: 8px;
	}

`;

export default GlobalStyle