import React from "react";
import { Flex } from "@chakra-ui/react";
import { getFluidFontSize } from "../../../../utils";
import { Carousel } from "../../..";
import Player from "./Player";
import Commentator from "../commentator";

// row of players
const MiddleSection = (props) => {
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
    <>
      <Flex
        w="full"
        {...getFluidFontSize()}
        as="section"
        direction="column"
        justify="center"
        borderTopWidth={1}
        borderBottomWidth={1}
        borderColor="base.700"
        py={{ base: 3, md: 6 }}
        mt="auto"
      >
        <Carousel gap={{ base: 1, md: 3 }}>
          {Array.from(Array(7)).map((_, index) => (
            <Flex
              key={index}
              borderWidth={1}
              borderColor="base.700"
              rounded={6}
              flex={1}
              p={3}
            >
              {players}
            </Flex>
          ))}
        </Carousel>
      </Flex>
    </>
  );
};

export default MiddleSection;
