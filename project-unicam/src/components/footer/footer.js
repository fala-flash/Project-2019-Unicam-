import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

import { FiPhone, FiMessageCircle, FiHelpCircle } from 'react-icons/fi';


class Footer extends Component {
    render() {
        return (

            <Navbar className="footerStyle" fixed="bottom" bg="dark" variant="dark">        

                <Button className="footerButton" variant="dark" href="/telefona">
                    <FiPhone className="footerIcon"/>     
                    <p className="footerTxt">Telefona</p>
                </Button>

                <Button className="footerButton" variant="dark" href="/helpline">
                    <FiMessageCircle className="footerIcon"/>
                    <p className="footerTxt">Blog</p>
                </Button>
                
                <Button className="footerButton" variant="dark" href="/faq">
                    <FiHelpCircle className="footerIcon"/>
                    <p className="footerTxt">FAQ</p>
                </Button>                    
                
            </Navbar>
        )
    }
}

export default Footer;