import React from "react";
import { Flex } from "@chakra-ui/react";
import Chat from "./chat/Chat";
import Console from "./console";
import Events from "./events/Events";

const Interface = ({ G, ctx, playerID, moves, revealDeck }) => {
  const chatProps = {
    G,
    moves,
    playerID,
  };

  const consoleProps = {
    ctx,
    G,
    moves,
    playerID,
    revealDeck,
  };

  const eventsProps = {
    chat: G.chat,
  };

  return (
    <Flex
      as="section"
      mt="auto"
      justify="space-between"
      h="full"
      maxH="175px"
      w="full"
    >
      <Chat {...chatProps} />
      <Console {...consoleProps} />
      <Events {...eventsProps} />
    </Flex>
  );
};

export default Interface;
