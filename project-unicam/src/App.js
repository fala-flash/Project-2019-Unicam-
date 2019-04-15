import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';


import SignUpPage from './components/pages/signup';
import LandingPage from './components/pages/landing';



const App = () => (
      <Router>
   

      

      <Route exact path={'/'} component={LandingPage} />
      <Route path={'/signup'} component={SignUpPage} />
     
    
  </Router>
  )
    
  

  


export default App;