import React, { useState, useEffect, useContext } from "react";
import { useMediaQuery, useTheme } from "@chakra-ui/react";
import { CommentatorContext } from "../../../contexts";
import { useWindowDimensions } from "../../../hooks";
import { GameBoard } from "../../layout";
import PropTypes from "prop-types";
import CardSelector from "./card_selector";
import TopSection from "./top_section";
import Board from "./board";
import BottomSection from "./bottom_section";
import Console from "./console";

const Core = ({ G, playerID, ctx, moves, gameMetadata }) => {
  const [revealDeck, setRevealDeck] = useState(false);
  const { setCommentatorState } = useContext(CommentatorContext);

  const [isLandscape] = useMediaQuery("(orientation: landscape)");
  const [isPortrait] = useMediaQuery("(orientation: portrait)");
  const [isMobile] = useMediaQuery(`(max-width:${useTheme().breakpoints.lg})`);

  const media = {
    isLandscape,
    isPortrait,
    isMobile,
  };

  const props = { G, ctx, playerID, moves, media };

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
      <CardSelector {...props} />
      {/* <TopSection {...props} /> */}
      <Board {...props} />
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
