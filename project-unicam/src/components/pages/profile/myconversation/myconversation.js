import React from "react";
import { fire } from "../../../../config/FirebaseConfig";
import { Button } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";

class MyConversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commenti: [] }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to comment in Firebase Database */
    let commentiRef = fire.database().ref().child("Discussioni/");
    commentiRef.on('child_added', snapshot => {
      snapshot.forEach(child => {
        /* Update React state when comment is added at Firebase Database */
      let message = { text: child.val().commento, id: child.key };
      this.setState({ messages: [message].concat(this.state.messages) });
      })
    });
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button variant="info" href="/profile">
            <FaAngleLeft />
          </Button>
        </div>

        <br />
        <ul>
          {/* Render the list of messages */
          this.state.commenti.map(message => (
            <li key={message.id}>{message.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MyConversation;
