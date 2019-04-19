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
                    <Navbar fixed="bottom" bg="dark" variant="dark" expand="dark" className="navbar">

                        <Nav.Item>
                            <Button className="footerButton" href="/" variant="dark">
                                <FaHome className="footericon" />
                                <p className="footerText">Home</p>
                            </Button>
                        </Nav.Item>

                        <Nav.Item>
                            <Button className="footerButton" href="/telegrambot" variant="dark">
                                <FaTelegramPlane className="footericon" />
                                <p className="footerText">Bot</p>
                            </Button>
                        </Nav.Item>

                        <Nav.Item>
                            <Button className="footerButton" href="/blog" variant="dark">
                                <FaBloggerB className="footericon" />
                                <p className="footerText">Blog</p>
                            </Button>
                        </Nav.Item>

                        <Nav.Item>
                            <Button className="footerButton" href="/telefona" variant="dark">
                                <FaPhone className="footericonPhone" />
                                <p className="footerText">Chiama</p>
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


