import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';
import { Button, Form, Card } from 'react-bootstrap';

import { FiMessageCircle, FiPhone, FiSend } from 'react-icons/fi';
import { TiDeleteOutline } from 'react-icons/ti';

class Blog extends Component {

  constructor() {
    super();
    this.state = {
      codice: [],
      messaggio: [],
      id: [],
      visto: [],
      indexModal: null,
      nomeUtente: null,
      telefonoUtente: null
    }
  }

  uniqueIDCode() {
    var ID = Date.now();

    if (ID <= this.uniqueIDCode.previous) {
      ID = ++this.uniqueIDCode.previous;
    } else {
      this.uniqueNumber.previous = ID;
    }

    return ID;
  }

  readSegnalazioni() {
    const rootRef = fire.database().ref();
    const segnalazione = rootRef.child('Segnalazioni/')

    segnalazione.once('value', snap => {
      snap.forEach(child => {
        this.setState({
          codice: this.state.codice.concat([child.key]),
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

  }

  writeUserData(codice, idUtente, messaggioUtente) {
    fire.database().ref('Segnalazioni/' + codice).set({
      id: idUtente,
      messaggio: messaggioUtente,
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
    if (messaggio !== '') {
      this.writeUserData(codiceSegnalazione, this.props.userID, messaggio) //id=this.state.userID
      alert(`${'Segnalazione'}  ${codiceSegnalazione}  ${'inviata correttamente'}`)
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
            <Card.Header>Segnalazione</Card.Header>
            <Card.Body>
              {/* <Card.Title></Card.Title> */}
              <Card.Text>
                <Form.Group controlId="formBasicInput">
                  {/* <Form.Label> Invia la segnalazione completando i seguenti campi: </Form.Label><br /><br />  */}
                  <Form.Group className="testoForm" controlId="formBasicInput">
                    <Form.Label> Testo: </Form.Label>
                    <Form.Control className="testoForm" as="textarea" rows="2" ref={(input) => { this.testoSegnalazione = input }} />
                  </Form.Group>
                </Form.Group>
              </Card.Text>
              <Button className="commentaButton" variant="success" type="submit">Invia<FiSend className="blogIcon" />
              </Button>
              <Button variant="danger"
                onClick={() => { this.resetForm() }} ref={(form) => { this.segnForm = form }}>Cancella
                      <TiDeleteOutline className="blogIcon" />
              </Button>
            </Card.Body>
          </Card>
        </Form>
      </div>
    )
  }

  getSegnalazioni() {
    return (
      <div>
        {this.state.codice.map((codice, index) => (
          <div key={codice}>
            <br />
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
                                    <FiMessageCircle className="blogIcon" /></Button>
                  <Button variant="outline-light">
                    Contatta
                                    <FiPhone className="blogIcon" /></Button>
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
                                <FiMessageCircle className="blogIcon" /></Button>
                  <Button variant="outline-light">Contatta
                                <FiPhone className="blogIcon" /></Button>
                </Card.Body>
              </Card>
            }
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    /* this.props.setStateUser() */
    this.readSegnalazioni()
  }

  render() {
    return (
      <div>
        <h1>Blog</h1>
        <p>ID: {this.props.userID}</p>
        {/* <p>Telefono: {this.state.telefonoUtente}</p> */}
        {this.props.userType
          ?
          <>
            <p>Psicologo</p>  {/* visualizza segnalazioni da analizzare */}

          </>
          :
          <>
            <p>Utente</p> {/* visualizza pagina segnalazione */}
            {this.getSegnalazioneForm()}
            {this.getSegnalazioni()}
          </>
        }
      </div>
    );
  }
}

export default Blog;