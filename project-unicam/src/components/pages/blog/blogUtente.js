import React, { Component } from "react";
import { fire } from "../../../config/FirebaseConfig";
import { Redirect } from "react-router-dom";
import { Button, Card, Tabs, Tab } from "react-bootstrap";
import { FiSend } from "react-icons/fi";

//eslint-disable-next-line
import Style from "../../style.css";

class BlogUtente extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      istituto: "",
      telefono: "",
      ruolo: "",
      codice: [],
      messaggio: [],
      data: [],
      //textarea
      rows: 1,
      minRows: 1,
      maxRows: 15,
      txtSegnalazione: null,
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTextArea = this.handleTextArea.bind(this);
    
  }

  sentimentAnal(testoSegnalazione) {
    const sentiment = require("multilang-sentiment");

    let valutazione;
    

    const segnalazione = sentiment(testoSegnalazione, "it");

    if (segnalazione.score <= -3) {
      valutazione = "pericoloso";
    } else if (segnalazione.score === -2) {
      valutazione = "molto negativo";
    } else if (segnalazione.score === -1) {
      valutazione = "negativo";
    } else if (segnalazione.score === 0) {
      valutazione =
        "neutrale\n\n(potrebbero essere presenti errori di ortografia che minano la corretta esecuzione dell'algoritmo di valutazione!)";
    } else if (segnalazione.score === 1) {
      valutazione = "positivo";
    } else if (segnalazione.score === 2) {
      valutazione = "molto positivo";
    } else if (segnalazione.score >= 3) {
      valutazione = "utile agli altri utenti";
    }

    

    console.log("punteggio: " + segnalazione.score + "\n");
    console.log("comparativa: " + segnalazione.comparative + "\n");
    console.dir(segnalazione);
    console.log("\nvalutazione: " + valutazione);

    return {punteggioAnalisi: segnalazione.score, valutazioneAnalisi: valutazione}
    
  }

  uniqueIDCode() {
    var ID = Date.now();
    return ID;
  }

  getData() {
    const giorno = new Date().getDate();
    const mese = new Date().getMonth() + 1;
    const anno = new Date().getFullYear();
    return `${giorno}${"/"}${mese < 10 ? `0${mese}` : `${mese}`}${"/"}${anno}`;
  }

  readUserData() {
    const rootUtente = fire.database().ref("Utente/" + this.props.userID);

    rootUtente.on("value", snap => {
      if (snap.val() !== null) {
        //se utente
        this.setState({
          nome: snap.val().nome,
          istituto: snap.val().istituto,
          telefono: snap.val().telefono,
          ruolo: "Utente"
        });
        this.props.setLocalRole(this.state.ruolo);
        this.props.setLocalName(this.state.nome);
        this.props.setLocalIstituto(this.state.istituto);
        this.props.setLocalTelefono(this.state.telefono);
        this.props.setStateUser();
      } else if (snap.val() === null) {
        //altrimenti nulla
        alert("problemi lettura dati account");
        window.location.reload();
      }
    });
  }

  readSegnalazioni() {
    const rootRef = fire.database().ref();
    const segnalazione = rootRef.child("Segnalazioni/");

    segnalazione.once("value", snap => {
      snap.forEach(child => {
        this.setState({
          codice: this.state.codice.concat([child.key]),
          messaggio: this.state.messaggio.concat([child.val().messaggio]),
          data: this.state.data.concat([child.val().data])
        });
      });
    });
  }

  writeUserData(
    codice,
    idUtente,
    messaggioUtente,
    dataSegnalazione,
    punteggio,
    valutazione
  ) {
    fire
      .database()
      .ref("Segnalazioni/" + codice)
      .set({
        id: idUtente,
        messaggio: messaggioUtente,
        data: dataSegnalazione,
        visto: "false",
        punteggioAnalisi: punteggio,
        valutazioneAnalisi: valutazione
      })
      .then(data => {
        //success callback
        console.log("data ", data);
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });
  }

  aggiungiSegnalazione() {
    const codiceSegnalazione = this.uniqueIDCode();
    const data = this.getData();
    
    if (
      this.state.txtSegnalazione !== "" &&
      this.state.txtSegnalazione !== null &&
      this.state.txtSegnalazione.length > 0
    ) {
      if (codiceSegnalazione !== "" && codiceSegnalazione !== null) {
        const punteggioSentiment = this.sentimentAnal(this.state.txtSegnalazione).punteggioAnalisi;
        const valutazioneSentiment = this.sentimentAnal(this.state.txtSegnalazione).valutazioneAnalisi;
        
        console.log("punteggioSentiment"+punteggioSentiment);
        console.log("valutazioneSentiment"+valutazioneSentiment);

        this.writeUserData(
          codiceSegnalazione,
          this.props.userID,
          this.state.txtSegnalazione,
          data,
          punteggioSentiment,
          valutazioneSentiment
        ); //id=this.state.userID

        alert("Segnalazione " + codiceSegnalazione + " inviata correttamente");
        window.location.reload();
      } else {
        alert("Errore generazione codice segnalazione, riprova");
        window.location.reload();
      }
    } else {
      alert("Segnalazione vuota");
    }
  }

  handleChange(event) {
    this.handleTextArea(event);
    this.setState({ txtSegnalazione: event.target.value });
  }

  handleTextArea(event) {
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
      rows: currentRows < maxRows ? currentRows : maxRows
    });
  }

  getSegnalazioneForm() {
    return (
      <div className="segnalazioneForm">
        <br />
        <Card style={{ borderRadius: "20px" }} bg="info" text="white">
          <Card.Header>
            <Card.Title>Segnalazione</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <textarea
                className="testoForm"
                placeholder="inserisci testo segnalazione"
                rows={this.state.rows}
                defaultValue={this.state.txtSegnalazione}
                onChange={this.handleChange}
              />
            </Card.Text>
            <Button
              style={{ fontWeight: "bold", borderRadius: "50px" }}
              variant="success"
              className="segnalazioneButton"
              onClick={() => this.aggiungiSegnalazione()}
            >
              Invia
              <FiSend className="blogIcon" />
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  getSegnalazioniUtente() {
    if (this.state.codice.length > 0) {
      return (
        <div>
          {this.state.codice.map((codice, index) => (
            <div key={codice}>
              <br />
              <Card
                style={{ borderRadius: "20px" }}
                bg="info"
                text="white"
                className="cardStyle"
              >
                <Card.Header>
                  <Card.Title>
                    Segnalazione #{codice} del {this.state.data[index]}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{this.state.messaggio[index]}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h5>Non ci sono segnalazioni da visualizzare</h5>
        </div>
      );
    }
  }

  getSegnalazioni() {
    return (
      <div>
        <Tabs
          style={{ position: "fixed" }}
          className="tabsDiv"
          defaultActiveKey="segnala"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="segnala" title="Segnala">
            <br />
            <br />
            {this.getSegnalazioneForm()}
          </Tab>
          <Tab eventKey="leggiSegnalazioni" title="Tutte Le Segnalazioni">
            <br />
            <br />
            {this.getSegnalazioniUtente()}
          </Tab>
        </Tabs>
      </div>
    );
  }

  componentWillMount() {
    this.readUserData();
    this.readSegnalazioni();
    this.props.setLocation("Blog Utente");
  }

  render() {
    if (
      this.props.name === "" ||
      this.props.telefono === "" ||
      this.props.istituto === ""
    ) {
      alert("Completa i dati profilo per accedere alla pagina");
      return <Redirect to="/modifyProfile" />;
    }
    return <div>{this.getSegnalazioni()}</div>;
  }
}

export default BlogUtente;
