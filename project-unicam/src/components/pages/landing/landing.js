import React, { Component } from "react";
import LandingCarousel from "./landingCarousel";

//eslint-disable-next-line
import Style from "../../style.css";

class Landing extends Component {
  getName() {
    if (this.props.authenticated) {
      this.props.setLocation("Benvenuto " + this.props.name + " !");
    } else {
      this.props.setLocation("Benvenuto !");
    }
  }

  componentWillMount() {
    this.props.setisHome("true");
    this.getName();
  }

  render() {
    return (
      <div className="carouselDiv">
        <LandingCarousel />
      </div>
    );
  }
}

export default Landing;