import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';




class Header extends Component {

    render() {
        return (

            <Navbar fixed="top" bg="dark" variant="dark" expand="dark">
                <Navbar.Brand href="/">ProjectUnicam</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/profile">Profilo</Nav.Link>
                        <Nav.Link href="/faq">FAQ</Nav.Link>
                        <Nav.Link href="/info">Info</Nav.Link>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

    }

}

export default Header;