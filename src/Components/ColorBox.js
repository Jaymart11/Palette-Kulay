import React, { Component } from "react";
import "./Assets/css/ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";

export default class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };
  }

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };

  render() {
    const { name, background, paletteId, id, showLink } = this.props;
    const { copied } = this.state;
    const isDark = chroma(background).luminance() <= 0.6;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{ background }}>
          <div
            style={{ background }}
            className={`copy-overlay ${copied && "show"}`}
          />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1 className={isDark ? "light-text" : undefined}>Copied!</h1>
            <p className={isDark ? "light-text" : undefined}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDark ? "light-text" : undefined}>{name}</span>
            </div>
            <button
              className={`copy-button ${isDark ? "light-text" : undefined}`}>
              Copy
            </button>
          </div>
          {showLink && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={(e) => e.stopPropagation()}>
              <span className={`see-more ${isDark ? "light-text" : undefined}`}>
                More
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
