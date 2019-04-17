import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';

import { FiHelpCircle, FiPhoneCall } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';




class Footer extends Component {
    render() {
        return (

            <Navbar fixed="bottom" bg="dark" variant="dark" expand="dark">
                <Nav.Item>
                    <Button className="footerButton" href="/telegrambot" variant="dark">
                    <FaTelegram className="footericon" />
                    </Button>
                    <p className="footerText">TelegramBot</p>
                </Nav.Item>
                <Nav.Item>
                    <Button className="footerButton" href="/telefona" variant="dark">
                    <FiPhoneCall className="footericon" />
                    </Button>
                    <p className="footerText">Telefona</p>
                </Nav.Item>
                <Nav.Item>
                    <Button className="footerButton" href="/faq" variant="dark">
                    <FiHelpCircle className="footericon" />
                    </Button>
                    <p className="footerText">FAQ</p>
                </Nav.Item>
            </Navbar>
        );

    }
}

export default Footer;


