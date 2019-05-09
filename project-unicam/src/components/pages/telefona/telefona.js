import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { FaPhone } from "react-icons/fa";

import React, { Component } from "react";

class Telefona extends Component {
  componentWillMount() {
    this.props.setLocation("Telefona");
  }
  render() {
    return (
      <div>
        <Alert className="alertTelefona" variant="success">
          <Alert.Heading style={{ fontWeight: "bold" }}>Chiama !</Alert.Heading>
          <hr />
          <p>
            Per ogni emergenza, noi siamo disponibili e volenterosi di
            ascoltarti. Chiamaci!{" "}
          </p>
          <p className="mb-0">
            <Button
              style={{ fontWeight: "bold", borderRadius: "50px" }}
              className="buttonTelefona"
              variant="outline-success"
              size="lg"
              href="tel:+393315909161"
            >
              <FaPhone className="telefonaIcon" /> +39 3334445550
            </Button>
          </p>
        </Alert>
      </div>
    );
  }
}

export default Telefona;
