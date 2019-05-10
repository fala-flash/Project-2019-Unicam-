import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';
import { Redirect } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { FiSend,  } from 'react-icons/fi';

//eslint-disable-next-line
import Style from '../../style.css';

class BlogUtente extends Component {

  constructor() {
    super();
    this.state = {
      codice: [],
      messaggio: [],
      data: [],
      //textarea
			rows: 1,
			minRows: 1,
      maxRows: 15,
      txtSegnalazione: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleTextArea = this.handleTextArea.bind(this)
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
    const codiceSegnalazione = this.uniqueIDCode();
    const data = this.getData();
    if (this.state.txtSegnalazione !== '' && this.state.txtSegnalazione !== null && this.state.txtSegnalazione.length > 0) {
      if(codiceSegnalazione !== '' && codiceSegnalazione !== null) {
        this.writeUserData(codiceSegnalazione, this.props.userID, this.state.txtSegnalazione, data) //id=this.state.userID
        alert('Segnalazione '+codiceSegnalazione+' inviata correttamente')
        window.location.reload();
      } else {
        alert('Errore generazione codice segnalazione, riprova')
        window.location.reload();
      }      
    } else {
      alert("Segnalazione vuota")
    }    
  }

  handleChange(event) {
    this.handleTextArea(event)
    this.setState({txtSegnalazione: event.target.value});
  }

  handleTextArea (event) {
		const textareaLineHeight = 24;
		const { minRows, maxRows } = this.state;
		
		const previousRows = event.target.rows;
  	event.target.rows = minRows; // reset number of rows in textarea 
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
    if (currentRows === previousRows) {
    	event.target.rows = currentRows;
    }
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
    
  	this.setState({
    	value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  getSegnalazioneForm() {
    return (
      <div className="segnalazioneForm">
          <Card bg="info" text="white">
            <Card.Header><Card.Title>Segnalazione</Card.Title></Card.Header>
            <Card.Body>
              <Card.Text>
                <textarea className="testoForm" placeholder="inserisci testo segnalazione"
                  rows={this.state.rows}
                  defaultValue={this.state.txtSegnalazione}
                  onChange={this.handleChange}/>
              </Card.Text>
              <Button style={{fontWeight:'bold', borderRadius:'50px'}} variant="success" className="segnalazioneButton"
                onClick={() => this.aggiungiSegnalazione()}>Invia<FiSend className="blogIcon" />
              </Button>
            </Card.Body>
          </Card>
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
    this.props.setLocation("Blog Utente")
  }

  render() {
    if (this.props.name === null || this.props.name === '' ||
        this.props.telefono === null || this.props.telefono === '' ||
        this.props.istituto === null || this.props.istituto === '') {
          alert("Completa i dati profilo per accedere alla pagina")
          return <Redirect to='/modifyProfile'/>      
    }
    return (
      <div>
        <br/>       
        {this.getSegnalazioneForm()}
        <br/>
        <br/>
        <p>Altri utenti hanno pubblicato le seguenti segnalazioni:</p>
        {this.getSegnalazioniUtente()}         
      </div>
    );
  }
}

export default BlogUtente;