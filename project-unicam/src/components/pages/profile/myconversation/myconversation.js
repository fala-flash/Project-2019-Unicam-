import React from "react";
import { Button } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";

function MyConversation() {
  return (
    <div>
      <div style={{display:"flex", justifyContent:"left"}}><Button variant="info" href="/profile"> <FaAngleLeft    /> </Button></div>
      <h1>Guarda che belle chat!</h1>
    </div>
  );
}

export default MyConversation;
