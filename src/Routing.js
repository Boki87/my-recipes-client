import {Route, Switch, useLocation} from 'react-router-dom'
import {AnimatePresence, motion} from 'framer-motion'
import {PrivateRoute} from './utils/PrivateRoute'

import Nav from './components/nav/Nav'
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import Profile from './pages/Profile'
import MyRecipes from './pages/MyRecipes'
import Favorites from './pages/Favorites'

import {Container} from './styles/Container'

const pageVariants = {
    initial: {
      opacity: 0,
      y: 30
    },
    in: {
      opacity: 1,
      y:0
    },
    out: {
      opacity: 0,
      y:30
    },
  }


const Routing = () => {
    const location = useLocation()
    return (
            <>
            <Nav/>
            <Container style={{height:'calc(100vh - 55px)', margin: '0 auto', overflow:'auto'}}>
                {/* <Route render={({location}) => ( */}
                    {/* <AnimatePresence exitBeforeEnter> */}
                        <Switch location={location} key={location.pathname}>
                            <Route exact path='/'>
                                {/* <motion.div
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                > */}
                                    <Home />
                                {/* </motion.div> */}
                            </Route>
                            <Route exact path='/recipe/:id'>
                                {/* <motion.div
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                > */}
                                    <Recipe />
                                {/* </motion.div> */}
                                
                            </Route>
                            
                                <PrivateRoute path='/profile'>
                                    {/* <motion.div
                                        initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={pageVariants}
                                    > */}
                                        <Profile />
                                    {/* </motion.div> */}
                                    
                                </PrivateRoute>
                                <PrivateRoute path='/my-recipes'>
                                    {/* <motion.div
                                        initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={pageVariants}
                                    > */}
                                        <MyRecipes />
                                    {/* </motion.div> */}
                                    
                                </PrivateRoute>
                                <PrivateRoute path='/favorites'>
                                    {/* <motion.div
                                        initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={pageVariants}
                                    > */}
                                        <Favorites />
                                    {/* </motion.div> */}
                                    
                                </PrivateRoute>
                            
                        </Switch>
                     {/* </AnimatePresence>
                )} /> */}
            </Container>
        </>
    )
}

export default Routing
