//////// PROFILE DI CIO ////////////////

import React, { Component } from "react";

import { Button } from "react-bootstrap";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      nome: null,
      email: null,
      istituto: null,
      telefono: null,
      ruolo: null
    };
  }

  render() {
    return (
      <div>
        <h3>Profilo {this.props.ruolo}</h3>
        <br/>
        <br/>
        <Button style={{fontWeight:'bold'}} href="/myconversation" variant="info" size="lg">
          Le mie conversazioni
        </Button>
        <br/>
        <br/>
        <Button style={{fontWeight:'bold'}} href="modifyProfile" variant="info" size="lg">
          Modifica profilo
        </Button>
        <br/>
        <br/>
        <Button  style={{fontWeight:'bold'}} href="deleteProfile" variant="info" size="lg">
          Elimina profilo
        </Button>
      </div>
    );
  }
}

export default Profile;