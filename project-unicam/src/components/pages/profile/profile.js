import React, { Component } from "react";
import { fire } from '../../../config/FirebaseConfig';
import { Button } from "react-bootstrap";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      nome: null,
      email: null,
      istituto: null,
      telefono: null,
      ruolo: null
    }  
  }

  readUserData() {
    const rootUtente = fire.database().ref('Utente/'+this.props.userID);
    const rootPsicologo = fire.database().ref('Psicologo/'+this.props.userID);        
    
    rootUtente.on('value', snap => {  //verifico se utente
        if (snap.val() !== null) {  //utente
          this.setState({
            nome: snap.val().nome,
            istituto: snap.val().istituto,
            telefono: snap.val().telefono,
            ruolo: 'Utente'
          })
          this.props.setLocalRole(this.state.ruolo)
          this.props.setLocalIstituto(this.state.istituto)
          this.props.setLocalTelefono(this.state.telefono)              
          this.props.setStateUser()
        } else if (snap.val() === null) {  //se non è utente
          rootPsicologo.on('value', snapshot => { //verifico se psicologo
            if (snapshot.val() !== null) {  //se psicologo
              this.setState({
                nome: snapshot.val().nome,
                email: snapshot.val().email,
                istituto: snapshot.val().istituto,
                telefono: snapshot.val().telefono,
                ruolo: 'Psicologo'
              })
              this.props.setLocalRole(this.state.ruolo)
              this.props.setLocalName(this.state.nome)
              this.props.setLocalTelefono(this.state.telefono)
              this.props.setLocalIstituto(this.state.istituto)                  
              this.props.setStateUser()
            } else if (snapshot.val() === null) {  //altrimenti nulla
              alert('problemi lettura dati account')
              window.location.reload()
            }
        })  
        }
    })
  }

  componentWillMount() {
    this.readUserData();
  }

  render() {
    return (
      <div>
        <h3 style={{fontWeight:'bold'}}>Profilo {this.props.ruolo}</h3>
        <br/>
        <br/>
        {this.props.ruolo === 'Psicologo'
          ? 
            <Button style={{fontWeight:'bold', borderRadius:'50px'}} href="/myComments" variant="success" size="lg">
              Le mie Risposte
            </Button>
          : null
        }

        {this.props.ruolo === 'Utente'
          ? 
            <Button style={{fontWeight:'bold', borderRadius:'50px'}} href="/myReports" variant="success" size="lg">
              Le mie Segnalazioni
            </Button>
          : null
        }
        <br/>
        <br/>
        <Button style={{fontWeight:'bold', borderRadius:'50px'}} href="modifyProfile" variant="info" size="lg">
          Modifica profilo
        </Button>
        <br/>
        <br/>
        <Button style={{fontWeight:'bold', borderRadius:'50px'}} href="deleteProfile" variant="danger" size="lg">
          Elimina profilo
        </Button>
        <br/>
        <br/>
        <Button style={{fontWeight:'bold', borderRadius:'50px'}} href="logout" variant="secondary" size="lg">
          Logout
        </Button>
      </div>
    );
  }
}

export default Profile;