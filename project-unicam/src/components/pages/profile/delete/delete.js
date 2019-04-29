import React, { Component } from "react";
import { fire } from "../../../../config/FirebaseConfig";
import { Button, Modal } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";

class DeleteProfile extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  deleteUserData = () => {
    //cancellazione dati firebase
    fire
      .database()
      .ref(this.props.ruolo + '/' + this.props.userID)
      .remove();
    //logout
    fire.auth().signOut();
    //chiusura modal
    this.handleClose();
    //cancellazione local storage
    this.deleteStorage();
  };

  deleteStorage() {
    let keysToRemove = [
      "userID",
      "userName",
      "userEmail",
      "userPicture",
      "userRole",
      "userTelefono",
      "userIstituto"
    ];
    keysToRemove.forEach(k => localStorage.removeItem(k));
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button variant="info" href="/profile">
            <FaAngleLeft />
          </Button>
        </div>

        <div className="deleteComponents">
          <br />
          <div className="txtdelete">
            <h3>
              Sei davvero sicuro di voler cancellare i dati relativi al tuo
              account?
            </h3>
            <br />
            Le modifiche effettuate e le segnalazioni aggiunte andranno perse,
            <br />
            per la disattivazione dell'account contattare gli sviluppatori nella
            pagina info
            <br />
            <br />
          </div>
          <Button
            style={{fontWeight:'bold'}}
            variant="danger"
            className="deleteButton"
            onClick={this.handleShow}
          >
            Cancellazione Dati Account
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cancellazione Dati Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Dati account</h5>
              <ul>
                <li>UserID: {this.props.userID}</li>
                <li>Email: {this.props.email}</li>
                {this.props.ruolo === "null" ? null : (
                  <li>Ruolo: {this.props.ruolo}</li>
                )}
                {this.props.name === "null" ? null : (
                  <li>Nome: {this.props.name}</li>
                )}
                {this.props.istituto === "null" ? null : (
                  <li>Istituto: {this.props.istituto}</li>
                )}
                {this.props.telefono === "null" ? null : (
                  <li>Telefono: {this.props.telefono}</li>
                )}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontWeight:'bold'}} variant="success" onClick={this.handleClose}>
                Annulla
              </Button>
              <Button style={{fontWeight:'bold'}} variant="danger" onClick={this.deleteUserData}>
                Elimina
              </Button>
            </Modal.Footer>
          </Modal>
          <br />
        </div>
      </div>
    );
  }
}

export default DeleteProfile;
