import React, { Component } from "react";
import "./Assets/css/NavBar.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500,
      type: "hex",
      open: false,
    };
  }

  onChangeHandler = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    if (evt.target.name === "level") {
      this.props.changeLevel(evt.target.value);
    } else {
      this.props.changeType(evt.target.value);
      this.setState({ open: true });
    }
  };

  closeBar = () => {
    this.setState({ open: false });
  };

  render() {
    const { level, type } = this.state;
    return (
      <div className="NavBar">
        <div className="left-side">
          <p className="Kulay">
            <Link className="home" to="/">
              Palette Kulay
            </Link>
          </p>
          {this.props.showRange && (
            <div className="slider">
              <label htmlFor="level"> Level: {level}</label>
              <input
                type="range"
                value={level}
                min="100"
                max="900"
                step="100"
                onChange={this.onChangeHandler}
                name="level"
                id="level"
                className="level"
              />
            </div>
          )}
          <div className="select-container">
            <Select value={type} name="type" onChange={this.onChangeHandler}>
              <MenuItem value="hex">HEX</MenuItem>
              <MenuItem value="rgb">RGB</MenuItem>
              <MenuItem value="rgba">RGBA</MenuItem>
              <MenuItem value="hsl">HSL</MenuItem>
            </Select>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={2000}
          message={<span>Format Changed to {type.toUpperCase()}!</span>}
          ContentProps={{ "aria-describedby": "message-id" }}
          onClose={this.closeBar}
          action={[
            <IconButton
              onClick={this.closeBar}
              color="inherit"
              aria-label="close">
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
