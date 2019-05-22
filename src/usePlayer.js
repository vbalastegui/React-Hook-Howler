import React from "react";
import { Howl, Howler } from "howler";

const PlayerContext = React.createContext();

// stopped | loading | playing

function playerReducer(state, action) {
  switch (action.type) {
    case "ON_LOAD":
      return "stopped";
    case "ON_PLAY": {
      return "playing";
    }
    case "ON_STOP": {
      return "stopped";
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

// Fires when the sound finishes playing.

var sound = new Howl({
  src: ["https://sample-videos.com/audio/mp3/crowd-cheering.mp3"]
});

function PlayerProvider(props) {
  const [state, dispatch] = React.useReducer(playerReducer, "loading");
  React.useEffect(() => {
    sound.once("load", function() {
      dispatch({ type: "ON_LOAD" });
    });

    sound.on("play", function() {
      dispatch({ type: "ON_PLAY" });
    });

    sound.on("stop", function() {
      dispatch({ type: "ON_STOP" });
    });

    sound.on("end", () => dispatch({ type: "ON_STOP" }));

    return () => sound.off();
  }, []);
  const play = () => sound.play();
  const stop = () => sound.stop();
  const value = React.useMemo(() => ({ state, play, stop }), [state]);
  return <PlayerContext.Provider value={value} {...props} />;
}

function usePlayer() {
  const context = React.useContext(PlayerContext);
  if (!context) {
    throw new Error(`usePlayer must be used within a PlayerProvider`);
  }
  return context;
}

export { PlayerProvider, usePlayer };
