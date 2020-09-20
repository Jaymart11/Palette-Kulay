import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";

export default class SingleColorBox extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShade(this.props.palette, this.props.colorId);

    this.state = {
      type: "hex",
    };
  }

  gatherShade(palette, colored) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colored)
      );
    }
    return shades.slice(1);
  }

  changeFormat = (type) => {
    this.setState({ type });
  };

  render() {
    const { emoji, paletteName, id } = this.props.palette;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[this.state.type]}
        showLink={false}
      />
    ));
    return (
      <div className="SingleColor Palette">
        <NavBar showRange={false} changeType={this.changeFormat} />
        <div className="Palette-colors">
          {colorBoxes}
          <Link to={`/palette/${id}`}>
            <div className="go-back ColorBox">
              <div className="copy-button light-text">Go back</div>
            </div>
          </Link>
        </div>
        <div className="Footer">
          <PaletteFooter name={paletteName} emoji={emoji} />
        </div>
      </div>
    );
  }
}
