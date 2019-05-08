import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';


class Header extends Component {

    render() {
        return (
            <div>
                {this.props.authenticated
                    ?
                    <Navbar fixed="top" bg="info" variant="dark" expand="dark">
                        <Navbar.Brand className="navbarbrand" style={{color:'white'}} href="/">Stop! Bullying</Navbar.Brand>
                        <Navbar.Toggle style={{backgroundColor:'info'}}aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link style={{color:'white'}} href="/faq">FAQ</Nav.Link>
                                <Nav.Link style={{color:'white'}} href="/info">Info e Contatti</Nav.Link>
                                <Nav.Link style={{color:'white'}} href="/logout">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    :
                    <Navbar fixed="top" bg="info" variant="light" expand="light">
                        <Navbar.Brand  className="navbarbrand" style={{color:'white'}} href="/">Stop! Bullying</Navbar.Brand>
                    </Navbar>
                }
            </div>
        );
    }
}

export default Header;

