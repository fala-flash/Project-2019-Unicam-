import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';


import SignUpPage from './components/pages/signup';
import LandingPage from './components/pages/landing';
import Header from './components/header';
import Footer from './components/footer';



const App = () => (
      <Router>
        <Header />

      

      <Route exact path={'/'} component={LandingPage} />
      <Route path={'/signup'} component={SignUpPage} />
     
      <Footer/>


  </Router>
  )
    
  

  


export default App;