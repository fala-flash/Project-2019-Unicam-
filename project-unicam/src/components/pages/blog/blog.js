import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';
import { Button, Card} from 'react-bootstrap';

import { FiMessageCircle, FiPhone } from 'react-icons/fi';

class Blog extends Component{

    constructor() {
        super();
        this.state = {
            userID: null, //this.props.userID
            codice: [],            
            messaggio: [],
            id: [],
            visto: [],
            indexModal: null,
            nomeUtente: null,
            telefonoUtente: null
          }      
      }

      readSegnalazioni() {
        const rootRef = fire.database().ref();
        const segnalazione = rootRef.child('Segnalazioni/')
        
        segnalazione.once('value', snap => {
          snap.forEach(child => {
            this.setState({
                codice: this.state.codice.concat([child.val().codice]),
                messaggio: this.state.messaggio.concat([child.val().messaggio]),
                id: this.state.id.concat([child.val().id]),
                visto: this.state.visto.concat([child.val().visto])
                /* button: this.state.button.concat(false), */
            });
          });    
        });         
      }

      getDatiUtente() {
        /* const rootRef = fire.database().ref();
        const utente = rootRef.child('Utente/001')
        utente.once('value', snap => {
          snap.forEach(child => {
            this.setState({
              nomeUtente: child.val().nome,
               telefonoUtente: child.val().telefono
            });
          });    
        });
        alert('Telefono '+this.state.telefonoUtente) */

        const rootRef = fire.database().ref();
        const utente = rootRef.child('Utente/001/')
        utente.on('value', snap => {
            alert(snap.val())
          });
      }

      consoleDisplay() {
        alert('ciao')
      }

      getSegnalazioni() {
        return (
            <div>
              {this.state.codice.map((codice, index) => (
                  <div key={codice}>
                    <br/>
                    {this.state.visto[index] === 'true'
                      ? 
                          <Card bg="success" text="white" className="cardStyle">
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Header>Segnalazione #{codice} visto: {this.state.visto[index]}</Card.Header>
                              <Card.Body>
                                  <Card.Title>{this.state.id[index]}</Card.Title>
                                  <Card.Text>
                                      {this.state.messaggio[index]}
                                  </Card.Text>
                                  <Button className="commentaButton" variant="outline-light">Commenta 
                                    <FiMessageCircle className="blogIcon"/></Button>
                                  <Button variant="outline-light" onClick={this.getDatiUtente}>
                                    Contatta 
                                    <FiPhone className="blogIcon"/></Button>
                              </Card.Body>
                            </Card>
                      : 
                        <Card bg="danger" text="white" className="cardStyle">
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Header>Segnalazione #{codice} stato: {this.state.visto[index]}</Card.Header>
                          <Card.Body>
                              <Card.Title>{this.state.id[index]}</Card.Title>
                              <Card.Text>
                                  {this.state.messaggio[index]}
                              </Card.Text>
                              <Button className="commentaButton" variant="outline-light">Commenta 
                                <FiMessageCircle className="blogIcon"/></Button>
                              <Button variant="outline-light">Contatta 
                                <FiPhone className="blogIcon"/></Button>
                          </Card.Body>
                        </Card>
                    }    
                  </div>
                ))}
            </div>      
          )
      }

      componentDidMount() {
        this.readSegnalazioni()
      }

      render () {
        return (
            <div>
                <h1>Blog</h1>
                <p>Nome: {this.state.nomeUtente}</p>
                <p>Telefono: {this.state.telefonoUtente}</p>
                {this.props.userType
                    ? 
                        <>
                            <p>Psicologo</p>  {/* visualizza segnalazioni da analizzare */}
                            
                        </>
                    :
                        <>
                            <p>Utente</p> {/* visualizza pagina segnalazione */}
                            {this.getSegnalazioni()}
                        </>
                }
            </div>
        );
      }    
}

export default Blog;