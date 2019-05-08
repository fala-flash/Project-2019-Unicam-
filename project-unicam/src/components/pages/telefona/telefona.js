import React from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FaPhone } from 'react-icons/fa';

function Telefona() {
    return (
        <div> 
            <Alert className="alertTelefona" variant="success">
            <Alert.Heading style={{fontWeight:'bold'}}>Chiama !</Alert.Heading>
            <p>
            Per ogni emergenza, noi siamo disponibili e volenterosi di ascoltarti. Chiamaci! </p>
            <p>
            Il nostro addetto alle chiamate: Marco.
            </p>
            <hr />
            <p className="mb-0">
            <Button className="buttonTelefona" variant="outline-success" size="lg" href="tel:+393315909161">
                <FaPhone className="telefonaIcon"/> +39 3334445550
            </Button>
            </p>
            </Alert>
        </div>
    );
}

export default Telefona;