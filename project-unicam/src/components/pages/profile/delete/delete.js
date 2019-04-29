import React, { Component } from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import { Button } from 'react-bootstrap';
import {FaAngleLeft} from 'react-icons/fa';



import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


class deleteProfile extends Component{

    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
            istituto: null,
            telefono: null,
            ruolo: null
          }      

          this.deleteaccount = this.deleteaccount.bind(this);
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
              //imposto ruolo e state App
              //this.props.setLocalIstituto(this.state.istituto)
              this.props.setLocalRole(this.state.ruolo)
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
                  //imposto ruolo e state App
                  this.props.setLocalName(this.state.nome)
                  this.props.setLocalTelefono(this.state.telefono)
                  this.props.setLocalIstituto(this.state.istituto)
                  this.props.setLocalRole(this.state.ruolo)
                  this.props.setStateUser()
                } else if (snapshot.val() === null) {  //altrimenti nulla
                  alert('problemi lettura dati account')
                }
            })  
            }
        })
      }

      deleteaccount()
      {
        fire.database().ref('Utente/'+this.props.userID).remove();
        
        
        // se psicologo
        //fire.database().ref('Psicologo/'+this.props.userID).remove();


        //logout
        fire.auth().signOut()
        this.deleteStorage()
    }

    deleteStorage() {
      let keysToRemove = ["userID", "email", "istituto", "nome", "telefono"];
      keysToRemove.forEach(k => localStorage.removeItem(k))
    }

      componentDidMount() {
        this.readUserData();
      }

      render () {        
        return (
            <div>
                <div style={{display:"flex", justifyContent:"left"}}><Button variant="info" href="/profile"> <FaAngleLeft    /> </Button></div>
                
               <h1>Elimina il tuo profilo</h1>
               <br/>
               <h4><strong>Una volta eliminato l'account non potrai più leggere alcuna delle tue conversazioni.</strong></h4>

               <br/>
               <br/>
               <br/>

               <OverlayTrigger
      trigger="click"
      key='bottom'      placement='bottom'
      overlay={
        <Popover
          id={`popover-positioned-bottom`}
          title={`Elimina`}
        >
          <strong>Eliminare Definitivamnte ?</strong>  <br/>
          <br/>
          <br/>         
          <div className="btn-toolbar" style={{display:'felx'}}>
          
        <Button  variant="danger" onClick={this.deleteaccount} > Elimina</Button>  {   }
        <Button style={{marginLeft:50}} href="/deleteProfile "variant="secondary">Annulla</Button>
        </div>
        </Popover>
      }
    >
      <Button variant="secondary">Elimina account </Button>
    </OverlayTrigger>
            </div>
        );
      }    
}

export default deleteProfile;