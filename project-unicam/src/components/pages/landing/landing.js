import React from 'react';
import { Button } from 'react-bootstrap';
import LandingCarousel from './landingCarousel';

//eslint-disable-next-line
import Style from '../../style.css';

function Welcome() {
    return (
        <div>
            <h1>Benvenuto!</h1>
            <br></br>
            <LandingCarousel />
            <br></br>
            <Button variant="outline-dark" type="submit" href="/login">
                ENTRA !
            </Button>
        </div>
    );
}

export default Welcome;