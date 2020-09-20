import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ThemeProvider } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [newPaletteName, setNewPaletteName] = useState("");
  const [emoji, setEmoji] = useState(false);

  const handler = {
    newPaletteName: setNewPaletteName,
  };

  const handleChange = (evt) => {
    handler[evt.target.name](evt.target.value);
  };

  const emojiModal = () => {
    setEmoji(true);
    setOpen(false);
  };

  const savePaletteEmoji = (emoji) => {
    props.savePalette(newPaletteName, emoji.native);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmoji(false);
    setNewPaletteName("");
  };

  return (
    <>
      <ThemeProvider theme={props.theme}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          disabled={props.colors.length < 5 ? true : false}>
          Save Palette
        </Button>
      </ThemeProvider>

      <Dialog open={emoji} onClose={handleClose}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker onSelect={savePaletteEmoji} title="Pick a Palette Emoji" />
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={emojiModal}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for you new palette. Make sure it's unique!
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              autoFocus
              fullWidth
              margin="dense"
              onChange={handleChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter Palette Name",
                "Palette Name is already taken",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              //   onClick={handleClose}
              color="primary"
              type="submit"
              variant="contained">
              Save
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
}
