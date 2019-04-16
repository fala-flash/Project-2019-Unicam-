import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import botIcon from '../media/telbot.png'


class HEADER extends Component {

    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Il mio profilo</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Le mie discussioni</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Brand href="#home">TITOLO</Navbar.Brand>
      
    <Nav pullRight>
    <Navbar.Brand href="#home">
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

export default HEADER

