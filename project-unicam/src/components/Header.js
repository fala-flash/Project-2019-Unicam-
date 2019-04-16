import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import botIcon from './media/telbot.png'


class Header extends Component {

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/profile">Il mio profilo</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">Sign Out</NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand>UNICAM PROJECT</Navbar.Brand>

                <Nav pullRight>
                    <Navbar.Brand href="/telegrambot">
                        <img
                            alt=""
                            src={botIcon}
                            width="30"
                            height="30"
                            className=" mr-sm-2"
                        />


                    </Navbar.Brand>

                </Nav>

            </Navbar>
        );

    }

}

export default Header;

