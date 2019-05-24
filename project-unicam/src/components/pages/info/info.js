import { Card } from "react-bootstrap";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import UnicamLogo from "../../media/unicam.png";

import React, { Component } from "react";

class Info extends Component {
  componentWillMount() {
    this.props.setLocation("Info e Contatti");
  }
  render() {
    return (
      <div>
        <div>
          <br />
          <div
            className="infoCard"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              style={{ borderRadius: "20px", width: "18rem" }}
              bg="info"
              text="white"
            >
              <Card.Header>Stop! Bullying</Card.Header>
              <Card.Body>
                <p>v 1.0.0</p>
                <p>Web, Android, iOS</p>
                <p>
                  Sviluppato da:{" "}
                  <a
                    href="https://www.unicam.it/"
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      textDecorationColor: "white"
                    }}
                  >
                    Unicam
                  </a>
                  <img
                    className="unicamLogo"
                    src={UnicamLogo}
                    alt="unicamLogo"
                  />
                </p>
              </Card.Body>
            </Card>
          </div>

          <br />

          <div
            className="infoCard"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              style={{ borderRadius: "20px", width: "18rem" }}
              bg="info"
              text="white"
            >
              <Card.Header>Seguici</Card.Header>
              <Card.Body>
                <p>
                  <a
                    href="https://www.instagram.com/?hl=it"
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      textDecorationColor: "white"
                    }}
                  >
                    Instagram
                  </a>
                  <FaInstagram className="infoIcon" />
                </p>
                <p>
                  <a
                    href="https://www.facebook.com/"
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      textDecorationColor: "white"
                    }}
                  >
                    Facebook
                  </a>
                  <FaFacebook className="infoIcon" />
                </p>
                <p>
                  <a
                    href="https://www.youtube.com/"
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      textDecorationColor: "white"
                    }}
                  >
                    Youtube
                  </a>
                  <FaYoutube className="infoIcon" />
                </p>
                <p>
                  <a
                    href="https://twitter.com/"
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      textDecorationColor: "white"
                    }}
                  >
                    Twitter
                  </a>
                  <FaTwitter className="infoIcon" />
                </p>
              </Card.Body>
            </Card>
          </div>

          <br />

          <div
            className="infoCard"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              style={{ borderRadius: "20px", width: "18rem" }}
              bg="info"
              text="white"
            >
              <Card.Header>Contattaci</Card.Header>
              <Card.Body>
                <p>
                  <a
                    href="tel:0123456789"
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      textDecorationColor: "white"
                    }}
                  >
                    3334445550
                  </a>
                  <FaPhone className="infoIconTelefona" />
                </p>
                <p>
                  <a
                    href="mailto:project.unicam@gmail.com"
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      textDecorationColor: "white"
                    }}
                  >
                    project.unicam@gmail.com
                  </a>
                  <MdEmail className="infoIcon" />
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
