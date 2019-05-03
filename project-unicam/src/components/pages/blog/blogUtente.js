import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';
import { Button, Form, Card } from 'react-bootstrap';

import { FiSend,  } from 'react-icons/fi';
import { TiDeleteOutline } from 'react-icons/ti';

//eslint-disable-next-line
import Style from '../../style.css';

class BlogUtente extends Component {

  constructor() {
    super();
    this.state = {
      codice: [],
      messaggio: [],
      data: []
    }
  }

  uniqueIDCode() {
    var ID = Date.now();
    return ID;
  }

  getData() {
    const giorno = new Date().getDate();
    const mese = new Date().getMonth() + 1;
    const anno = new Date().getFullYear();
    return `${giorno}${'/'}${mese<10?`0${mese}`:`${mese}`}${'/'}${anno}`
  }

  readSegnalazioni() {
    const rootRef = fire.database().ref();
    const segnalazione = rootRef.child('Segnalazioni/')

    segnalazione.once('value', snap => {
      snap.forEach(child => {
        this.setState({
          codice: this.state.codice.concat([child.key]),
          messaggio: this.state.messaggio.concat([child.val().messaggio]),
          data: this.state.data.concat([child.val().data])
        });
      });
    });
  }

  writeUserData(codice, idUtente, messaggioUtente, dataSegnalazione) {
    fire.database().ref('Segnalazioni/' + codice).set({
      id: idUtente,
      messaggio: messaggioUtente,
      data: dataSegnalazione,
      visto: "false",
    }).then((data) => {
      //success callback
      console.log('data ', data)
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
  }

  aggiungiSegnalazione() {
    /* const codice = this.accountInput.value
    const idUtente = this.usernameInput.value */
    const messaggio = this.testoSegnalazione.value
    const codiceSegnalazione = this.uniqueIDCode();
    const data = this.getData();
    if (messaggio !== '') {
      if(codiceSegnalazione !== '' && codiceSegnalazione !== null) {
        this.writeUserData(codiceSegnalazione, this.props.userID, messaggio, data) //id=this.state.userID
      alert('Segnalazione '+codiceSegnalazione+' inviata correttamente')
      } else {
        alert('Errore generazione codice segnalazione, riprova')
      }      
    } else {
      alert("Tutti i campi devono essere compilati")
    }
    this.segnForm.reset();
  }

  resetForm() {
    this.segnForm.reset();
  }

  getSegnalazioneForm() {
    return (
      <div className="segnalazioneForm">
        <Form onSubmit={() => { this.aggiungiSegnalazione() }} ref={(form) => { this.segnForm = form }}>
          <Card bg="info" text="white" className="cardStyle">
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Header style={{fontWeight:'bold'}}>Segnalazione</Card.Header>
            <Card.Body>
              {/* <Card.Title></Card.Title> */}
              <Card.Text>
                <Form.Group controlId="formBasicInput">
                  {/* <Form.Label> Invia la segnalazione completando i seguenti campi: </Form.Label><br /><br />  */}
                  <Form.Group className="testoForm" controlId="formBasicInput">
                    <Form.Label style={{fontWeight:'bold'}}> Testo: </Form.Label>
                    <Form.Control className="testoForm" as="textarea" rows="2" ref={(input) => { this.testoSegnalazione = input }} />
                  </Form.Group>
                </Form.Group>
              </Card.Text>
              <Button variant="success" style={{fontWeight:'bold'}} className="segnalazioneButton" type="submit">Invia<FiSend className="blogIcon" />
              </Button>
              <Button variant="danger" style={{fontWeight:'bold'}} className="segnalazioneButton"
                onClick={() => { this.resetForm() }} ref={(form) => { this.segnForm = form }}>Cancella
                <TiDeleteOutline className="blogIcon" />
              </Button>
            </Card.Body>
          </Card>
        </Form>
      </div>
    )
  }

  getSegnalazioniUtente() {
    return (
      <div>
        {this.state.codice.map((codice, index) => (
          <div key={codice}>
            <br/>            
              <Card bg="info" text="white" className="cardStyle">              
                <Card.Header><Card.Title>Segnalazione #{codice} del {this.state.data[index]}</Card.Title></Card.Header>
                <Card.Body>                
                  <Card.Text>
                    {this.state.messaggio[index]}
                  </Card.Text>
                </Card.Body>
              </Card>
          </div>
        ))}
      </div>
    )
  }

  componentWillMount() {
    this.readSegnalazioni()
  }

  render() {
    return (
      <div>
        <h3>Blog Utente</h3>        
        {this.getSegnalazioneForm()}
        <br/>
        <p>Altri utenti hanno pubblicato le seguenti segnalazioni:</p>
        {this.getSegnalazioniUtente()}         
      </div>
    );
  }
}

export default BlogUtente;