import React from 'react';
import { Button } from 'react-bootstrap';
import LandingCarousel from './landingCarousel';

//eslint-disable-next-line
import Style from '../../style.css';

function Landing() {
    return (
        <div>
            <h3 className="text-info">Benvenuto!</h3>
            <br></br>
            <LandingCarousel />
            <br></br>
            <Button variant="info" type="submit" href="/login" style={{fontWeight:'bold'}}>
                ENTRA !
            </Button>
        </div>
    );
}

export default Landing;