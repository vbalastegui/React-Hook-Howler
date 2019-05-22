import React from "react";
import { usePlayer } from "./usePlayer";

function PlayerButton() {
  const {
    state, // stopped | loading | playing
    play,
    stop
  } = usePlayer();

  const onClick = React.useCallback(() => {
    switch (state) {
      case "loading":
        return;
      case "stopped":
        play();
        break;
      case "playing":
        stop();
        break;
      default:
        throw new Error("WAT");
    }
  }, [state, play, stop]);

  const label = (() => {
    switch (state) {
      case "loading":
        return "WAIT FOR IT";
      case "stopped":
        return "PLAY IT";
      case "playing":
        return "JUST STOP";
      default:
        throw new Error("WAT");
    }
  })();

  return <button onClick={onClick}>{label}</button>;
}

export default PlayerButton;
