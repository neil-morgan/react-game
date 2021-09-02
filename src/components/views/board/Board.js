import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/react";
import ChatLog from "../chat/Chat";
import {
  AnnouncementArea,
  BottomBar,
  ChatLogSettings,
  Players,
  YourPlayer,
} from "..";

const Board = (props) => {
  console.log(props);

  const [revealDeck, setRevealDeck] = useState(false);

  // player 0 has to set the player's actual screen names due to the way boardgame.io works
  useEffect(() => {
    if (props.playerID === "0") {
      props.moves.changeNames(props.gameMetadata);
    }
  }, [props.playerID, props.moves, props.gameMetadata]);

  const chatProps = {
    G: props.G,
    playerID: props.playerID,
    moves: props.moves,
  };

  return (
    <Flex w="full" h="full">
      <Players {...props} />
      <YourPlayer {...props} />
      <AnnouncementArea {...props} />
      <BottomBar {...props} revealDeck={revealDeck} />
      <ChatLog {...chatProps} />
    </Flex>
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
