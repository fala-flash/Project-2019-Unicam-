import React from 'react'
import { Carousel } from "react-bootstrap";
import blog from '../../media/blog.jpg';
import helpline from '../../media/helpline.jpg';
import telegram from '../../media/telegram.png';
import { Link } from 'react-router-dom';

//eslint-disable-next-line
import Style from '../../style.css';

const LandingCarousel = () => (
    <main className="core">
        <article className="left">
            <Carousel>
                <Carousel.Item>
                <Link to={'/signin'}>
                    <img src={telegram}  alt="telegramSlide" width="800" height="400" />
                    </Link>
                    <Carousel.Caption>
                        <h3>TELEGRAM BOT</h3>
                        <p>Chatta con il nostro bot di telegram.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <Link to={'/blog'}>
                    <img src={blog}  alt="blogSlide" width="800" height="400" />
                    </Link>
                    <Carousel.Caption>
                        <h3>BLOG</h3>
                        <p>Esprimiti liberamente nel nostro blog.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <Link to={'/helpline'}>
                    <img src={helpline} alt="helplineSlide" width="800" height="400" />
                    </Link>
                    <Carousel.Caption>
                        <h3>HELPLINE</h3>
                        <p>Non esitare a contattarci se lo ritieni necessario.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </article>
        <article className="right"></article>
    </main>

);
export default LandingCarousel;