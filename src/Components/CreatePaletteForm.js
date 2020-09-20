import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function CreatePaletteForm(props) {
  const [newName, setNewName] = useState("");
  const [currentColor, setCurrentColor] = useState("teal");

  const {
    classes,
    theme,
    open,
    clearPalette,
    handleDrawerClose,
    disabledButton,
    addRandomColor,
    addNewColor,
    colors,
  } = props;

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== currentColor)
    );
  });

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const handleSubmit = () => {
    addNewColor(currentColor, newName);

    setNewName("");
    setCurrentColor("");
  };

  const handler = {
    newName: setNewName,
  };

  const handleChange = (evt) => {
    handler[evt.target.name](evt.target.value);
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div className={classes.picker}>
          <Typography variant="h4">Create Your Palette</Typography>
          <div className="ewan">
            <Button
              variant="contained"
              color="secondary"
              onClick={clearPalette}>
              CLEAR PALETTE
            </Button>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                disabled={disabledButton}
                onClick={addRandomColor}>
                RANDOM COLOR
              </Button>
            </ThemeProvider>
          </div>
          <ChromePicker
            width="350px"
            onChange={updateCurrentColor}
            color={currentColor}
          />
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              style={{ width: "350px", margin: "1rem 0" }}
              id="standard-basic"
              label="Color Name"
              name="newName"
              value={newName}
              disabled={disabledButton}
              onChange={handleChange}
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "This field is required,",
                "Color Name is already taken",
                "This Color is already in the palette",
              ]}
            />
            <ThemeProvider theme={theme}>
              <Button
                type="submit"
                variant="contained"
                disabled={disabledButton}
                style={{
                  width: "350px",
                  height: "70px",
                  backgroundColor: currentColor,
                  fontSize: "1.5rem",
                }}>
                {disabledButton ? "PALETTE FULL" : "ADD COLOR"}
              </Button>
            </ThemeProvider>
          </ValidatorForm>
        </div>
      </Drawer>
    </div>
  );
}
