import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import DraggableColorList from "./DraggableColorList";
import { ValidatorForm } from "react-material-ui-form-validator";
import CreatePaletteNav from "./CreatePaletteNav";
import CreatePaletteForm from "./CreatePaletteForm";
import bg from "./Assets/img/bg2.svg";
import bg2 from "./Assets/img/bg.svg";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    "& div": {
      width: "65vw",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      "& a": {
        margin: "0 1rem",
        textDecoration: "none",
        color: "white",
      },
      "& button": {
        color: "white",
      },
    },
  },
  picker: {
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${bg})`,
    "& .ewan": {
      width: "80%",
      margin: "2rem auto",
      display: "flex",
      justifyContent: "space-evenly",
    },
    "& button": {
      color: "white",
    },
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: `url(${bg2}) center`,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: `url(${bg})`,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: "calc(100vh - 64px)",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function CreatePalette(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (curCol, newN) => {
    const addColor = {
      color: curCol,
      name: newN,
    };
    setColors([...colors, addColor]);
  };

  const clearPalette = () => {
    setColors([]);
  };

  const savePalette = (name, emoji) => {
    const newPalette = {
      paletteName: name,
      emoji,
      colors,
      id: name.toLowerCase().replace(/ /g, "-"),
    };
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const deleteColor = (name) => {
    setColors(colors.filter((color) => color.name !== name));
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        // eslint-disable-next-line
        (color) => color.name === randomColor.name
      );
    }
    setColors([...colors, randomColor]);
  };

  const disabledButton = colors.length === 20 ? true : false;

  return (
    <div className={classes.root}>
      <CreatePaletteNav
        theme={theme}
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        savePalette={savePalette}
        colors={colors}
      />

      <CreatePaletteForm
        classes={classes}
        open={open}
        clearPalette={clearPalette}
        handleDrawerClose={handleDrawerClose}
        disabledButton={disabledButton}
        addRandomColor={addRandomColor}
        addNewColor={addNewColor}
        colors={colors}
      />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
        <div className={classes.drawerHeader} />
        <DraggableColorList deleteColor={deleteColor} colors={colors} />
      </main>
    </div>
  );
}
