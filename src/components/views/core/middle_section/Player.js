import React, { useState } from "react";
import { Flex, Heading, Image, WrapItem } from "@chakra-ui/react";
import { IskCounter, MotionBox } from "../../../";
import { AnimatePresence } from "framer-motion";

const Player = ({ G, ctx, playerID, moves, i }) => {
  const [revealHand, setRevealHand] = useState(false);
  const yourPlayer = G.players[playerID];
  const player = G.players[i];
  const gameOver = G.winner.id !== "-1";

  const isCurrentPlayer = i === parseInt(ctx.currentPlayer);
  const isYourTurn = playerID === ctx.currentPlayer;
  const playerTargetedActions = ["coup", "assassinate", "steal"];
  const canSelectPlayer =
    playerTargetedActions.includes(G.turnLog.action) &&
    isYourTurn &&
    Object.keys(G.turnLog.target).length === 0 &&
    !player.isOut;
  const canRevealHand = yourPlayer.isOut && !player.isOut && !gameOver;
  const targeted = i === parseInt(G.turnLog.target.id);

  const updateReveal = () => {
    setRevealHand(!revealHand);
  };

  // for coup, player must select another player as the target
  const setTarget = () => {
    if (canSelectPlayer) {
      const { name, id } = player;
      moves.setTarget({ name, id });
    }
  };

  /* animation/styling stuff */

  let animate = "";
  if (player.isOut) {
    animate = "player-out";
  } else if (gameOver) {
    animate = "player-winner";
  } else if (isCurrentPlayer) {
    animate = "player-entered";
  } else if (isYourTurn) {
    if (canSelectPlayer) {
      animate = "player-select";
    } else if (targeted) {
      animate = "player-selected";
    }
  }

  if (canRevealHand) {
    animate += " player-select-reveal";
  }

  // little icon to indicate a player's counterresponse
  let iconColor = "";
  if (G.turnLog.responses[i] === "allow") {
    iconColor = "#008000";
  } else if (G.turnLog.responses[i] === "block") {
    iconColor = "#8b0000";
  } else if (G.turnLog.responses[i] === "challenge") {
    iconColor = "#42526C";
  }

  const getBottomRow = (status, icon) => (
    <>
      {icon}&nbsp;({status})&nbsp;{icon}
    </>
  );

  const bottomRow = () => {
    if (G.gameOver.playAgain.includes(i.toString())) {
      return getBottomRow("ready", "door open icon");
    } else if (G.gameOver.left.includes(i.toString())) {
      return getBottomRow("left", "door close icon");
    } else if (player.isOut) {
      return getBottomRow("exiled", "death icon");
    } else {
      return getBottomRow("winner", "winner icon");
    }
  };

  return (
    <WrapItem
      flexDirection="column"
      justify="center"
      maxH="210px"
      h="full"
      onClick={() => (canRevealHand ? updateReveal() : setTarget())}
    >
      <Flex
        w="full"
        px={4}
        mb={3}
        flex={1}
        align="center"
        bg={isCurrentPlayer ? "base.900" : "transparent"}
        transition="ease 250ms"
        rounded={6}
        overflow="hidden"
        justify="space-between"
      >
        <Heading size="md" color="white">
          {player.name}
        </Heading>
        <IskCounter isk={player.coins} />
      </Flex>

      <Flex>
        {player.hand.map((card, index) => {
          let revealCard = false;
          if (ctx.activePlayers[i] === "revealCard") {
            revealCard =
              G.turnLog.challenge.revealedCard.length !== 0 &&
              card.id === G.turnLog.challenge.revealedCard.id;
          }
          return (
            <Flex
              position="relative"
              key={index}
              h="155px"
              w="100px"
              rounded={6}
              bg="base.d700"
              _first={{ mr: 3 }}
              justify="center"
              alignItems="center"
            >
              <AnimatePresence exitBeforeEnter initial={false}>
                {!card.discarded ? (
                  <MotionBox
                    key="live-card"
                    position="absolute"
                    inset={0}
                    h="full"
                    as={Image}
                    toggle={card.discarded}
                    src={
                      gameOver || revealCard || revealHand
                        ? card.front
                        : "/images/back.PNG"
                    }
                    alt={
                      gameOver || revealCard || revealHand
                        ? card.character
                        : "card"
                    }
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: {
                        duration: 2,
                      },
                    }}
                  />
                ) : (
                  <MotionBox
                    key="dead-card"
                    position="absolute"
                    pb="50%"
                    w="50%"
                    h={0}
                    bg="red.d200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: {
                        duration: 1,
                      },
                    }}
                  />
                )}
              </AnimatePresence>
            </Flex>
          );
        })}
      </Flex>
      {/* <Flex flex={1} w="full" px={4}>
        {player.isOut || (gameOver && bottomRow())}
      </Flex> */}
    </WrapItem>
  );
};

export default Player;
