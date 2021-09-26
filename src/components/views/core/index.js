import React, { useState, useEffect, useContext } from "react";
import { CommentatorContext } from "../../../contexts";
import { useWindowDimensions } from "../../../hooks";
import { GameBoard } from "../../layout";
import PropTypes from "prop-types";
import CardSelector from "./card_selector";
import TopSection from "./top_section";
import MiddleSection from "./middle_section";
import BottomSection from "./bottom_section";
import Console from "./console";

const Core = ({ G, playerID, ctx, moves, gameMetadata }) => {
  const [revealDeck, setRevealDeck] = useState(false);
  const { height, width } = useWindowDimensions();
  const { setCommentatorState } = useContext(CommentatorContext);

  console.log(height);
  console.log(width);

  const props = { G, ctx, playerID, moves };

  useEffect(
    () => playerID === "0" && moves.changeNames(gameMetadata),
    [playerID, moves, gameMetadata]
  );

  useEffect(
    () => setCommentatorState({ ctx, G, moves, playerID }),
    [ctx, G, moves, playerID, setCommentatorState]
  );

  return (
    <>
      {/* <CardSelector {...props} />
      <TopSection {...props} />
      <MiddleSection {...props} /> */}
      {/* <BottomSection {...props} /> */}
      <Console {...props} />
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
