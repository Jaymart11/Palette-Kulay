import React from "react";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = (props) => {
  return (
    <div style={{ height: "100%" }}>
      {props.colors.map((color, i) => (
        <DraggableColorBox
          color={color.color}
          name={color.name}
          key={color.name}
          handleClick={() => props.deleteColor(color.name)}
          index={i}
        />
      ))}
    </div>
  );
};

export default DraggableColorList;
