import React from 'react';
import { Card } from 'react-bootstrap';

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";



function Info() {
    return (
        <div>
            <div className="infoCard">
                <Card bg="secondary" text="white" style={{ width: '16rem' }}>
                    <Card.Header>Project Unicam</Card.Header>
                    <Card.Body>
                        <ul style={{listStyleType: 'disc'}}>
                            <li>v 1.0.0</li>
                            <li>Web, Android, iOS</li>
                            <li>Sviluppato da: <a href="https://www.unicam.it/" style={{color:'cyan', textDecoration: 'underline', textDecorationColor:'cyan'}}> Unicam</a></li>
                        </ul>
                    </Card.Body>
                </Card>
            </div>

            <br></br>

            <div className="infoCard">
                <Card bg="secondary" text="white" style={{ width: '16rem' }}>
                    <Card.Header>Seguici</Card.Header>
                    <Card.Body>
                        <ul style={{listStyleType: 'disc'}}>
                            <li><a href="https://www.facebook.com/" style={{color:'cyan', textDecoration: 'underline', textDecorationColor:'cyan'}}>Facebook </a><FaFacebook/></li>
                            <li><a href="https://www.instagram.com/?hl=it" style={{color:'cyan', textDecoration: 'underline', textDecorationColor:'cyan'}}>Instagram </a><FaInstagram/></li>
                            <li><a href="https://twitter.com/" style={{color:'cyan', textDecoration: 'underline', textDecorationColor:'cyan'}}>Twitter </a><FaTwitter/></li>
                            <li><a href="https://www.youtube.com/" style={{color:'cyan', textDecoration: 'underline', textDecorationColor:'cyan'}}>Youtube </a><FaYoutube/></li>
                        </ul>         
                    </Card.Body>
                </Card>
            </div>

            <br></br>
            
            <div className="infoCard">
                <Card bg="secondary" text="white" style={{ width: '18rem' }}>
                    <Card.Header>Contattaci</Card.Header>
                    <Card.Body>
                        <ul style={{listStyleType: 'disc'}}>
                            <li><a href="tel:0123456789" style={{color:'cyan', textDecoration: 'underline', textDecorationColor:'cyan'}}>0123456789 </a><FaPhone/></li>
                            <li><a href="mailto:email@app.com" style={{color:'cyan', textDecoration: 'underline', textDecorationColor:'cyan'}}>email@app.com </a><MdEmail/></li>
                        </ul>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
}

export default Info;