import React from "react";
import { Flex } from "@chakra-ui/react";
import Chat from "./chat/Chat";
import Events from "./events/Events";
import Buttons from "./buttons/Buttons";
import Deck from "./deck/Deck";

const Interface = ({ G, ctx, playerID, moves, revealDeck }) => {
  const chatProps = {
    G,
    moves,
    playerID,
  };

  const eventsProps = {
    chat: G.chat,
  };

  const deckProps = {
    deck: G.deck,
  };

  const buttonsProps = {
    G,
    ctx,
    moves,
    playerID,
  };

  return (
    <Flex
      position="absolute"
      bottom={0}
      left={0}
      p={4}
      justify="space-between"
      align="flex-end"
      w="full"
    >
      <Chat {...chatProps} />
      {G.winner.id !== "-1" || G.players[playerID].isOut ? (
        revealDeck ? (
          <Deck {...deckProps} />
        ) : (
          ""
        )
      ) : (
        <Buttons {...buttonsProps} />
      )}
      <Events {...eventsProps} />
    </Flex>
  );
};

export default Interface;
