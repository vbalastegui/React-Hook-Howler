import React from "react";
import ReactDOM from "react-dom";
import { PlayerProvider } from "./usePlayer";
import PlayerButton from "./PlayerButton";

import "./styles.css";

function App() {
  return (
    <PlayerProvider>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <PlayerButton />
      </div>
    </PlayerProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
