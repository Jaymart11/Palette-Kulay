import React, { Component } from "react";
import "./Assets/css/PaletteFooter.css";
import { Link } from "react-router-dom";
export default class PaletteFooter extends Component {
  render() {
    return (
      <>
        <Link to="/">Go Back!</Link>
        <p>
          {this.props.name} {this.props.emoji}
        </p>
      </>
    );
  }
}
