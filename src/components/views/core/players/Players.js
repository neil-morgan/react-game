import React from "react";
import { Flex } from "@chakra-ui/react";
import Player from "./Player";

// row of players
const Players = (props) => {
  const { ctx, playerID } = props;
  const players = [];
  for (let index = 0; index < ctx.numPlayers; index++) {
    const i = parseInt(ctx.playOrder[index]);
    if (i !== parseInt(playerID)) {
      players.push(
        <Player
          key={props.G.players[i].id + props.G.players[i].name}
          {...props}
          i={i}
        />
      );
    } else if (
      ctx.playOrder[index] !== ctx.playOrder[0] &&
      ctx.playOrder[index] !== ctx.playOrder[ctx.numPlayers - 1]
    ) {
      // dashed line to indicate where you are in the turn order (i.e. between these two players). only applicable if you're not the first or last player
      players.push(
        <div key="position marker" className="d-flex align-items-center h-100">
          <div></div>
        </div>
      );
    }
  }
  return (
    <Flex
      as="section"
      h="50%"
      px={4}
      align="center"
      justify="center"
      borderColor="primary.d200"
      borderTopWidth={1}
      borderBottomWidth={1}
    >
      {players}
    </Flex>
  );
};

export default Players;
