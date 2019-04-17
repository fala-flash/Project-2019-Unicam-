import React, { Component } from 'react';
import { Navbar, Button, Dropdown } from 'react-bootstrap';

import { FaTelegram } from 'react-icons/fa';


class Header extends Component {

    render() {
        return (

            <Navbar bg="dark" variant="dark">                

                <Navbar.Brand>UNICAM PROJECT</Navbar.Brand>

                <Button className="headerItem" variant="dark" href="/telegrambot">
                    <FaTelegram className="headerIcon"/>
                </Button>

                <Dropdown>
                <Dropdown.Toggle className="headerItem" variant="dark" id="dropdown-basic">
                    Menu
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Profilo</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/logout">Log Out</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>

            </Navbar>
        );

    }

}

export default Header;

