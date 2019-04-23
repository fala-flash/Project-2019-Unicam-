import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';




class Header extends Component {

    render() {
        return (
            <div>                
                <Navbar fixed="top" bg="dark" variant="dark" expand="dark">
                    <Navbar.Brand href="/">ProjectUnicam</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link style={{color:'white'}} href="/profile">Profilo</Nav.Link>
                            <Nav.Link style={{color:'white'}} href="/faq">FAQ</Nav.Link>
                            <Nav.Link style={{color:'white'}} href="/info">Info</Nav.Link>
                            <Nav.Link style={{color:'white'}} href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>            
            </div>
        );

    }

}

export default Header;

