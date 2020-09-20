import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Assets/css/Palette.css";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500,
      type: "hex",
    };
  }

  onChangeHandler = (level) => {
    this.setState({ level });
  };

  changeFormat = (type) => {
    this.setState({ type });
  };

  render() {
    const { level, type } = this.state;
    const { colors, emoji, paletteName, id } = this.props.palette;
    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        key={color.id}
        background={color[type]}
        name={color.name}
        id={color.id}
        paletteId={id}
        showLink
      />
    ));
    return (
      <div className="Palette">
        <NavBar
          changeType={this.changeFormat}
          changeLevel={this.onChangeHandler}
          showRange
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <div className="Footer">
          <PaletteFooter name={paletteName} emoji={emoji} />
        </div>
      </div>
    );
  }
}
