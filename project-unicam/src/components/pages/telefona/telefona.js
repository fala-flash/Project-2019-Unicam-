import React from 'react';
import Button from 'react-bootstrap/Button';

import Alert from 'react-bootstrap/Alert';

function Telefona() {
    return (
        <div> 
            <Alert className="alertTelefona" variant="success">
            <Alert.Heading style={{fontWeight:'bold'}}>Chiama!</Alert.Heading>
            <p>
            Per ogni emergenza, noi siamo disponibili e volenterosi di ascoltarti. Chiamaci! </p>
            <p>
            Il nostro addetto alle chiamate: Marco.
            </p>
            <hr />
            <p className="mb-0">
            <Button variant="outline-success" size="lg" style={{fontWeight:'bold'}}>
                <a className="chiamaText" text="white" href="tel:+393315909161">CHIAMA</a>
            </Button>
            </p>
            </Alert>
        </div>
    );
}

export default Telefona;