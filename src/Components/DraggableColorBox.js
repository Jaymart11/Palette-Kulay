import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import chroma from "chroma-js";
import sizes from "./Assets/css/sizes";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-5px",
    [sizes.down("md")]: {
      display: "block",
      width: "100%",
      height: "6vh",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
    "&:hover svg": {
      transform: "scale(1.5)",
      color: "white",
    },
  },
  lightText: {
    color: "white",
  },
  delete: {
    transition: "transform linear 0.2s",
    color: "rgba(0,0,0,0.5)",
    cursor: "pointer",
  },
};

const DraggableColorBox = (props) => {
  const { classes, color, name, handleClick } = props;
  // const isDark = chroma(color).luminance() <= 0.6;

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: color,
      }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteForeverIcon className={classes.delete} onClick={handleClick} />
      </div>
    </div>
  );
};

export default withStyles(styles)(DraggableColorBox);
