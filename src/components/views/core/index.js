import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TopSection from "./top_section";
import MiddleSection from "./middle_section";
import BottomSection from "./bottom_section";

const Core = ({ G, playerID, ctx, moves, gameMetadata, gameId }) => {
  const [revealDeck, setRevealDeck] = useState(false);

  // player 0 has to set the player's actual screen names due to the way boardgame.io works
  useEffect(
    () => playerID === "0" && moves.changeNames(gameMetadata),
    [playerID, moves, gameMetadata]
  );

  const topProps = { G, ctx, playerID, moves };
  const middleProps = { G, ctx, playerID, moves };
  const bottomProps = {
    G,
    ctx,
    playerID,
    moves,
    revealDeck,
    gameId,
  };

  return (
    <>
      <TopSection {...topProps} />
      <MiddleSection {...middleProps} />
      <BottomSection {...bottomProps} />
    </>
  );
};

Core.propTypes = {
  G: PropTypes.any.isRequired,
  ctx: PropTypes.any.isRequired,
  moves: PropTypes.any.isRequired,
  playerID: PropTypes.string.isRequired,
  gameMetadata: PropTypes.any.isRequired,
};

export default Core;
