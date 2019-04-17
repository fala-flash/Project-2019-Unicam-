import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';

import { FiPhoneCall } from 'react-icons/fi';
import { FaTelegram, FaBlogger } from 'react-icons/fa';




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
                    <Button className="footerButton" href="/blog" variant="dark">
                    <FaBlogger className="footericon" />
                    </Button>
                    <p className="footerText">Blog</p>
                </Nav.Item>
                <Nav.Item>
                    <Button className="footerButton" href="/telefona" variant="dark">
                    <FiPhoneCall className="footericon" />
                    </Button>
                    <p className="footerText">Chiama</p>
                </Nav.Item>
            </Navbar>
        );

    }
}

export default Footer;


