import React, { Component } from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import { Button, Form } from 'react-bootstrap';
import {FaAngleLeft, FaUserCircle} from 'react-icons/fa';

class modifyProfile extends Component{

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
                  window.location.reload();
                }
            })  
            }
        })
      }

      writeUserData(id, no, tel, ist) {
        fire.database().ref(this.props.ruolo + '/' + id).update({
            nome: no,
            telefono: tel,
            istituto: ist
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
      }

      aggiornaDati() {
        const nome = this.aggiornaNome.value
        const istituto = this.aggiornaIstituto.value            
        const telefono = this.aggiornaTelefono.value
        if (nome !== '' && istituto !== '' && telefono !== '') {
          this.writeUserData(this.props.userID, nome, telefono, istituto)
        } else {
          alert("Tutti i campi devono essere compilati")
        }
        //this.datiForm.reset();
      }

      componentWillMount() {
        this.readUserData();
        this.props.setLocation("Profilo "+this.props.ruolo)
      }

      render () {        
        return (
            <div>
              <div style={{display:"flex", justifyContent:"left"}}>
                <Button style={{fontWeight:'bold', borderRadius:'360px'}} variant="info" href="/profile"><FaAngleLeft/>
                </Button>
              </div>
              {this.props.picture === 'null'
              ? <Button style={{fontWeight:'bold', borderRadius:'360px'}} variant="outline" href="/profile" size="sm">
                  <FaUserCircle size={60}/>
                </Button> 
              : <Button style={{fontWeight:'bold', borderRadius:'360px'}} variant="outline" href="/profile" size="sm">
                  <img className="profileImg" src={this.props.picture} alt="UserPicture"/>
                </Button> 
              }
              <Form className="formDati" onSubmit={(event) => this.aggiornaDati(event)} ref={(form) => { this.datiForm = form }}>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Nome</Form.Label>
                      {this.props.name === '' || this.props.name === null
                      ?   <Form.Control style={{fontWeight:'bold', borderRadius:'50px'}} className="formDatiLabel" type="text" placeholder="inserisci nome" ref={(input) => { this.aggiornaNome = input }}/>
                      :   <Form.Control style={{fontWeight:'bold', borderRadius:'50px'}} className="formDatiLabel" type="text" defaultValue={this.props.name} ref={(input) => { this.aggiornaNome = input }}/>
                      }                        
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      {this.props.email === '' || this.props.email === null
                      ?   <Form.Control style={{fontWeight:'bold', borderRadius:'50px'}} className="formDatiLabel" type="text" placeholder="inserisci email" ref={(input) => { this.aggiornaEmail = input }}/>
                      :   <Form.Control style={{fontWeight:'bold', borderRadius:'50px'}} className="formDatiLabel" type="text" value={this.props.email}/>
                      }
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Istituto</Form.Label>
                      {this.props.istituto === ''  || this.props.istituto === null
                      ?   <Form.Control style={{fontWeight:'bold', borderRadius:'50px'}} className="formDatiLabel" type="text" placeholder="inserisci istituto" ref={(input) => { this.aggiornaIstituto = input }}/>
                      :   <Form.Control style={{fontWeight:'bold', borderRadius:'50px'}} className="formDatiLabel" type="text" defaultValue={this.props.istituto} ref={(input) => { this.aggiornaIstituto = input }}/>
                      }
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>Telefono</Form.Label>
                      {this.props.telefono === ''  || this.props.telefono === null
                      ?   <Form.Control style={{fontWeight:'bold', borderRadius:'50px'}} className="formDatiLabel" type="text" placeholder="inserisci telefono" ref={(input) => { this.aggiornaTelefono = input }}/>
                      :   <Form.Control style={{fontWeight:'bold', borderRadius:'50px'}} className="formDatiLabel" type="text" defaultValue={this.props.telefono} ref={(input) => { this.aggiornaTelefono = input }}/>
                      }
                  </Form.Group>
                  {/* <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control className="formDatiLabel" type="text" defaultValue={this.props.email} ref={(input) => { this.aggiornaEmail = input }}/>
                  </Form.Group>                    
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Istituto</Form.Label>
                      <Form.Control className="formDatiLabel" type="text" placeholder={this.state.istituto} ref={(input) => { this.aggiornaIstituto = input }}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>Telefono</Form.Label>
                      <Form.Control className="formDatiLabel" type="text" placeholder={this.state.telefono} ref={(input) => { this.aggiornaTelefono = input }}/>
                  </Form.Group> */}
                  <Form.Group controlId="formBasicChecbox">
                  </Form.Group>
                  <br></br>            
                  <Button style={{fontWeight:'bold', borderRadius:'50px'}} variant="info" type="submit">
                      Aggiorna
                  </Button>                       
                </Form>
            </div>
        );
      }    
}

export default modifyProfile;