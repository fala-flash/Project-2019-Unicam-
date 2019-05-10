import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import blog from "../../media/blog.png";
import helpline from "../../media/helpline.png";
import telegram from "../../media/telegram.png";
import { Link } from "react-router-dom";

//eslint-disable-next-line
import Style from "../../style.css";

class LandingCarousel extends Component {
  render() {
    return (
      <main className="core">
        <article className="left">
          <Carousel interval="2000">
            <Carousel.Item>
              {this.props.ruolo === "Psicologo" ? (
                <Link to={"/blogPsicologo"}>
                  <div className="Card-header">
                    <img src={blog} alt="telegramSlide" />
                  </div>
                  <Carousel.Caption>
                    <h3>BLOG</h3>
                    <p>Esprimiti liberamente nel nostro blog.</p>
                  </Carousel.Caption>
                </Link>
              ) : (
                <Link to={"/blogUtente"}>
                  <div className="Card-header">
                    <img src={blog} alt="telegramSlide" />
                  </div>
                  <Carousel.Caption>
                    <h3>BLOG</h3>
                    <p>Esprimiti liberamente nel nostro blog.</p>
                  </Carousel.Caption>
                </Link>
              )}
            </Carousel.Item>

            <Carousel.Item>
              <Link to={"/telefona"}>
                <div className="Card-header">
                  <img src={helpline} alt="telegramSlide" />
                </div>
                <Carousel.Caption>
                  <h3>HELPLINE</h3>
                  <p>Non esitare a contattarci se lo ritieni necessario.</p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>

            <Carousel.Item>
              <Link to={"/telegrambot"}>
                <div className="Card-header">
                  <img src={telegram} alt="telegramSlide" />
                </div>
                <Carousel.Caption>
                  <h3>TELEGRAM BOT</h3>
                  <p>Chatta con il nostro bot di telegram.</p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          </Carousel>
        </article>
        <article className="right" />
      </main>
    );
  }
  
  /* componentWillMount() {
    this.props.setHome();
  } */
}

export default LandingCarousel;