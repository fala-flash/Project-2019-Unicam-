import React, { Component } from "react";
import { fire } from "../../../config/FirebaseConfig";
import { Redirect } from "react-router-dom";
import { Button, Card, Collapse, Modal } from "react-bootstrap";
import { FiMessageCircle, FiInfo } from "react-icons/fi";
import { FaPhone, FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";

//eslint-disable-next-line
import Style from "../../style.css";

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
      txtComment: null,
      //textarea
      rows: 1,
      minRows: 1,
      maxRows: 15,
      show: false, //modal
      indexSegnalazione: null
    };
    this.resetCommenta = this.resetCommenta.bind(this);
    this.resetContatta = this.resetContatta.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTextArea = this.handleTextArea.bind(this);
    this.aggiungiCommento = this.aggiungiCommento.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  setVisto() {
    for (var i = 0; i < this.state.visto.length; i++) {
      if (this.state.visto[i] === "true") {
        //eslint-disable-next-line
        this.state.visto[i] = "success";
      } else if (this.state.visto[i] === "false") {
        //eslint-disable-next-line
        this.state.visto[i] = "danger";
      }
    }
  }

  readSegnalazioni() {
    const rootRef = fire.database().ref();
    const segnalazione = rootRef.child("Segnalazioni/");

    segnalazione.once("value", snap => {
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
        rootRef
          .child("Segnalazioni/" + child.key + "/Commenti")
          .once("value", snapCommenti => {
            snapCommenti.forEach(extraChild => {
              this.setState({
                commento: this.state.commento.concat([
                  <div> 
                    <hr />                   
                    <span>({extraChild.val().data}) </span>
                    {extraChild.val().nome}:<br />
                    {extraChild.val().commento}
                  </div>
                ])
              });
            });
            this.setState({
              commentiPsicologo: this.state.commentiPsicologo.concat([
                this.state.commento
              ]),
              commento: []
            });
          });
      });
    });
  }

  writeUserData(codice, idUtente, messaggioUtente, dataSegnalazione) {
    fire
      .database()
      .ref("Segnalazioni/" + codice)
      .set({
        id: idUtente,
        messaggio: messaggioUtente,
        data: dataSegnalazione,
        visto: "false"
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
    for (var j = index + 1; j < this.state.buttonCommenta.length; j++) {
      //eslint-disable-next-line
      this.state.buttonCommenta[j] = false;
    }
    this.state.buttonCommenta.splice(
      index,
      1,
      !this.state.buttonCommenta[index]
    ); //rimpiazzo 1 elemento alla posizione index con true
  }

  updateContatta(index) {
    for (var i = 0; i < index; i++) {
      //eslint-disable-next-line
      this.state.buttonContatta[i] = false;
    }
    for (var j = index + 1; j < this.state.buttonContatta.length; j++) {
      //eslint-disable-next-line
      this.state.buttonContatta[j] = false;
    }
    this.state.buttonContatta.splice(
      index,
      1,
      !this.state.buttonContatta[index]
    ); //rimpiazzo 1 elemento alla posizione index con true
  }

  contattaUtente(event, index) {
    const rootUtente = fire.database().ref("Utente/" + this.state.id[index]);
    rootUtente.on("value", snap => {
      //verifico se utente
      if (snap.val() !== null) {
        //utente
        this.setState({
          nome: snap.val().nome,
          email: snap.val().email,
          istituto: snap.val().istituto,
          telefono: snap.val().telefono
        });
      } else if (snap.val() === null) {
        //se non è utente
        alert("Impossibile recuperare dati utente");
      }
    });
    this.resetCommenta();
    this.updateContatta(index);
    event.preventDefault();
  }

  isInArray(value) {
    return this.state.codice.indexOf(value) > -1;
  }

  //collapse
  commentaUtente(event, index) {
    //this.scriviCommento("commento", index)
    this.resetContatta();
    this.updateCommenta(index);
    console.log("ARRAY Commenta: " + this.state.buttonCommenta);
    console.log("ARRAY Contatta: " + this.state.buttonContatta);
    event.preventDefault();
  }

  getData() {
    const giorno = new Date().getDate();
    const mese = new Date().getMonth() + 1;
    const anno = new Date().getFullYear();
    return `${giorno}${"/"}${mese < 10 ? `0${mese}` : `${mese}`}${"/"}${anno}`;
  }

  aggiungiCommento(index) {
    const time = this.getData();
    if (
      this.state.txtComment !== "" &&
      this.state.txtComment !== null &&
      this.state.txtComment.length > 0
    ) {
      fire
        .database()
        .ref(
          "Segnalazioni/" +
            this.state.codice[index] +
            "/Commenti/" +
            this.props.userID
        )
        .set({
          commento: this.state.txtComment,
          nome: this.props.name,
          data: time
        })
        .then(data => {
          //success callback
          //console.log('data ' , data)
        })
        .catch(error => {
          //error callback
          //console.log('error ' , error)
        });
      fire
        .database()
        .ref("Segnalazioni/" + this.state.codice[index])
        .update({
          visto: "true"
        })
        .then(data => {
          //success callback
          //console.log('data ' , data)
        })
        .catch(error => {
          //error callback
          //console.log('error ' , error)
        });
      alert(
        "Commento alla segnalazione: " + this.state.codice[index] + " aggiunto"
      );
      window.location.reload();
    } else {
      alert("Commento vuoto");
    }
  }

  eliminaSegnalazione(index) {
    fire
      .database()
      .ref("Segnalazioni/" + this.state.codice[index])
      .remove();
    alert("Segnalazione " + this.state.codice[index] + " eliminata");
    window.location.reload();
  }

  handleChange(event) {
    this.handleTextArea(event);
    this.setState({ txtComment: event.target.value });
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

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(index) {
    this.setState({
      indexSegnalazione: index,
      show: true
    });
  }

  getModalElimina() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Dati segnalazione</h5>
          <ul>
            <li>ID: {this.state.codice[this.state.indexSegnalazione]}</li>
            <li>Testo: {this.state.messaggio[this.state.indexSegnalazione]}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ fontWeight: "bold", borderRadius: "50px" }}
            variant="success"
            onClick={this.handleClose}
          >
            Annulla
          </Button>
          <Button
            style={{ fontWeight: "bold", borderRadius: "50px" }}
            variant="danger"
            onClick={() =>
              this.eliminaSegnalazione(this.state.indexSegnalazione)
            }
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  getSegnalazioniPsicologo() {
    return (
      <div>
        {this.setVisto()}
        {this.state.codice.map((codice, index) => (
          <div key={codice}>
            <br />
            <Card
              bg={this.state.visto[index]}
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
                <Button
                  className="blogButton"
                  variant="outline-light"
                  style={{ fontWeight: "bold", borderRadius: "50px" }}
                  onClick={event => {
                    this.contattaUtente(event, index);
                  }}
                  aria-controls="collapse-info"
                  aria-expanded={this.state.buttonContatta[index]}
                >
                  Info Utente
                  <FiInfo className="blogIcon" />
                </Button>
                <Button
                  className="blogButtonElimina"
                  variant="outline-light"
                  style={{ fontWeight: "bold", borderRadius: "50px" }}
                  onClick={() => this.handleShow(index)}
                >
                  Elimina
                  <TiDeleteOutline className="deleteIcon" />
                </Button>
                {this.getModalElimina()}

                <Collapse in={this.state.buttonContatta[index]}>
                  <div className="infoCard" id="collapse-info">
                    <p>{this.state.nome}</p>
                    <p>
                      <a
                        style={{ color: "white" }}
                        href={"tel:" + this.state.telefono}
                      >
                        {this.state.telefono}
                      </a>
                      <FaPhone className="contattiIcon" />
                    </p>
                    <p>
                      <a
                        style={{ color: "white" }}
                        href={
                          "https://www.google.com/search?q=" +
                          this.state.istituto
                        }
                      >
                        {this.state.istituto}
                      </a>
                      <FaHome className="contattiIcon" />
                    </p>
                    <p>
                      <a
                        style={{ color: "white" }}
                        href={"mailto:" + this.state.email}
                      >
                        {this.state.email}
                      </a>
                      <MdEmail className="contattiIcon" />
                    </p>
                  </div>
                </Collapse>

                {this.state.visto[index] === "success" ? (
                  <>
                    <br/>
                    <br/>
                    <text style={{ fontWeight: "bold" }}>Risposta/e:</text>
                    <p>{this.state.commentiPsicologo[index]}</p>
                  </>
                ) : (
                  <text style={{ fontWeight: "bold" }}>
                    In attesa di risposta
                  </text>

                )}
              </Card.Body>
              <Card.Footer>
                <textarea
                  className="testoForm"
                  placeholder="inserisci testo commento"
                  rows={this.state.rows}
                  defaultValue={this.state.txtComment}
                  onChange={this.handleChange}
                />
                <Button
                  style={{ fontWeight: "bold", borderRadius: "50px" }}
                  className="commentoButton"
                  variant="outline-light"
                  type="submit"
                  value="Submit"
                  onClick={() => {
                    this.aggiungiCommento(index);
                  }}
                >
                  Commenta
                  <FiMessageCircle className="blogIcon" />
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  componentWillMount() {
    this.readSegnalazioni();
    this.props.setLocation("Blog Psicologo");
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
    return <div>{this.getSegnalazioniPsicologo()}</div>;
  }
}

export default BlogPsicologo;