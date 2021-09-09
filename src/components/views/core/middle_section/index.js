import React from "react";
import { Flex, Wrap, WrapItem } from "@chakra-ui/react";
import Player from "./Player";

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
    <Wrap
      as="section"
      spacing={4}
      justify="center"
      flex={1}
      maxH="285px"
      my="auto"
      sx={{
        ul: {
          h: "full",
          my: "auto",
          alignItems: "center",
          overflowY: "auto",
          overflowX: "hidden",
          py: 4,

          "::-webkit-scrollbar": {
            width: "16px",
          },

          "::-webkit-scrollbar-thumb": {
            border: "6px solid rgba(0, 0, 0, 0)",
            backgroundClip: "padding-box",
            borderRadius: "9999px",
            backgroundColor: "primary.200",
          },
        },
      }}
    >
      {players}
    </Wrap>
  );
};

export default MiddleSection;
