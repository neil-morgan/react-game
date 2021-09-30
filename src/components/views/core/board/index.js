import React from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { getFluidFontSize } from "../../../../utils";
import { Carousel } from "../../../";
import Player from "./Player";

// row of players
const Board = (props) => {
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
      bg="red.500"
      w="full"
      {...getFluidFontSize()}
      as="section"
      direction="column"
      flex={1}
      px={4}
      justify="center"
    >
      <Carousel gap={32}>
        <Flex bg="blue.500" flex={1}>
          asdasdasd
        </Flex>
        <Flex bg="blue.500" flex={1}>
          asdasdasd
        </Flex>
        <Flex bg="blue.500" flex={1}>
          asdasdasd
        </Flex>
        <Flex bg="blue.500" flex={1}>
          asdasdasd
        </Flex>
        <Flex bg="blue.500" flex={1}>
          asdasdasd
        </Flex>
        <Flex bg="blue.500" flex={1}>
          asdasdasd
        </Flex>
        <Flex bg="blue.500" flex={1}>
          asdasdasd
        </Flex>
      </Carousel>
      {/* {players} */}
    </Flex>
  );
};

export default Board;
