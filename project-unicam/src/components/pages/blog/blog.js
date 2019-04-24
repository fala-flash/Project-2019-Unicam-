import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';
import { Button, Form, Card, Collapse } from 'react-bootstrap';

import { FiMessageCircle, FiSend, FiInfo } from 'react-icons/fi';
import { FaPhone, FaHome } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdEmail } from "react-icons/md";

//eslint-disable-next-line
import Style from '../../style.css';

class Blog extends Component {

  constructor() {
    super();
    this.state = {
      nome: null,
      email: null,
      istituto: null,
      telefono: null,
      codice: [],
      messaggio: [],
      id: [],
      visto: [],
      buttonCommenta: [],
      buttonContatta: [],
      indexModal: null
    }
    //this.contattaUtente = this.contattaUtente.bind(this)
  }

  uniqueIDCode() {
    var ID = Date.now();
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
          visto: this.state.visto.concat([child.val().visto]),
          buttonCommenta: this.state.buttonCommenta.concat(false),
          buttonContatta: this.state.buttonContatta.concat(false)
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
              <Button style={{fontWeight:'bold'}} className="commentaButton" variant="success" type="submit">Invia<FiSend className="blogIcon" />
              </Button>
              <Button variant="danger" style={{fontWeight:'bold'}}
                onClick={() => { this.resetForm() }} ref={(form) => { this.segnForm = form }}>Cancella
                      <TiDeleteOutline className="blogIcon" />
              </Button>
            </Card.Body>
          </Card>
        </Form>
      </div>
    )
  }

  contattaUtente(event, index) {
    //alert(this.state.id[index])
    const rootUtente = fire.database().ref('Utente/'+this.state.id[index]);
    rootUtente.on('value', snap => {  //verifico se utente
        if (snap.val() !== null) {  //utente
          this.setState({
            nome: snap.val().nome,
            email: snap.val().email,
            istituto: snap.val().istituto,
            telefono: snap.val().telefono
          })
        } else if (snap.val() === null) {  //se non è utente
          alert("Impossibile recuperare dati utente")  
        }
    })
      let stateCommenta = this.state.buttonCommenta.slice(); //creo un clone dello state buttonCommenta
      stateCommenta[index] = false; //setto a false lo stato dell'index dell'array
      this.setState({buttonCommenta: stateCommenta}); //setto lo state così, altrimenti da warning
      //faccio la stessa cosa per buttonContatta
      let stateContatta = this.state.buttonContatta.slice();
      stateContatta[index] = !this.state.buttonContatta[index];
      this.setState({buttonContatta: stateContatta});
      event.preventDefault()
  }

  commentaUtente(event, index) {
    fire.database().ref('Discussioni/'+ this.state.codice[index]+'/'+this.props.userID).set({
      commento: "commentoPsicologo"
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
    fire.database().ref('Segnalazioni/'+ this.state.codice[index]).update({
      visto: "true"
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
      let stateContatta2 = this.state.buttonContatta.slice(); //creo un clone dello state buttonContatta
      stateContatta2[index] = false; //setto a false lo stato dell'index dell'array
      this.setState({buttonContatta: stateContatta2}); //setto lo state così, altrimenti da warning
      //faccio la stessa cosa per buttonCommenta
      let stateCommenta2 = this.state.buttonCommenta.slice();
      stateCommenta2[index] = !this.state.buttonCommenta[index];
      this.setState({buttonContatta: stateCommenta2});
      event.preventDefault()
  }

  getSegnalazioni() {
    return (
      <div>
        {this.state.codice.map((codice, index) => (
          <div key={codice}>
            <br />
            {this.state.visto[index] === 'true'
              ?
              <div>
              <Card bg="success" text="white" className="cardStyle">
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Header><Card.Title>Segnalazione #{codice}</Card.Title></Card.Header>
                <Card.Body>
                  <Card.Text>
                    {this.state.messaggio[index]}
                  </Card.Text>
                  <Button className="blogButton" variant="outline-light"
                      onClick={(event) => {this.commentaUtente(event, index)}}
                      aria-controls="collapse-commenta"
                      aria-expanded={this.state.buttonCommenta[index]}>Commenta
                      <FiMessageCircle className="blogIcon"/>
                    </Button>
                    {/* <Button variant="outline-light" className="blogButton"
                      onClick={(event) => {this.contattaUtente(event, index)}}
                      aria-controls="collapse-accedi" 
                      aria-expanded={this.state.buttonContatta[index]}>Contatta
                      <FiPhone className="blogIcon" />
                    </Button> */}
                    <Button className="blogButton" variant="outline-light"
                      onClick={(event) => {this.contattaUtente(event, index)}}
                      aria-controls="collapse-info"
                      aria-expanded={this.state.buttonContatta[index]}>Info Utente
                      <FiInfo className="blogIcon"/>
                    </Button>
                </Card.Body>
              </Card>

              <Collapse in={this.state.buttonCommenta[index]}>
              <div className="" id="collapse-commenta">
                <p>AAA</p>
              </div>
              </Collapse>

              <Collapse in={this.state.buttonContatta[index]}>
              <div className="infoCard" id="collapse-info">
              <Card bg="info" style={{fontWeight:'bold' }}>
                  <Card.Body>
                      <ul style={{listStyleType: 'none'}}>
                        <li><p>{this.state.nome}</p></li>
                        <li><a style={{color:'white'}} href={"tel:"+ this.state.telefono}>
                            {this.state.telefono}</a><FaPhone className="contattiIcon"/>
                        </li>
                        <li><a style={{color:'white'}} href={"https://www.google.com/search?q="+ this.state.istituto}>
                            {this.state.istituto}</a><FaHome className="contattiIcon"/>
                        </li>
                        <li><a style={{color:'white'}} href={"mailto:"+ this.state.email}>
                            {this.state.email}</a><MdEmail className="contattiIcon"/>
                        </li>
                      </ul>
                  </Card.Body>
              </Card>
              </div>
              </Collapse>
              </div>
              :
              <div>
                <Card bg="danger" text="white" className="cardStyle">
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Header><Card.Title>Segnalazione #{codice}</Card.Title></Card.Header>
                  <Card.Body>
                    {/* <Card.Title>{this.state.id[index]}</Card.Title> */}
                    <Card.Text>
                      {this.state.messaggio[index]}
                    </Card.Text>
                    <Button className="blogButton" variant="outline-light"
                      onClick={(event) => {this.commentaUtente(event, index)}}
                      aria-controls="collapse-commenta"
                      aria-expanded={this.state.buttonCommenta[index]}>Commenta
                      <FiMessageCircle className="blogIcon"/>
                    </Button>
                    {/* <Button variant="outline-light" className="blogButton"
                      onClick={(event) => {this.contattaUtente(event, index)}}
                      aria-controls="collapse-accedi" 
                      aria-expanded={this.state.buttonContatta[index]}>Contatta
                      <FiPhone className="blogIcon" />
                    </Button> */}
                    <Button className="blogButton" variant="outline-light"
                      onClick={(event) => {this.contattaUtente(event, index)}}
                      aria-controls="collapse-info"
                      aria-expanded={this.state.buttonContatta[index]}>Info Utente
                      <FiInfo className="blogIcon"/>
                    </Button>
                  </Card.Body>
                </Card>

                <Collapse in={this.state.buttonCommenta[index]}>
                  <div className="" id="collapse-commenta">
                    <p>AAA</p>
                  </div>
                </Collapse>

              <Collapse in={this.state.buttonContatta[index]}>
                <div className="infoCard" id="collapse-info">
                  <Card bg="info" style={{fontWeight:'bold' }}>
                      <Card.Body>
                          <ul style={{listStyleType: 'none'}}>
                            <li><p>{this.state.nome}</p></li>
                            <li><a style={{color:'white'}} href={"tel:"+ this.state.telefono}>
                                {this.state.telefono}</a><FaPhone className="contattiIcon"/>
                            </li>
                            <li><a style={{color:'white'}} href={"https://www.google.com/search?q="+ this.state.istituto}>
                                {this.state.istituto}</a><FaHome className="contattiIcon"/>
                            </li>
                            <li><a style={{color:'white'}} href={"mailto:"+ this.state.email}>
                                {this.state.email}</a><MdEmail className="contattiIcon"/>
                            </li>
                          </ul>
                      </Card.Body>
                  </Card>
                </div>
              </Collapse>
            </div>
            }
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    this.readSegnalazioni()
    //this.uniqueIDCode()
  }

  render() {
    return (
      <div>
        <h3>Blog {this.props.ruolo}</h3>
        {/* <p>ID: {this.props.userID}</p> */}
        {this.props.ruolo === 'Psicologo'
          ?
          <>
            {/* visualizza segnalazioni da analizzare */}
            {this.getSegnalazioni()}
          </>
          :
          <>
            {/* visualizza pagina segnalazione */}
            {this.getSegnalazioneForm()}
          </>
        }
      </div>
    );
  }
}

export default Blog;