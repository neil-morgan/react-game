import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Interface from "./interface";
import Announcer from "./announcer/Announcer";
import YourPlayer from "./your_player/YourPlayer";

const Board = ({ G, playerID, ctx, moves, gameMetadata }) => {
  const [revealDeck, setRevealDeck] = useState(false);

  // player 0 has to set the player's actual screen names due to the way boardgame.io works
  useEffect(() => {
    if (playerID === "0") {
      moves.changeNames(gameMetadata);
    }
  }, [playerID, moves, gameMetadata]);

  const interfaceProps = {
    G,
    ctx,
    playerID,
    moves,
    revealDeck,
  };

  const announcerProps = { ctx, G, moves, playerID };

  const playerProps = { G, ctx, playerID, moves };

  return (
    <>
      <Interface {...interfaceProps} />
      {/* <Players {...props} /> */}
      <YourPlayer {...playerProps} />
      <Announcer {...announcerProps} />
      {/* <Actions {...props} revealDeck={revealDeck} />
      <Events {...chatProps} />
      <ChatLog {...chatProps} /> */}
    </>
  );
};

Board.propTypes = {
  G: PropTypes.any.isRequired,
  ctx: PropTypes.any.isRequired,
  moves: PropTypes.any.isRequired,
  playerID: PropTypes.string.isRequired,
  gameMetadata: PropTypes.any.isRequired,
};

export default Board;
