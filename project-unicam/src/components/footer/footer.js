import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';

import { FaTelegramPlane, FaBloggerB, FaPhone, FaHome } from 'react-icons/fa';

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
                            <Button className="footerButton" href="/" variant="info">
                                <FaHome className="footericon" />
                                <p className="footerText" style={{fontWeight:'bold'}}>Home</p>
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
                    <></>}
            </div>
        );

    }
}

export default Footer;


