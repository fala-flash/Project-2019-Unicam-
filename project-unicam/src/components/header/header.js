import React, { Component } from './node_modules/react';
import { Navbar, Nav, Button, Dropdown, DropdownButton } from './node_modules/react-bootstrap';

import botIcon from '../media/telbot.png'


class Header extends Component {

    render() {
        return (

            <Navbar className="headerNavbar" bg="dark" variant="dark">

                <Button variant="dark" href="/telegrambot">
                    <img
                        alt=""
                        src={botIcon}
                        className="telegramBot"
                    />
                </Button>

                <Navbar.Brand>UNICAM PROJECT</Navbar.Brand>

                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
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

