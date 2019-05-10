import React from "react";
import { Carousel } from "react-bootstrap";
import blog from "../../media/blog.png";
import helpline from "../../media/helpline.png";
import telegram from "../../media/telegram.png";
import { Link } from "react-router-dom";

//eslint-disable-next-line
import Style from "../../style.css";

const LandingCarousel = () => (
  <main className="core">
    <article className="left">
      <Carousel interval="2000">
        <Carousel.Item>
          <Link to={"/blog"}>
            <div className="Card-header">
              <img src={blog} alt="telegramSlide" />
            </div>
            <Carousel.Caption>
              <h3>BLOG</h3>
              <p>Esprimiti liberamente nel nostro blog.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item>
          <Link to={"/helpline"}>
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
export default LandingCarousel;