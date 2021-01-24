import {useState} from 'react'
import {ThemeProvider} from 'styled-components'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer 
        autoClose={2000}
      />
    </ThemeProvider>
  );
}

export default App;
