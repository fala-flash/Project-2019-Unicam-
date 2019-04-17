import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';


import msgIcon from '../media/msg.png';
import telIcon from '../media/tel.png';
import quesIcon from '../media/Question.png';


class Footer extends Component {
    render() {
        return (
            <Navbar fixed="bottom" bg="dark" variant="dark">
<div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <Button variant="dark" href="/telefona">     
                <img
                    alt="telefonaIcona"
                    src={telIcon}
                    className="telefonaImg"
                />
                {/* <p className="telefonaText">Telefona</p> */}
            </Button>
            </li>
            </ul>
            </div>
           
            <div class="mx-auto order-0">
            <ul class="navbar-nav mr-auto">
            <li class="navbar-brand mx-auto">
            
            <Button variant="dark" href="/helpline">
                <img
                    alt=""
                    src={msgIcon}
                    className="helplineImg"
                />
            </Button>
            </li>
            </ul>
            
            </div>

            <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
            <Button variant="dark" href="/faq">
                <img
                    alt=""
                    src={quesIcon}
                    className="faqImg"
                />
            </Button>
            </li>
            </ul>
            </div>
        </Navbar>
        )
    }
}

export default Footer;