import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Telefona() {
    return (
        <div>
            <h1>Telefona</h1>

            <Button variant="outline-success" size="lg"><a href="tel:+393315909161">CHIAMA</a></Button>
        </div>
    );
}

export default Telefona;