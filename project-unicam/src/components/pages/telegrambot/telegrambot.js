import { FaApple, FaAndroid, FaTelegramPlane } from "react-icons/fa";
import { Button } from "react-bootstrap";

import React, { Component } from "react";

class Telegrambot extends Component {
  
  componentWillMount() {
    this.props.setLocation("Telegram Bot");
  }

  render() {
    return (
      <div>
        <div>
          <br />
          <h5>1. Installa l'app Telegram nel tuo dispositivo!</h5>
          <br />
          <Button
            style={{ fontWeight: "bold", borderRadius: "30px" }}
            href="https://play.google.com/store/apps/details?id=org.telegram.messenger&hl=it"
            variant="success"
            size="lg"
          >
            ANDROID
            <br />
            <FaAndroid size={30} />
          </Button>
          <br />
          <br />
          <Button
            style={{ fontWeight: "bold", borderRadius: "30px" }}
            href="https://itunes.apple.com/it/app/telegram-messenger/id686449807?mt=8"
            variant="primary"
            size="lg"
          >
            APPLE
            <br />
            <FaApple size={30} />
          </Button>
          <br />
          <br />
          <h5>2. Clicca sul bottone "CHAT" per iniziare!</h5>
          <br />
          <Button
            style={{ fontWeight: "bold", borderRadius: "30px" }}
            href="https://t.me/Cyberbullismo_Bot"
            variant="dark"
            size="lg"
          >
            CHAT
            <br />
            <FaTelegramPlane size={30} />
          </Button>
          <br />
        </div>
      </div>
    );
  }
}

export default Telegrambot;
