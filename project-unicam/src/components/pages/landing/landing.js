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
                <h3 style={{fontWeight:'bold'}}>
                Benvenuto <span>{this.props.authenticated ? this.props.name : null}</span>!
                </h3>

                <br></br>

                <LandingCarousel />
                <br></br>
                {this.props.authenticated === false
                    ?   <Button style={{fontWeight:'bold', borderRadius:'50px'}} variant="info" type="submit" href="/login">
                            ENTRA !
                        </Button>
                    :   null
                }                
            </div>
        )
    }    
}

export default Landing;