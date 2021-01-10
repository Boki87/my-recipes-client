import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Nav from './components/Nav'
import Home from './pages/Home'

const Routing = () => {
    return (
        <Router>
            <Nav/>
            <div>
                <Switch>
                    <Route path='/' component={Home}/>
                </Switch>
            </div>
        </Router>
    )
}

export default Routing
