import React from "react";
import { Button } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";

function MyConversation() {
  return (
    <div>
      <Button variant="info" href="/profile">
        <FaAngleLeft />
      </Button>
      <h1>Guarda che belle chat!</h1>
    </div>
  );
}

export default MyConversation;
