import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';

import { FiHelpCircle } from 'react-icons/fi';
import { FiPhoneCall } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';




class Footer extends Component {
    render() {
        return (

            <Navbar fixed="bottom" bg="dark" variant="dark" expand="dark">
                <Nav.Item>
                    <Button  href="/telegrambot" variant="dark"><FaTelegram className="footericon" /></Button>
                </Nav.Item>
                <Nav.Item>
                    <Button  href="/telefona" variant="dark"><FiPhoneCall className="footericon" /></Button>
                </Nav.Item>
                <Nav.Item>
                    <Button  href="/faq" variant="dark"><FiHelpCircle className="footericon" /></Button>
                </Nav.Item>
            </Navbar>
        );

    }
}

export default Footer;


