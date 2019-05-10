import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { TiHomeOutline } from "react-icons/ti";
import { FaAngleLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <div>
        {this.props.authenticated ? (
          <Navbar fixed="top" bg="info" variant="dark" expand="dark">
            {this.props.isHome === "true" ? (
              <Navbar.Brand
                className="navbarbrandAuthenticated"
                style={{ color: "white" }}
                href="/"
              >
                {this.props.headerLocation}
              </Navbar.Brand>
            ) : null}

            {this.props.isHome === "false" ? (
              <Navbar.Brand
                className="navbarbrandAuthenticated"
                style={{ color: "white" }}
                href="/"
              >
                <TiHomeOutline className="headerIconHome" />{" "}
                {this.props.headerLocation}
              </Navbar.Brand>
            ) : null}

            {this.props.isHome === "profile" ? (
              <Navbar.Brand
                className="navbarbrandAuthenticated"
                style={{ color: "white" }}
                href="/profile"
              >
                <FaAngleLeft className="headerIcon" />{" "}
                {this.props.headerLocation}
              </Navbar.Brand>
            ) : null}

            <Navbar.Toggle
              style={{ backgroundColor: "info" }}
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link style={{ color: "white" }} href="/faq">
                  FAQ
                </Nav.Link>
                <Nav.Link style={{ color: "white" }} href="/info">
                  Info e Contatti
                </Nav.Link>
                <Nav.Link style={{ color: "white" }} href="/logout">
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        ) : (
          <Navbar fixed="top" bg="info" variant="light" expand="light">
            <Navbar.Brand
              className="navbarbrand"
              style={{ color: "white" }}
              href="/"
            >
              Stop! Bullying
            </Navbar.Brand>
            <Button
              style={{ borderRadius: "50px" }}
              variant="outline-light"
              type="submit"
              href="/login"
            >
              Accedi
            </Button>
          </Navbar>
        )}
      </div>
    );
  }
}

export default Header;