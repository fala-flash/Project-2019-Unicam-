import React from 'react';
import { Card } from 'react-bootstrap';

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";



function Info() {
    return (
        <div>
            <div className="infoCard" style={{display:'flex', justifyContent:'center'}}>
                <Card bg="info" text="white" style={{ fontWeight:'bold' }}>
                    <Card.Header>Stop! Bullying</Card.Header>
                    <Card.Body>
                            <p>v 1.0.0</p>
                            <p>Web, Android, iOS</p>
                            <p>Sviluppato da: <a href="https://www.unicam.it/" style={{color:'white', textDecoration:'underline', fontWeight:'bold', textDecorationColor:'white'}}> Unicam</a></p>

                    </Card.Body>
                </Card>
            </div>

            <br></br>

            <div className="infoCard" style={{display:'flex', justifyContent:'center'}}>
                <Card bg="info" text="white" style={{ fontWeight:'bold' }}>
                    <Card.Header>Seguici</Card.Header>
                    <Card.Body>
    
                            <p><a href="https://www.instagram.com/?hl=it" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>Instagram </a><FaInstagram/></p>
                            <p><a href="https://www.facebook.com/" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>Facebook </a><FaFacebook/></p>
                            <p><a href="https://www.youtube.com/" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>Youtube </a><FaYoutube/></p>
                            <p><a href="https://twitter.com/" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>Twitter </a><FaTwitter/></p>        
                    </Card.Body>
                </Card>
            </div>

            <br></br>
            
            <div className="infoCard" style={{display:'flex', justifyContent:'center'}}>
                <Card bg="info" text="white" style={{ fontWeight:'bold' }}>
                    <Card.Header>Contattaci</Card.Header>
                    <Card.Body>
                            <p><a href="tel:0123456789" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>0123456789 </a><FaPhone/></p>
                            <p><a href="mailto:project.unicam@gmail.com" style={{color:'white', fontWeight:'bold', textDecoration:'underline', textDecorationColor:'white'}}>project.unicam@gmail.com </a><MdEmail/></p>

                    </Card.Body>
                </Card>
            </div>

        </div>
    );
}

export default Info;