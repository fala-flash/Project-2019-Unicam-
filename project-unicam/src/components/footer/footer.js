import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';

import { FaTelegramPlane, FaBloggerB, FaPhone, FaUserCircle } from 'react-icons/fa';

//eslint-disable-next-line
import Style from '../style.css';


class Footer extends Component {
    render() {
        return (
            <div>
                {this.props.authenticated
                    ?
                    <Navbar fixed="bottom" bg="info" variant="light" expand="light" className="navbar">

                        <Nav.Item>
                            <Button className="footerButton" href="/profile" variant="info">
                                <FaUserCircle className="footericon" />
                                <p className="footerText" style={{fontWeight:'bold'}}>Profilo</p>
                            </Button>
                        </Nav.Item>

                        <Nav.Item>
                            <Button className="footerButton" href="/telegrambot" variant="info">
                                <FaTelegramPlane className="footericon" />
                                <p className="footerText" style={{fontWeight:'bold'}}>Bot</p>
                            </Button>
                        </Nav.Item>

                        <Nav.Item>
                            <Button className="footerButton" href="/blog" variant="info">
                                <FaBloggerB className="footericon" />
                                <p className="footerText" style={{fontWeight:'bold'}}>Blog</p>
                            </Button>
                        </Nav.Item>

                        <Nav.Item>
                            <Button className="footerButton" href="/telefona" variant="info">
                                <FaPhone className="footericonPhone" />
                                <p className="footerText" style={{fontWeight:'bold'}}>Chiama</p>
                            </Button>
                        </Nav.Item>
                    </Navbar>
                    :
                    <Navbar fixed="bottom" bg="info" variant="light" expand="light">
                        <Navbar.Brand style={{color:'white', fontWeight:'bold'}} href="https://www.unicam.it/">UNICAM 2019</Navbar.Brand>
                    </Navbar>}
            </div>
        );

    }
}

export default Footer;


