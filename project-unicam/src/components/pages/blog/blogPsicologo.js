import React, { Component } from "react";
import { fire } from "../../../config/FirebaseConfig";
import { Redirect } from "react-router-dom";
import { Button, Card, Collapse, Modal, Tabs, Tab } from "react-bootstrap";
import { FiMessageCircle, FiInfo } from "react-icons/fi";
import { FaPhone, FaHome, FaCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TiDeleteOutline, TiCameraOutline } from "react-icons/ti";

//eslint-disable-next-line
import Style from "../../style.css";

class BlogPsicologo extends Component {
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
      id: [],
      visto: [],
      buttonCommenta: [],
      buttonContatta: [],
      commentiPsicologo: [],
      commento: [],
      txtComment: null,
      punteggioAnalisi : [],
      valutazioneAnalisi : [],
      fotoUtente : [],
      //textarea
      rows: 1,
      minRows: 1,
      maxRows: 15,
      show: false, //modal
      showImg:false,
      indexSegnalazione: null
    };
    this.resetCommenta = this.resetCommenta.bind(this);
    this.resetContatta = this.resetContatta.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTextArea = this.handleTextArea.bind(this);
    this.aggiungiCommento = this.aggiungiCommento.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePhotoShow = this.handlePhotoShow.bind(this);
    this.handlePhotoClose = this.handlePhotoClose.bind(this);
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



  setEmoji(punteggio){
    
      if (punteggio === 0) {
        return <FaCircle size={35} style={{color:'#grey', borderRadius:'50%'}} />
      }else if ( punteggio === -1){
        return <FaCircle size={35} style={{color:'#f2ea15', borderRadius:'50%'}} />
      }
    else if ( punteggio === -2){
      return <FaCircle size={35} style={{color:'orange', borderRadius:'50%'}} />
    
   }else if ( punteggio <= -3){
    return <FaCircle size={35} style={{color:'#a80000', borderRadius:'50%'}} />
  
  }else if ( punteggio === 1){
    return <FaCircle size={35} style={{color:'#7be85a', borderRadius:'50%'}} />

}else if ( punteggio === 2){
  return <FaCircle size={35} style={{color:'#49d81e', borderRadius:'50%'}} />

}else if ( punteggio >= 3){
  return <FaCircle size={35} style={{color:'#28af00', borderRadius:'50%'}} />
}

    
    }
  



  readUserData() {
    const rootPsicologo = fire.database().ref("Psicologo/" + this.props.userID);

    rootPsicologo.on("value", snapshot => {
      if (snapshot.val() !== null) {
        //se psicologo
        this.setState({
          nome: snapshot.val().nome,
          email: snapshot.val().email,
          istituto: snapshot.val().istituto,
          telefono: snapshot.val().telefono,
          ruolo: "Psicologo"
        });
        this.props.setLocalRole(this.state.ruolo);
        this.props.setLocalName(this.state.nome);
        this.props.setLocalTelefono(this.state.telefono);
        this.props.setLocalIstituto(this.state.istituto);
        this.props.setStateUser();
      } else if (snapshot.val() === null) {
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
          data: this.state.data.concat([child.val().data]),
          id: this.state.id.concat([child.val().id]),
          visto: this.state.visto.concat([child.val().visto]),
          punteggioAnalisi: this.state.punteggioAnalisi.concat([child.val().punteggioAnalisi]),
          valutazioneAnalisi: this.state.valutazioneAnalisi.concat([child.val().valutazioneAnalisi]),
          buttonCommenta: this.state.buttonCommenta.concat(false),
          buttonContatta: this.state.buttonContatta.concat(false),
          fotoUtente: this.state.fotoUtente.concat([child.val().immagine])
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

  handlePhotoClose(){ 
    this.setState({ showImg: false });
}

  handleShow(index) {
    this.setState({
      indexSegnalazione: index,
      show: true
    });
  }

  handlePhotoShow(index) {
    this.setState({
      indexSegnalazione: index,
      showImg: true
    });
  }

  showPhoto(srcPhoto){
    console.log('click')
    /* let image = new Image();
    image.src = this.state.fotoUtente;
    document.body.appendChild(image); */

    console.log(srcPhoto)

    //eslint-disable-next-line
    const Photo =  () => <img src={'${srcPhoto}'} />
    return <Photo />
  }

  getModalFoto(){
    return (
      <Modal show={this.state.showImg} onHide={this.handlePhotoClose}>
        <Modal.Header style={{textAlign:"center", background:'rgb(10,126,126)',color:'white'}} closeButton>
          <Modal.Title >Foto</Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{textAlign:"center", justifyContent:'center', background:'rgb(249,249,249)'}}>
         
        {/* eslint-disable-next-line */}
          { this.state.fotoUtente[this.state.indexSegnalazione] != null ? 
          <img style={{width:'50%' , height:'50%'}} alt="fotoutente" src={this.state.fotoUtente[this.state.indexSegnalazione]} />
           : 
          <h3 style={{color:'rgb(10,126,126)'}}> La foto non è disponibile</h3>
          }
        </Modal.Body>
        <Modal.Footer style={{textAlign:"center", justifyContent:'center', background:'rgb(10,126,126)'}}>
          <Button
            style={{ fontWeight: "bold", borderRadius: "50px" }}
            variant="light"
            onClick={this.handlePhotoClose}
          >
            Chiudi
          </Button>
          
        </Modal.Footer>
        
      </Modal>
    );

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

  getTutteSegnalazioni() {
    if (this.state.codice.length > 0) {
      return (
        <div>
          {this.state.codice.map((codice, index) => (
            <div key={codice}>
              <br />
              <Card
                style={{ borderRadius: "20px" }}
                bg={this.state.visto[index]}
                text="white"
                className="cardStyle"
              >
                <Card.Header>
                  <Card.Title>
                    Segnalazione #{codice} del {this.state.data[index]}  
                    <br></br>
                    <br></br>
                    {this.setEmoji(this.state.punteggioAnalisi[index])} <span style={{textTransform:"uppercase"}}>{this.state.valutazioneAnalisi[index]}</span> 
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

                  <br/>

                  <Button
                    className="blogButton"
                    variant="outline-light"
                    style={{ fontWeight: "bold", borderRadius: "50px" }}
                    onClick={() => this.handlePhotoShow(index)}
                  >
                    Foto Utente
                  {/*   <img src={this.state.fotoUtente[index]} /> */}
                    <TiCameraOutline className="blogIcon" />
                  </Button>

                  {this.getModalElimina()}
                  {this.getModalFoto()}

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
                        <FaPhone className="contattiIconPhone" />
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
                      <br />
                      <br />
                      <text style={{ fontWeight: "bold" }}>Risposta/e:</text>
                      <p>{this.state.commentiPsicologo[index]}</p>
                    </>
                  ) : (
                    <>
                      <br />
                      <br />
                      <text style={{ fontWeight: "bold" }}>
                        In attesa di risposta
                      </text>
                    </>
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
    } else {
      return (
        <div>
          <br />
          <h5>Non ci sono segnalazioni da leggere</h5>
        </div>
      );
    }
  }

  getLetteSegnalazioni() {
    if (this.state.codice.length > 0) {
      return (
        <div>
          {this.state.codice.map((codice, index) => (
            <div key={codice}>
              <br />
              {this.state.visto[index] === "success" ? (
                <div>
                  <Card
                    style={{ borderRadius: "20px" }}
                    bg={this.state.visto[index]}
                    text="white"
                    className="cardStyle"
                  >
                    <Card.Header>
                      <Card.Title>
                        Segnalazione #{codice} del {this.state.data[index]}  
                    <br></br>
                    <br></br>
                    {this.setEmoji(this.state.punteggioAnalisi[index])} <span style={{textTransform:"uppercase"}}>{this.state.valutazioneAnalisi[index]}</span> 
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
                            <FaPhone className="contattiIconPhone" />
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
                          <br />
                          <br />
                          <text style={{ fontWeight: "bold" }}>
                            Risposta/e:
                          </text>
                          <p>{this.state.commentiPsicologo[index]}</p>
                        </>
                      ) : (
                        <>
                          <br />
                          <br />
                          <text style={{ fontWeight: "bold" }}>
                            In attesa di risposta
                          </text>
                        </>
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
              ) : null}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h5>Non ci sono segnalazioni lette</h5>
        </div>
      );
    }
  }

  getDaLeggereSegnalazioni() {
    if (this.state.codice.length > 0) {
      return (
        <div>
          {this.state.codice.map((codice, index) => (
            <div key={codice}>
              {this.state.visto[index] === "danger" ? (
                <div>
                  <br />
                  <Card
                    style={{ borderRadius: "20px" }}
                    bg={this.state.visto[index]}
                    text="white"
                    className="cardStyle"
                  >
                    <Card.Header>
                      <Card.Title>
                        Segnalazione #{codice} del {this.state.data[index]}  
                    <br></br>
                    <br></br>
                    {this.setEmoji(this.state.punteggioAnalisi[index])} <span style={{textTransform:"uppercase"}}>{this.state.valutazioneAnalisi[index]}</span> 
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
                      {this.getModalFoto()}

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
                            <FaPhone className="contattiIconPhone" />
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
                          <br />
                          <br />
                          <text style={{ fontWeight: "bold" }}>
                            Risposta/e:
                          </text>
                          <p>{this.state.commentiPsicologo[index]}</p>
                        </>
                      ) : (
                        <>
                          <br />
                          <br />
                          <text style={{ fontWeight: "bold" }}>
                            In attesa di risposta
                          </text>
                        </>
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
              ) : null}
            </div>
          ))}
         
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h5>Non ci sono segnalazioni da leggere</h5>
        </div>
      );
    }
  }

  getSegnalazioniPsicologo() {
    if (this.state.codice.length > 0) {
      return (
        <div>
          {this.setVisto()}
          <div>
            <Tabs
              style={{ position: "fixed" }}
              className="tabsDiv"
              defaultActiveKey="tutte"
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="tutte" title="Tutte">
                <br />
                <br />
                {this.getTutteSegnalazioni()}
              </Tab>
              <Tab eventKey="lette" title="Lette">
                <br />
                <br />
                {this.getLetteSegnalazioni()}
              </Tab>
              <Tab eventKey="daLeggere" title="Da Leggere">
                <br />
                <br />
                {this.getDaLeggereSegnalazioni()}
              </Tab>
            </Tabs>
          </div>
        </div>
      );
    }
  }

  componentWillMount() {
    this.readUserData();
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
    return <div>{this.getSegnalazioniPsicologo()}
    {/*  <img src={'data:image/jpeg;base64,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'
          +'zM/JnKGhPzR'
          +'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'} />
       */}
        </div>;
  }
}

export default BlogPsicologo;
