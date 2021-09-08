import React, { useEffect, useState } from "react";
import { Flex, Wrap, Button } from "@chakra-ui/react";
import { MotionBox } from "../../../../";
import { AnimatePresence } from "framer-motion";
import { actionsTransition } from "../../../../../animations";

const Actions = ({ G, ctx, playerID, moves }) => {
  const [shouldAnimate, setShouldAnimate] = useState("default");

  const yourPlayer = G.players[playerID];
  const isYourTurn = ctx.currentPlayer === playerID;

  const income = () => moves.income();
  const prepAction = (action) => moves.prepAction(action);
  const allow = () => moves.allow(playerID);
  const block = () => moves.block(playerID);
  const challenge = () => moves.initiateChallenge(playerID);

  const defaultArgs = {
    canCoup: yourPlayer.coins >= 7,
    mustCoup: yourPlayer.coins >= 10,
    canAssassinate: yourPlayer.coins >= 3,
    done: ctx.currentPlayer === G.turnLog.player.id || G.winner.id !== "-1",
  };

  const defaultButtons = [
    {
      label: "income",
      onClick: () => income(),
      disabled: !isYourTurn || defaultArgs.mustCoup || defaultArgs.done,
      color: "primary",
    },
    {
      label: "foreign aid",
      onClick: () => prepAction("foreign aid"),
      disabled: !isYourTurn || defaultArgs.mustCoup || defaultArgs.done,
      color: "primary",
    },
    {
      label: "coup",
      onClick: () => prepAction("coup"),
      disabled: !isYourTurn || !defaultArgs.canCoup || defaultArgs.done,
      color: "primary",
    },
    {
      label: "tax",
      onClick: () => prepAction("tax"),
      disabled: !isYourTurn || defaultArgs.mustCoup || defaultArgs.done,
      color: "primary",
    },
    {
      label: "assassinate",
      onClick: () => prepAction("assassinate"),
      disabled:
        !isYourTurn ||
        !defaultArgs.canAssassinate ||
        defaultArgs.mustCoup ||
        defaultArgs.done,
      color: "primary",
    },
    {
      label: "steal",
      onClick: () => prepAction("steal"),
      disabled: !isYourTurn || defaultArgs.mustCoup || defaultArgs.done,
      color: "primary",
    },
    {
      label: "exchange",
      onClick: () => prepAction("exchange"),
      disabled: !isYourTurn || defaultArgs.mustCoup || defaultArgs.done,
      color: "primary",
    },
  ];

  const allowButton = {
    label: "allow",
    onClick: () => allow(),
    color: "green",
  };

  const blockButton = {
    label: "block",
    onClick: () => block(),
    color: "red",
  };

  const challengeButton = {
    label: "challenge",
    onClick: () => challenge(),
    color: "red",
  };

  const buttons = () => {
    switch (ctx.activePlayers[playerID]) {
      case "block":
        return [allowButton, blockButton];

      case "challenge":
        return [allowButton, challengeButton];

      case "blockOrChallenege":
        return [allowButton, blockButton, challengeButton];

      default:
        return defaultButtons;
    }
  };

  useEffect(() => {
    const action = ctx.activePlayers[playerID];

    action === "block" ||
      action === "challenge" ||
      (action === "blockOrChallenege" &&
        setShouldAnimate(ctx.activePlayers[playerID]));
  }, [ctx.activePlayers, playerID]);

  return (
    <Flex position="relative" w="full" maxW="360px" flex={1}>
      <AnimatePresence>
        <MotionBox
          position="absolute"
          w="full"
          left="50%"
          bottom={0}
          as={Wrap}
          key={shouldAnimate}
          spacing={3}
          justify="center"
          {...actionsTransition}
          hidden={
            G.turnLog.action === "exchange" &&
            G.turnLog.successful &&
            ctx.activePlayers[playerID] === "action" &&
            isYourTurn
          }
        >
          {buttons().map(({ label, onClick, color, disabled }, index) => (
            <Button
              key={index}
              onClick={onClick}
              disabled={disabled}
              size="xs"
              colorScheme={color}
              letterSpacing="wide"
            >
              {label.toUpperCase()}
            </Button>
          ))}
        </MotionBox>
      </AnimatePresence>
    </Flex>
  );
};

export default Actions;
