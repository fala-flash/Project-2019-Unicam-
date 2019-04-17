import React from 'react';
import { Button } from 'react-bootstrap';

function Welcome() {
    return (
        <div>
            <h1>Welcome</h1>
            <br></br>
            <Button variant="outline-dark" type="submit" href="/login">
                ENTRA
            </Button>
        </div>
    );
}

export default Welcome;