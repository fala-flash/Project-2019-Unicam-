import React,  {Component} from 'react';
import SignupG from './signupGoogle'


class SignUp extends Component{
    render() {
        const {
          user,
          signOut,
          signInWithGoogle,
        } = this.props;
    
        return (
          <div className="App">
           <SignupG />
          </div>
        );
      }
    }
    
   
    export default SignUp
