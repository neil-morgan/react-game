import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { Wrapper } from "../../";
import PropTypes from "prop-types";
import Interface from "./interface";
import HUD from "./HUD";
import Players from "./players/Players";

const Board = ({ G, playerID, ctx, moves, gameMetadata, gameId }) => {
  const [revealDeck, setRevealDeck] = useState(false);

  // player 0 has to set the player's actual screen names due to the way boardgame.io works
  useEffect(() => {
    if (playerID === "0") {
      moves.changeNames(gameMetadata);
    }
  }, [playerID, moves, gameMetadata]);

  const playersProps = { G, ctx, playerID, moves };

  const hudProps = { G, ctx, playerID, moves };

  const interfaceProps = {
    G,
    ctx,
    playerID,
    moves,
    revealDeck,
    gameId,
  };

  return (
    <>
      <HUD {...hudProps} />
      <Players {...playersProps} />
      <Interface {...interfaceProps} />
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
