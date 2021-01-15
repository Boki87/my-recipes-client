import {useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuthContext} from '../context'

export const PrivateRoute = ({ children, ...rest }) => {
    
    let {user} = useAuthContext();    
    
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user ? (
            children
          ) : (
            <Redirect
                to='/'
            />
          )
        }
      />
    );
  }