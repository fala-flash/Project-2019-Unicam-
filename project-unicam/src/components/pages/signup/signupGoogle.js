import React,  {Component} from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../config/FirebaseConfig';

const firebaseApp = firebase.initializeApp(FirebaseConfig);

class SignUpGoogle extends Component{
    render() {
        const {
          user,
          signOut,
          signInWithGoogle,
        } = this.props;
    
        return (
          <div className="App">
            <header className="App-header">
              
              {
                user
                  ? <p>Hello, {user.displayName}</p>
                  : <p>Please sign in.</p>
              }
    
              {
                user
                  ? <button onClick={signOut}>Sign out</button>
                  : <button onClick={signInWithGoogle}>Sign in witdasdsdaddash Google</button>
              }
            </header>
          </div>
        );
      }
    }
    
    const firebaseAppAuth = firebaseApp.auth();
    
    const providers = {
      googleProvider: new firebase.auth.GoogleAuthProvider(),
    };
    
    export default withFirebaseAuth({
      providers,
      firebaseAppAuth,
    })(SignUpGoogle);
