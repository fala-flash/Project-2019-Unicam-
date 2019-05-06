import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';
import { Button, Form, Card, Collapse } from 'react-bootstrap';

import { FiMessageCircle, FiInfo } from 'react-icons/fi';
import { FaPhone, FaHome } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";

//eslint-disable-next-line
import Style from '../../style.css';

class BlogPsicologo extends Component {

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
      commentiPsicologo: [],
      commento: [],
      txtComment: null
    }
    this.resetCommenta = this.resetCommenta.bind(this)
    this.resetContatta = this.resetContatta.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.aggiungiCommento = this.aggiungiCommento.bind(this)
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
        rootRef.child('Segnalazioni/'+child.key+'/Commenti').once('value', snapCommenti => {
          snapCommenti.forEach(extraChild => {
            this.setState({
              commento: this.state.commento.concat([<div><br/>{extraChild.val().nome}:<br/>{extraChild.val().commento}<br/></div>])
            });
          });
          this.setState({
            commentiPsicologo: this.state.commentiPsicologo.concat([this.state.commento]),
            commento: []
          });
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
    this.state.buttonContatta.splice(index, 1, !this.state.buttonContatta[index])  //rimpiazzo 1 elemento alla posizione index con true
  }

  contattaUtente(event, index) {
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

  isInArray(value) {
    return this.state.codice.indexOf(value) > -1;
  }

  //collapse
  commentaUtente(event, index) {
    //this.scriviCommento("commento", index)
    this.resetContatta()
    this.updateCommenta(index)
    console.log("ARRAY Commenta: "+this.state.buttonCommenta)
    console.log("ARRAY Contatta: "+this.state.buttonContatta)
    event.preventDefault()
  }

  handleChange(event) {
    this.setState({txtComment: event.target.value});
  }

  aggiungiCommento(index) {
    fire.database().ref('Segnalazioni/'+ this.state.codice[index]+'/Commenti/'+this.props.userID).set({
      commento: this.state.txtComment,
      nome: this.props.name
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
    alert('Commento alla segnalazione: ' +this.state.codice[index]+' aggiunto');
  }

  readCommenti() {
    const rootRef = fire.database().ref();
    const discussioni = rootRef.child('Discussioni/')

    discussioni.once('value', snap => {
       snap.forEach(child => {

        if (this.isInArray(child.key)) {  //segnalazione effettuata dall'utente loggato
          //annullo psicologo e commento
          this.setState({
            commento: []
          })
          child.forEach(extraChild => {
            this.setState({
              commento: this.state.commento.concat([<div><br/>{extraChild.val().nome}:<br/>{extraChild.val().commento}<br/></div>])
            });
          });
          this.setState({
            commentiPsicologo: this.state.commentiPsicologo.concat([this.state.commento])
          });
        }
      });
    });
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
                <Card.Footer> 
                  {this.state.visto[index] === 'success'
                    ? 
                      <>
                        <text style={{fontWeight: "bold"}}>Risposta/e:</text>
                        <p>{this.state.commentiPsicologo[index]}</p>                         
                      </>
                    : <text style={{fontWeight: "bold"}}>In attesa di risposta</text>
                  }
                  <Form.Control className="testoForm" placeholder="inserisci testo commento" 
                    value={this.state.txtComment}
                    onChange={this.handleChange}/>
                  <Button className="commentoButton" variant="outline-light" type="submit" value="Submit"
                    onClick={() => {this.aggiungiCommento(index)}}>
                    Commenta<FiMessageCircle className="blogIcon"/>
                  </Button>
                  </Card.Footer>
                </Card>
          </div>
        ))}
      </div>
    )
  }

  componentWillMount() {
    this.readSegnalazioni()
    this.readCommenti()
  }

  render() {
    return (
      <div>
        <h3>Blog Psicologo</h3>
        {this.getSegnalazioniPsicologo()}          
      </div>
    );
  }
}

export default BlogPsicologo;