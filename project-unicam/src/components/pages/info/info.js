import React from 'react';
import { Card } from 'react-bootstrap';

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";



function Info() {
    return (
        <div>
            <div className="infoCard">
                <Card bg="info" text="white" style={{ width: '16rem', fontWeight:'bold' }}>
                    <Card.Header>Project Unicam</Card.Header>
                    <Card.Body>
                        <ul style={{listStyleType: 'disc'}}>
                            <li>v 1.0.0</li>
                            <li>Web, Android, iOS</li>
                            <li>Sviluppato da: <a href="https://www.unicam.it/" style={{color:'white', textDecoration:'underline', fontWeight:'bold', textDecorationColor:'white'}}> Unicam</a></li>
                        </ul>
                    </Card.Body>
                </Card>
            </div>

            <br></br>

            <div className="infoCard">
                <Card bg="info" text="white" style={{ width: '16rem', fontWeight:'bold' }}>
                    <Card.Header>Seguici</Card.Header>
                    <Card.Body>
                        <ul style={{listStyleType: 'disc'}}>
                            <li><a href="https://www.facebook.com/" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>Facebook </a><FaFacebook/></li>
                            <li><a href="https://www.instagram.com/?hl=it" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>Instagram </a><FaInstagram/></li>
                            <li><a href="https://twitter.com/" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>Twitter </a><FaTwitter/></li>
                            <li><a href="https://www.youtube.com/" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>Youtube </a><FaYoutube/></li>
                        </ul>         
                    </Card.Body>
                </Card>
            </div>

            <br></br>
            
            <div className="infoCard">
                <Card bg="info" text="white" style={{ width: '18rem', fontWeight:'bold' }}>
                    <Card.Header>Contattaci</Card.Header>
                    <Card.Body>
                        <ul style={{listStyleType: 'disc'}}>
                            <li><a href="tel:0123456789" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>0123456789 </a><FaPhone/></li>
                            <li><a href="mailto:email@app.com" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>email@app.com </a><MdEmail/></li>
                        </ul>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
}

export default Info;