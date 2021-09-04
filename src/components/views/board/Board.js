import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/react";
import { Interface } from "../../";
// import { AnnouncementArea, Actions, Events, Players, YourPlayer } from "..";

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

  const interfaceProps = {
    G: props.G,
    ctx: props.ctx,
    playerID: props.playerID,
    moves: props.moves,
    revealDeck,
  };

  return (
    <Flex w="full" h="full">
      <Interface {...interfaceProps} />
      {/* <Players {...props} /> */}
      {/* <YourPlayer {...props} /> */}
      {/* <AnnouncementArea {...props} /> */}
      {/* <Actions {...props} revealDeck={revealDeck} />
      <Events {...chatProps} />
      <ChatLog {...chatProps} /> */}
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
