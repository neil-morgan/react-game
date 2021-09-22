import React, { useState } from "react";
import { Flex, Heading, WrapItem } from "@chakra-ui/react";
import {
  CardWrapper,
  IskCounter,
  LiveCard,
  DeadCard,
  PlayerWrapper,
} from "../../../";
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
    <PlayerWrapper
      isCurrentPlayer={isCurrentPlayer}
      player={player}
      onClick={() => (canRevealHand ? updateReveal() : setTarget())}
    >
      {player.hand.map((card, index) => {
        let revealCard = false;
        if (ctx.activePlayers[i] === "revealCard") {
          revealCard =
            G.turnLog.challenge.revealedCard.length !== 0 &&
            card.id === G.turnLog.challenge.revealedCard.id;
        }
        return (
          <CardWrapper key={index}>
            <AnimatePresence exitBeforeEnter initial={false}>
              {!card.discarded ? (
                <LiveCard
                  key="live-card"
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
                />
              ) : (
                <DeadCard key="dead-card" />
              )}
            </AnimatePresence>
          </CardWrapper>
        );
      })}

      {/* <Flex flex={1} w="full" px={4}>
        {player.isOut || (gameOver && bottomRow())}
      </Flex> */}
    </PlayerWrapper>
  );
};

export default Player;
