import React from "react";
import { Flex } from "@chakra-ui/react";
import Announcer from "./Announcer";
import Actions from "./Actions";
import Deck from "./Deck";

const Console = ({ ctx, G, moves, playerID, revealDeck, gameID }) => {
  const announcerProps = {
    ctx,
    G,
    moves,
    playerID,
    gameID,
  };

  const deckProps = {
    deck: G.deck,
  };

  const actionsProps = {
    G,
    ctx,
    moves,
    playerID,
  };

  return (
    <Flex direction="column" h="full">
      <Announcer {...announcerProps} />
      {G.winner.id !== "-1" || G.players[playerID].isOut ? (
        revealDeck ? (
          <Deck {...deckProps} />
        ) : (
          ""
        )
      ) : (
        <Actions {...actionsProps} />
      )}
    </Flex>
  );
};

export default Console;
