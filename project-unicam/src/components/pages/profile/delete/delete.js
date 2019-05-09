import React, { Component } from "react";
import { fire } from "../../../../config/FirebaseConfig";
import { Button, Modal } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";
import firebase from 'firebase';

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

    //cancellazione account
    var userDeleted = firebase.auth().currentUser;
    userDeleted.delete();
    
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

  componentWillMount() {
    this.props.setLocation("Cancellazione Profilo")
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button variant="info" href="/profile" style={{fontWeight: 'bold', borderRadius: '360px'}}>
            <FaAngleLeft />
          </Button>
        </div>

        <div className="deleteComponents">
          <br />
          <div className="txtdelete">
            <br/>
            <h4>
              Sei davvero sicuro di voler cancellare il tuo account e i dati relativi ad esso?
            <br />
              Le modifiche effettuate e le segnalazioni aggiunte andranno perse.
            </h4>
          </div>
          <br/>
          <Button
            variant="danger"
            className="deleteButton"
            onClick={this.handleShow}
            style={{fontWeight:'bold', borderRadius:'50px'}}
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
              <Button style={{fontWeight:'bold', borderRadius:'50px'}} variant="success" onClick={this.handleClose}>
                Annulla
              </Button>
              <Button style={{fontWeight:'bold', borderRadius:'50px'}} variant="danger" onClick={this.deleteUserData}>
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
