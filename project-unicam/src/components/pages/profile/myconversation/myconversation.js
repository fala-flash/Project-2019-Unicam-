import React from "react";
import { Button } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";

function MyConversation() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <Button variant="info" href="/profile">
          <FaAngleLeft />
        </Button>
      </div>
    </div>
  );
}

export default MyConversation;
