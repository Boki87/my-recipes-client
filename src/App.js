import {useState} from 'react'
import {ThemeProvider} from 'styled-components'

import GlobalStyle from './styles/GlobalStyle'
import {lightTheme} from './styles/theme'

import AuthModal from './components/authModal/AuthModal'
import {useModalsContext} from './context'

import Routing from './Routing'

function App() {

  const {showAuthModal} = useModalsContext()


  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle/>      
      <Routing/>

      
      <AuthModal show={showAuthModal}/>
      

    </ThemeProvider>
  );
}

export default App;
