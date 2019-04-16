import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';


import msgIcon from './media/msg.png';
import telIcon from './media/tel.png';
import quesIcon from './media/Question.png';


class Footer extends Component {
    render() {
        return (
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Navbar.Brand href="/telefona">
                    <img
                        alt=""
                        src={telIcon}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />


                </Navbar.Brand>
                <Navbar.Brand href="helpline">
                    <img
                        alt=""
                        src={msgIcon}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />


                </Navbar.Brand>
                <Navbar.Brand href="/faq">
                    <img
                        alt=""
                        src={quesIcon}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />


                </Navbar.Brand>
            </Navbar>

        )
    }
}

export default Footer;