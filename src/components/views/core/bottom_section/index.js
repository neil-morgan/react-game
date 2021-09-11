import React from "react";
import { Flex } from "@chakra-ui/react";
import Chat from "./Chat";
import Commentator from "../commentator";
import Actions from "./Actions";
import Events from "./Events";

const BottomSection = ({ G, ctx, playerID, moves }) => {
  const actionsProps = {
    G,
    ctx,
    moves,
    playerID,
  };

  const chatProps = {
    G,
    moves,
    playerID,
  };

  const commentatorProps = {
    ctx,
    G,
    moves,
    playerID,
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
      <Flex
        direction="column"
        align="center"
        justify="space-between"
        flex={1}
        h="full"
      >
        <Commentator {...commentatorProps} />
        <Actions {...actionsProps} />
      </Flex>
      <Events {...eventsProps} />
    </Flex>
  );
};

export default BottomSection;
