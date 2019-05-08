import React from "react";
import { FaApple, FaAndroid, FaTelegramPlane } from "react-icons/fa";
import { Button} from "react-bootstrap";

function Telegrambot() {
  return (
    <div>
      <h3 style={{fontWeight:'bold'}}>TELEGRAM BOT</h3>

      <br></br>

      <h5>1. Installa l'app Telegram nel tuo dispositivo!</h5>
    
      <br></br>

          <Button style={{fontWeight:'bold'}} href="https://play.google.com/store/apps/details?id=org.telegram.messenger&hl=it" variant="success" size="lg">
            ANDROID
            <br></br>
            <FaAndroid size={30}/>
          </Button>
         
         <br></br>
         <br></br>
    
          <Button style={{fontWeight:'bold'}} href="https://itunes.apple.com/it/app/telegram-messenger/id686449807?mt=8" variant="primary" size="lg">
            APPLE
            <br></br>
            <FaApple size={30}/>
          </Button>

      <br></br>
      <br></br>

      <h5>2. Clicca sul bottone "CHAT" per iniziare!</h5>
    
      <br></br>

      

      <Button style={{fontWeight:'bold'}} href="https://t.me/Cyberbullismo_Bot" variant="dark" size="lg">
          CHAT
          <br></br>
          <FaTelegramPlane size={30}/>
        </Button>

        <br></br>
    
    </div>
  );
}

export default Telegrambot;
