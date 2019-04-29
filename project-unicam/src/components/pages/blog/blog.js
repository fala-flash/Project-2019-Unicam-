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
      data: [],
      id: [],
      visto: [],
      buttonCommenta: [],
      buttonContatta: [],
      indexModal: null,
      key: 'home'
    }
    this.resetCommenta = this.resetCommenta.bind(this)
    this.resetContatta = this.resetContatta.bind(this)
  }

  setVisto() {
    for (var i = 0; i < this.state.visto.length; i++) {
      if(this.state.visto[i] === 'true') {
        //eslint-disable-next-line
        this.state.visto[i] = 'success'
      } else if (this.state.visto[i] === 'false') {
        //eslint-disable-next-line
        this.state.visto[i] = 'danger'
      }
    }
    console.log("VISTO: "+this.state.visto)
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
          data: this.state.data.concat([child.val().data]),
          id: this.state.id.concat([child.val().id]),
          visto: this.state.visto.concat([child.val().visto]),
          buttonCommenta: this.state.buttonCommenta.concat(false),
          buttonContatta: this.state.buttonContatta.concat(false)
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

  resetCommenta() {
    for (var i = 0; i < this.state.buttonCommenta.length; i++) {
      //eslint-disable-next-line
      this.state.buttonCommenta[i] = false;
    }
  }  

  resetContatta() {
    for (var i = 0; i < this.state.buttonContatta.length; i++) {
      //eslint-disable-next-line
      this.state.buttonContatta[i] = false;
    }
  }

  updateCommenta(index) {
    for (var i = 0; i < index; i++) {
      //eslint-disable-next-line
      this.state.buttonCommenta[i] = false;
    }
    for (var j = index+1; j < this.state.buttonCommenta.length; j++) {
      //eslint-disable-next-line
      this.state.buttonCommenta[j] = false;
    }
    this.state.buttonCommenta.splice(index, 1, !this.state.buttonCommenta[index])  //rimpiazzo 1 elemento alla posizione index con true
  }

  updateContatta(index) {
    for (var i = 0; i < index; i++) {
      //eslint-disable-next-line
      this.state.buttonContatta[i] = false;
    }
    for (var j = index+1; j < this.state.buttonContatta.length; j++) {
      //eslint-disable-next-line
      this.state.buttonContatta[j] = false;
    }
    /* if (this.state.buttonContatta[index] === 'true') {
      this.state.buttonContatta.splice(index, 1, 'false')
    } else {
      this.state.buttonContatta.splice(index, 1, !this.state.buttonContatta[index])  //rimpiazzo 1 elemento alla posizione index con true
    } */
    this.state.buttonContatta.splice(index, 1, !this.state.buttonContatta[index])  //rimpiazzo 1 elemento alla posizione index con true
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
    this.resetCommenta()
    this.updateContatta(index)
    console.log("ARRAY Commenta: "+this.state.buttonCommenta)
    console.log("ARRAY Contatta: "+this.state.buttonContatta)
    event.preventDefault()
  }

  aggiungiCommento(event, index) {
    const testo = this.testoCommento.value
    alert("Commento: "+testo+this.testoCommento.value)
    //alert("Indice: "+index)
    fire.database().ref('Discussioni/'+ this.state.codice[index]+'/'+this.props.userID).set({
      commento: testo
    }).then((data)=>{
        //success callback
        //console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        //console.log('error ' , error)
    })
    fire.database().ref('Segnalazioni/'+ this.state.codice[index]).update({
      visto: "true"
    }).then((data)=>{
        //success callback
        //console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        //console.log('error ' , error)
    })
  }

/*   getCommenti(index) {
    const rootRef = fire.database().ref();
    const discussioni = rootRef.child('Discussioni/'+this.state.codice[index])
    let idCommento
    let testoCommento
    discussioni.once('value', snap => {
      snap.forEach(child => {
        idCommento = child.key,
        testoCommento = child.val().commento                
      });
    });
  } */

  commentaUtente(event, index) {
    //this.scriviCommento("commento", index)
    this.resetContatta()
    this.updateCommenta(index)
    console.log("ARRAY Commenta: "+this.state.buttonCommenta)
    console.log("ARRAY Contatta: "+this.state.buttonContatta)
    event.preventDefault()
  }

  getSegnalazioniPsicologo() {
    return (
      <div>
        {this.setVisto()}
        {this.state.codice.map((codice, index) => (
          <div key={codice}>
            <br/>            
              <Card bg={this.state.visto[index]} text="white" className="cardStyle">              
                <Card.Header><Card.Title>Segnalazione #{codice} del {this.state.data[index]}</Card.Title></Card.Header>
                <Card.Body>                
                  <Card.Text>
                    {this.state.messaggio[index]}
                  </Card.Text>
                  <Button className="blogButton" variant="outline-light"
                    onClick={(event) => {this.contattaUtente(event, index)}}
                    aria-controls="collapse-info"
                    aria-expanded={this.state.buttonContatta[index]}>Info Utente
                    <FiInfo className="blogIcon"/>
                  </Button>

                  <Collapse in={this.state.buttonContatta[index]}>
                    <div className="infoCard" id="collapse-info">
                        <p>{this.state.nome}</p>
                        <p><a style={{color:'white'}} href={"tel:"+ this.state.telefono}>
                            {this.state.telefono}</a><FaPhone className="contattiIcon"/>
                        </p>
                        <p><a style={{color:'white'}} href={"https://www.google.com/search?q="+ this.state.istituto}>
                            {this.state.istituto}</a><FaHome className="contattiIcon"/>
                        </p>
                        <p><a style={{color:'white'}} href={"mailto:"+ this.state.email}>
                            {this.state.email}</a><MdEmail className="contattiIcon"/>
                        </p>
                    </div>
                  </Collapse>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <div className="commentaFormStyle">
                    <Form onSubmit={(event, index) => { this.aggiungiCommento(event, index) }} ref={(form) => { this.commentoForm = form }}>
                      <Form.Group className="testoForm" controlId="formCommentoInput">
                        <Form.Control className="testoForm" as="textarea" rows="2" ref={(input) => { this.testoCommento = input }}/>
                      </Form.Group>
                      <Button className="commentoButton" variant="outline-light" type="submit">
                        Commenta<FiMessageCircle className="blogIcon"/>
                      </Button>
                    </Form>
                  </div>
                </Card.Footer>
              </Card>
          </div>
        ))}
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

  componentDidMount() {
    this.readSegnalazioni()
  }

  render() {
    return (
      <div>
        <h3>Blog {this.props.ruolo}</h3>
        <br/>
        {/* <p>ID: {this.props.userID}</p> */}
        {this.props.ruolo === 'Psicologo'
          ?
          <>
            {/* visualizza segnalazioni da analizzare */}
            {this.getSegnalazioniPsicologo()}
          </>
          :
          <>
            {/* visualizza pagina segnalazione */}
            {this.getSegnalazioneForm()}
            <br/>
            <p>Altri utenti hanno pubblicato le seguenti segnalazioni (ordine cronologico) :</p>
            {this.getSegnalazioniUtente()}
          </>
        }
      </div>
    );
  }
}

export default Blog;