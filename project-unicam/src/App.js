import React from "react";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { fire } from "./config/FirebaseConfig";
import { Spinner } from "react-bootstrap";

//eslint-disable-next-line
import Style from "./components/style.css";




import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Login from "./components/pages/login/login";
import Logout from "./components/pages/logout/logout";
import Landing from "./components/pages/landing/landing";
import Profile from "./components/pages/profile/profile";
import ModifyProfile from "./components/pages/profile/modify/modify";
import DeleteProfile from "./components/pages/profile/delete/delete";
import Info from "./components/pages/info/info";
import Telegrambot from "./components/pages/telegrambot/telegrambot";
import Faq from "./components/pages/faq/faq";
import Telefona from "./components/pages/telefona/telefona";
import BlogUtente from "./components/pages/blog/blogUtente";
import BlogPsicologo from "./components/pages/blog/blogPsicologo";
import LeMieSegnalazioni from "./components/pages/profile/commentiEsegnalazioni/leMieSegnalazioni";
import LeMieRisposte from "./components/pages/profile/commentiEsegnalazioni/leMieRisposte";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      ruolo: "",
      loading: true,
      userID: "",
      email: "",
      name: "",
      istututo: "",
      telefono: "",
      headerLocation: "",
      isHome: "false"
    };
    this.setAuthenticated = this.setAuthenticated.bind(this);
    this.setRuolo = this.setRuolo.bind(this);
    this.setStateUser = this.setStateUser.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setisHome = this.setisHome.bind(this);
  }

  setLocalUser(id, em, na, pic) {
    localStorage.setItem("userID", id);
    localStorage.setItem("userEmail", em);
    localStorage.setItem("userName", na);
    //localStorage.setItem('userRole', ru);
  }

  setLocalRole(r) {
    localStorage.setItem("userRole", r);
  }

  setLocalName(na) {
    localStorage.setItem("userName", na);
  }

  setLocalTelefono(tel) {
    localStorage.setItem("userTelefono", tel);
  }

  setLocalIstituto(is) {
    localStorage.setItem("userIstituto", is);
  }

  setStateUser() {
    this.setState({
      userID: localStorage.getItem("userID"),
      email: localStorage.getItem("userEmail"),
      name: localStorage.getItem("userName"),
      ruolo: localStorage.getItem("userRole"),
      telefono: localStorage.getItem("userTelefono"),
      istituto: localStorage.getItem("userIstituto")
    });
  }

  setAuthenticated(param) {
    this.setState({
      authenticated: param
    });
  }

  setRuolo(param) {
    this.setState({
      ruolo: param
    });
  }

  setLocation(param) {
    this.setState({
      headerLocation: param
    });
  }

  setisHome(param) {
    this.setState({
      isHome: param
    });
  }

  componentWillMount() {
    this.removeAuthListener = fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
    this.setStateUser();
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div className="loading">
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
        </div>
      );
    }

    return (
      <div>
        <div className="headerStyle">
          <Header
            authenticated={this.state.authenticated}
            headerLocation={this.state.headerLocation}
            isHome={this.state.isHome}
          />
        </div>

        <div className="mainStyle">
          <BrowserRouter>
            <div className="pageStyle">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Landing
                      authenticated={this.state.authenticated}
                      name={this.state.name}
                      ruolo={this.state.ruolo}
                      setLocation={this.setLocation}
                      setisHome={this.setisHome}
                    />
                  )}
                />

                <Route
                  path="/login"
                  render={() => (
                    <Login
                      userID={this.state.userID}
                      setAuthenticated={this.setAuthenticated}
                      authenticated={this.state.authenticated}
                      setStateUser={this.setStateUser}
                      setLocalUser={this.setLocalUser}
                      setLocation={this.setLocation}
                      setLocalRole={this.setLocalRole}
                    />
                  )}
                />

                {this.state.authenticated ? (
                  <>
                    <Route
                      path="/logout"
                      render={() => <Logout userID={this.state.userID} />}
                    />

                    <Route
                      path="/profile"
                      render={() => (
                        <Profile
                          userID={this.state.userID}
                          email={this.state.email}
                          name={this.state.name}
                          ruolo={this.state.ruolo}
                          istituto={this.state.istituto}
                          telefono={this.state.telefono}
                          setStateUser={this.setStateUser}
                          setLocalName={this.setLocalName}
                          setLocalRole={this.setLocalRole}
                          setLocalIstituto={this.setLocalIstituto}
                          setLocalTelefono={this.setLocalTelefono}
                          setLocation={this.setLocation}
                        />
                      )}
                    />

                    <Route
                      path="/modifyProfile"
                      render={() => (
                        <ModifyProfile
                          userID={this.state.userID}
                          email={this.state.email}
                          name={this.state.name}
                          ruolo={this.state.ruolo}
                          istituto={this.state.istituto}
                          telefono={this.state.telefono}
                          setRuolo={this.state.setRuolo}
                          setStateUser={this.setStateUser}
                          setLocalName={this.setLocalName}
                          setLocalRole={this.setLocalRole}
                          setLocalIstituto={this.setLocalIstituto}
                          setLocalTelefono={this.setLocalTelefono}
                          setLocalUser={this.setLocalUser}
                          setLocation={this.setLocation}
                          setisHome={this.setisHome}
                        />
                      )}
                    />

                    <Route
                      path="/deleteProfile"
                      render={() => (
                        <DeleteProfile
                          authenticated={this.state.authenticated}
                          userID={this.state.userID}
                          name={this.state.name}
                          email={this.state.email}
                          ruolo={this.state.ruolo}
                          istituto={this.state.istituto}
                          telefono={this.state.telefono}
                          setLocation={this.setLocation}
                          setisHome={this.setisHome}
                        />
                      )}
                    />

                    <Route
                      path="/info"
                      render={() => <Info setLocation={this.setLocation} />}
                    />








                    <Route
                      path="/telegrambot"
                      render={() => (
                        <Telegrambot setLocation={this.setLocation} />
                      )}
                    />
                    <Route
                      path="/telefona"
                      render={() => <Telefona setLocation={this.setLocation} />}
                    />
                    <Route
                      path="/faq"
                      render={() => <Faq setLocation={this.setLocation} />}
                    />
                    {this.state.ruolo === "Psicologo" ? (
                      <Route
                        path="/blogPsicologo"
                        render={() => (
                          <BlogPsicologo
                            userID={this.state.userID}
                            email={this.state.email}
                            name={this.state.name}
                            ruolo={this.state.ruolo}
                            istituto={this.state.istituto}
                            telefono={this.state.telefono}
                            setStateUser={this.setStateUser}
                            setLocalName={this.setLocalName}
                            setLocalRole={this.setLocalRole}
                            setLocalIstituto={this.setLocalIstituto}
                            setLocalTelefono={this.setLocalTelefono}
                            setLocation={this.setLocation}
                          />
                        )}
                      />
                    ) : null}

                    {this.state.ruolo === "Utente" ? (
                      <Route
                        path="/mieSegnalazioni"
                        render={() => (
                          <LeMieSegnalazioni
                            userID={this.state.userID}
                            ruolo={this.state.ruolo}
                            setLocation={this.setLocation}
                            setisHome={this.setisHome}
                          />
                        )}
                      />
                    ) : null}

                    {this.state.ruolo === "Psicologo" ? (
                      <Route
                        path="/mieRisposte"
                        render={() => (
                          <LeMieRisposte
                            userID={this.state.userID}
                            ruolo={this.state.ruolo}
                            setLocation={this.setLocation}
                            setisHome={this.setisHome}
                          />
                        )}
                      />
                    ) : null}

                    {this.state.ruolo === "Utente" ? (
                      <Route
                        path="/blogUtente"
                        render={() => (
                          <BlogUtente
                            userID={this.state.userID}
                            email={this.state.email}
                            name={this.state.name}
                            ruolo={this.state.ruolo}
                            istituto={this.state.istituto}
                            telefono={this.state.telefono}
                            setStateUser={this.setStateUser}
                            setLocalName={this.setLocalName}
                            setLocalRole={this.setLocalRole}
                            setLocalIstituto={this.setLocalIstituto}
                            setLocalTelefono={this.setLocalTelefono}
                            setLocation={this.setLocation}
                          />
                        )}
                      />
                    ) : null}
                  </>
                ) : (
                  <Redirect to="/login" />
                )}
              </Switch>
            </div>
          </BrowserRouter>
          <div className="footerstyle">
            <Footer
              authenticated={this.state.authenticated}
              ruolo={this.state.ruolo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
