import React from 'react';
import { RingLoader } from 'react-spinners';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { fire } from './config/FirebaseConfig';

import Style from './components/style.css';

import Header from './components/header';
import Footer from './components/footer';
import Login from './components/pages/login/login';
import Logout from './components/pages/logout/logout';
import Welcome from './components/pages/landing/landing';
import Profile from './components/pages/profile/profile';
import Info from './components/pages/info/info';
import Telegrambot from './components/pages/telegrambot/telegrambot';
import Faq from './components/pages/faq/faq';
import Telefona from './components/pages/telefona/telefona';
import Helpline from './components/pages/helpline/helpline';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      userID: null,
      email: null,
      name: null,
      picture: null
    }
    this.setAuthenticated = this.setAuthenticated.bind(this)
    this.setStateUser = this.setStateUser.bind(this)
  }

  setLocalUser(id, em, na, pic) {
    localStorage.setItem('userID', id);
    localStorage.setItem('userEmail', em);
    localStorage.setItem('userName', na);
    localStorage.setItem('userPicture', pic);
  }

  setStateUser() {
    this.setState({
      userID: localStorage.getItem('userID'),
      email: localStorage.getItem('userEmail'),
      name: localStorage.getItem('userName'),
      picture: localStorage.getItem('userPicture')
    })
  }

  setAuthenticated(param) {
    this.setState({
      authenticated: param
    });
  }

  componentDidMount() {
    this.removeAuthListener = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
    this.setStateUser()
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div className="loading">
          Loading
          <RingLoader color={"white"} />
        </div>
      )
    }

    return (
      <div>
        <div className="headerNavbar">
          <Header/>
        </div>
        <div className="mainStyle">
          <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/login" render={() =>
                  <Login setAuthenticated={this.setAuthenticated}
                    authenticated={this.state.authenticated}
                    setLocalUser={this.setLocalUser}
                    setStateUser={this.setStateUser} />
                } />

                {this.state.authenticated
                  ? <>
                    <Route path="/logout" render={() =>
                      <Logout
                        userID={this.state.userID} />
                    } />

                    <Route path="/profile" render={() =>
                      <Profile
                        userID={this.state.userID}
                        email={this.state.email}
                        name={this.state.name}
                        setStateUser={this.setStateUser}
                        setLocalUser={this.setStateUser} />
                    } />
                    <Route path="/info" component={Info} />
                    <Route path="/telegrambot" component={Telegrambot} />
                    <Route path="/telefona" component={Telefona} />
                    <Route path="/helpline" component={Helpline} />
                    <Route path="/faq" component={Faq} />
                  </>
                  : <Redirect to='/login' />
                }
              </Switch>
            </div>
          </BrowserRouter>
          <div className="footerstyle">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;