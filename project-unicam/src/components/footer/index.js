import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';


import msgIcon from '../media/msg.png';
import telIcon from '../media/tel.png';
import quesIcon from '../media/Question.png';


class Footer extends Component {
    render() {
        return (
            <Navbar fixed="bottom" bg="dark" variant="dark">

            <Button variant="dark" href="/telefona">     
                <img
                    alt="telefonaIcona"
                    src={telIcon}
                    className="telefonaImg"
                />
                {/* <p className="telefonaText">Telefona</p> */}
            </Button>

            <Button variant="dark" href="/helpline">
                <img
                    alt=""
                    src={msgIcon}
                    className="helplineImg"
                />
            </Button>

            <Button variant="dark" href="/faq">
                <img
                    alt=""
                    src={quesIcon}
                    className="faqImg"
                />
            </Button>
        </Navbar>
        )
    }
}

export default Footer;