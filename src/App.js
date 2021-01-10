import {ThemeProvider} from 'styled-components'

import GlobalStyle from './styles/GlobalStyle'
import {lightTheme} from './styles/theme'


import Routing from './Routing'

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle/>      
      <Routing/>
    </ThemeProvider>
  );
}

export default App;
