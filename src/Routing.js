import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Nav from './components/nav/Nav'
import Home from './pages/Home'
import {Container} from './styles/Container'

const Routing = () => {
    return (
        <Router>
            <Nav/>
            <Container style={{height:'calc(100vh - 55px)', margin: '0 auto', overflow:'auto'}}>
                <Switch>
                    <Route path='/' component={Home}/>
                </Switch>
            </Container>
        </Router>
    )
}

export default Routing
