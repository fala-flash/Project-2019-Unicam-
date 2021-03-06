import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { fire } from "../../../config/FirebaseConfig";
import { Button } from "react-bootstrap";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      istituto: "",
      telefono: "",
      ruolo: ""
    };
  }

  readUserData() {
    const rootUtente = fire.database().ref("Utente/" + this.props.userID);
    const rootPsicologo = fire.database().ref("Psicologo/" + this.props.userID);

    rootUtente.on("value", snap => {
      //verifico se utente
      if (snap.val() !== null) {
        //utente
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
        //se non è utente
        rootPsicologo.on("value", snapshot => {
          //verifico se psicologo
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
    });
    this.props.setLocation("Profilo " + this.props.ruolo);
  }

  componentWillMount() {
    this.readUserData();
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
    return (
      <div>
        <br />
        <br />
        {this.props.ruolo === "Psicologo" ? (
          <Button
            style={{ fontWeight: "bold", borderRadius: "50px", backgroundColor:"rgb(10,126,126)" }}
            href="/mieRisposte"
            variant="info"
            size="lg"
          >
            Le mie Risposte
          </Button>
        ) : null}

        {this.props.ruolo === "Utente" ? (
          <Button
            style={{ fontWeight: "bold", borderRadius: "50px", backgroundColor:"rgb(10,126,126)" }}
            href="/mieSegnalazioni"
            variant="info"
            size="lg"
          >
            Le mie Segnalazioni
          </Button>
        ) : null}
        <br />
        <br />
        <Button
          style={{ fontWeight: "bold", borderRadius: "50px", backgroundColor:"rgb(10,126,126)" }}
          href="modifyProfile"
          variant="info"
          size="lg"
        >
          Modifica profilo
        </Button>
        <br />
        <br />
        <Button
          style={{ fontWeight: "bold", borderRadius: "50px", backgroundColor:"rgb(10,126,126)" }}
          href="deleteProfile"
          variant="info"
          size="lg"
        >
          Elimina profilo
        </Button>
        <br />
        <br />
        <Button
          style={{ fontWeight: "bold", borderRadius: "50px", backgroundColor:"rgb(10,126,126)" }}
          href="logout"
          variant="info"
          size="lg"
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default Profile;
