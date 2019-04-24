import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Collapse } from 'react-bootstrap';
import { GoogleLoginButton } from "react-social-login-buttons";
import { fire, providerGoogle } from '../../../config/FirebaseConfig';

//eslint-disable-next-line
import Style from '../../style.css';


class Login extends Component{

  constructor() {
      super();        
      this.state = {
        user: null,
        tipo: null,
        openAccesso: false,
        openRegistrazione: false,
      }        
      this.authentication = this.authentication.bind(this)
      this.autenticaEmailPassword = this.autenticaEmailPassword.bind(this)
      this.registraEmailPassword = this.registraEmailPassword.bind(this)
      this.setUser = this.setUser.bind(this)
    }

    setRedirect(param) {
      this.setState({
        redirect: param
      })
    }

    setUser(currentUser) {
      this.setState({
        user: currentUser
      })
    }

    setUserInfo() {
      this.props.setLocalUser(
        JSON.parse(JSON.stringify(this.state.user.uid)),
        JSON.parse(JSON.stringify(this.state.user.email)),
        JSON.parse(JSON.stringify(this.state.user.displayName)),
        JSON.parse(JSON.stringify(this.state.user.photoURL)),
        JSON.parse(JSON.stringify(this.state.tipo))
      )
      alert("tipo: "+this.state.tipo)
      this.props.setStateUser()
    }

    addUser() {
      fire.database().ref(this.state.tipo +'/'+ this.state.user.uid).set({
        nome: "",
        email: this.state.user.email
      }).then((data)=>{
          //success callback
          console.log('data ' , data)
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      })
    }

    addUserGoogle() {
      fire.database().ref('Utente/' + this.state.user.uid).set({
        nome: this.state.user.displayName,
        email: this.state.user.email
      }).then((data)=>{
          //success callback
          console.log('data ' , data)
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      })
    }

    authentication(provider) {
      fire.auth().signInWithPopup(provider)
      .then((result) => {    
        this.setUser(result.user) 
        this.setUserInfo()        
        this.props.setAuthenticated(true)
        this.addUserGoogle()  //aggiungo l'utente al db
      })
      .catch((error) => {
        if(error.code === 'auth/account-exists-with-different-credential') {
          alert("Credenziali di accesso  collegate ad un altro account");
        } else alert("Errore login:"+error)
      });
    }

    getUserType() {
        const rootUtente = fire.database().ref('Utente/'+this.state.user.uid);
        const rootPsicologo = fire.database().ref('Psicologo/'+this.state.user.uid);        
        
        rootUtente.on('value', snap => {  //verifico se utente
            if (snap.val() !== null) {  //utente
              this.setTipo("utente");
            } else if (snap.val() === null) {  //se non è utente
              rootPsicologo.on('value', snapshot => { //verifico se psicologo
                if (snapshot.val() !== null) {  //se psicologo
                  this.setTipo("psicologo");
                } else if (snapshot.val() === null) {  //altrimenti nulla
                  alert('problemi lettura dati account')
                }
              })  
            }
        })
    }
  
    autenticaEmailPassword (event) {    
      const email = this.emailInputAccesso.value
      const password = this.passwordInputAccesso.value
      fire.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {       
        this.setUser(result.user)  
        //this.getUserType()
        this.setUserInfo()        
        this.props.setAuthenticated(true)
        }).catch((error) => {
          if(error.code === 'auth/account-exists-with-different-credential') {
            alert("Email collegata ad un altro account");
          } else if (error.code === 'auth/wrong-password') {
            alert("Password errata");
          } else if (error.code === 'auth/user-not-found') {
            alert("Account inesistente");
          } else alert("Errore login: "+error)
        })
      event.preventDefault()
    }

    registraEmailPassword (event) {    
      const email = this.emailInputRegistrazione.value
      const password = this.passwordInputRegistrazione.value
      this.setState({
        tipo: this.tipoInputRegistrazione.value
      })
      fire.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {    
        this.setUser(result.user) 
        this.setUserInfo()        
        this.props.setAuthenticated(true)
        this.addUser()  //aggiungo l'utente al db
        alert(this.state.tipo + " aggiunto correttamente")
      }).catch((error) => {
        if(error.code === 'auth/weak-password') {
          alert("La password deve contenere almeno 6 caratteri");
        } else if (error.code === 'auth/invalid-email') {
          alert("Email non valida");
        } else alert("Errore creazione account: "+error)
      })          
      event.preventDefault()
    }

    formAccesso() {
      return (
        <div className="formAccesso">
          <Form className="formLogin" onSubmit={(event) => this.autenticaEmailPassword(event)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Inserisci Email" ref={(input) => { this.emailInputAccesso = input }}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Inserisci Password" ref={(input) => { this.passwordInputAccesso = input }}/>
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
          </Form.Group>
          <br></br>            
          <Button variant="info" type="submit" style={{fontWeight:'bold'}}>
            Accedi
          </Button>                       
        </Form>
        <br></br>
        <p>Oppure</p>
        <div className="googleCentrato">
          <br/>
          <GoogleLoginButton style={{fontWeight:'bold'}} onClick={() => { this.authentication(providerGoogle) }}>Accedi con Google</GoogleLoginButton>
          <br/>
        </div>
        </div>
      )            
    }

    formRegistrazione() {
      return (
        <div>
          <Form className="formLogin" onSubmit={(event) => this.registraEmailPassword(event)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Inserisci Email" ref={(input) => { this.emailInputRegistrazione = input }}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Inserisci Password" ref={(input) => { this.passwordInputRegistrazione = input }}/>
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Sono uno</Form.Label>
            <Form.Control as="select" ref={(input) => { this.tipoInputRegistrazione = input }}>
              <option>Psicologo</option>
              <option>Utente</option>
              <option>Altro</option>
            </Form.Control>
          </Form.Group>
          <br></br>            
          <Button variant="info" type="submit" style={{fontWeight:'bold'}}>
            Registrati
          </Button>                       
        </Form>
        </div>
      )          
    }

    render() {
      if (this.props.authenticated === true) {
        return <Redirect to='/profile'/>
      }
      const { openAccesso, openRegistrazione } = this.state;
      return (
        <div className="loginStyle">
        <h1>Login/Registrazione</h1>
        <br></br>
        <h4>Hai già un account Stop! Bullying?</h4>
        <Button variant='info' className="accessoButton" style={{fontWeight:'bold'}}
          onClick={() => this.setState({ openRegistrazione: false , openAccesso: !openAccesso})}
          aria-controls="collapse-accedi"
          aria-expanded={openAccesso}>
          Accedi
        </Button>
        <br></br>
        <Collapse in={this.state.openAccesso}>
          <div className="" id="collapse-accedi">
            {this.formAccesso()}
          </div>
        </Collapse>
        
        <br></br>
        <h4>Prima volta su Stop! Bullying?</h4>
        <Button variant='info' className="accessoButton" style={{fontWeight:'bold'}}
          onClick={() => this.setState({ openAccesso: false , openRegistrazione: !openRegistrazione})}
          aria-controls="collapse-registrazione"
          aria-expanded={openRegistrazione}>
          Iscriviti ora
        </Button>
        <br></br>
        <Collapse in={this.state.openRegistrazione}>
          <div className="" id="collapse-registrazione">
          {this.formRegistrazione()}
          </div>
        </Collapse>
        <br></br>
      </div>   
      );
    }
  }

export default Login;