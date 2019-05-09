import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import LandingCarousel from './landingCarousel';

//eslint-disable-next-line
import Style from '../../style.css';

class Landing extends Component {

    /* constructor() {
      super();
    } */

    getName() {
        if (this.props.authenticated) {
            this.props.setLocation("Benvenuto "+this.props.name+" !")
        } else {
            this.props.setLocation("Benvenuto !")
        }
    }

    componentWillMount() {
        this.props.setisHome('true')
        this.getName()
    }

    render() {
        return (
            <div>
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