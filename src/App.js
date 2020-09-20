import React, { useEffect, useState } from "react";
import "./App.css";
import seedPalette from "./seedPalette";
import Palette from "./Components/Palette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./Components/PaletteList";
import SingleColorBox from "./Components/SingleColorBox";
import CreatePalette from "./Components/CreatePalette";

function App() {
  const savePalettes = JSON.parse(window.localStorage.getItem("newPalettes"));
  const [palettes, setPalettes] = useState(savePalettes || seedPalette);

  const findPalette = (id) => palettes.find((palette) => palette.id === id);

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = (id) => {
    setPalettes(palettes.filter((palette) => palette.id !== id));
  };

  useEffect(() => {
    syncLocalStorage();
  });

  const syncLocalStorage = () => {
    window.localStorage.setItem("newPalettes", JSON.stringify(palettes));
  };

  return (
    <Switch>
      <Route
        exact
        path="/palette/create"
        render={(routeProps) => (
          <CreatePalette
            savePalette={savePalette}
            {...routeProps}
            palettes={palettes}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={(routeProps) => (
          <SingleColorBox
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={(routeProps) => (
          <PaletteList
            palettes={palettes}
            {...routeProps}
            deletePalette={deletePalette}
          />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
    </Switch>
  );
}

export default App;
