import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import LandingCarousel from './landingCarousel';

//eslint-disable-next-line
import Style from '../../style.css';

class Landing extends Component {

    /* constructor() {
      super();
    } */

    render() {
        return (
            <div>
                <h3 className="text-info">Benvenuto!</h3>
                <p>A: {this.props.authenticated}</p>
                <br></br>
                <LandingCarousel />
                <br></br>
                {this.props.authenticated === false
                    ?   <Button variant="info" type="submit" href="/login" style={{fontWeight:'bold'}}>
                            ENTRA !
                        </Button>
                    :   null
                }                
            </div>
        )
    }    
}

export default Landing;