import React, { Component } from "react";
import LandingCarousel from "./landingCarousel";

//eslint-disable-next-line
import Style from "../../style.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ruolo: this.props.ruolo
    };
  }

  /* setHome() {
    this.props.setisHome("home")
  } */

  getName() {
    if (this.props.authenticated) {
      this.props.setLocation(
        "Benvenuto " + this.props.name.split(" ")[0] + " !"
      );
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
        <LandingCarousel
          ruolo={this.state.ruolo}
          /* setHome={this.props.setHome} */
        />
      </div>
    );
  }
}

export default Landing;
