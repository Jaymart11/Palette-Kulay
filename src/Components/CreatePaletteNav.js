import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SavePaletteModal from "./SavePaletteModal";

export default function CreatePaletteNav(props) {
  const { theme, classes, open, handleDrawerOpen, savePalette, colors } = props;
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <LibraryAddRoundedIcon fontSize="large" />
          </IconButton>
          <div className={classes.nav}>
            <Typography variant="h6" noWrap>
              Create Palette
            </Typography>
            <div>
              <Link to="/">
                <Button variant="contained" color="secondary">
                  GO BACK
                </Button>
              </Link>
              <SavePaletteModal
                savePalette={savePalette}
                colors={colors}
                theme={theme}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
