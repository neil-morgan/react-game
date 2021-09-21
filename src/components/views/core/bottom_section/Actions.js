import React from "react";
import { Flex, Wrap, Button } from "@chakra-ui/react";
import { MotionBox } from "../../..";
import { AnimatePresence } from "framer-motion";
import { actionsTransition } from "../../../../animations";

const getButtons = (action, buttonSet) =>
  buttonSet[action].map(
    ({ label, onClick, color = "primary", size = "xs", disabled }, index) => (
      <Button
        key={index}
        onClick={onClick}
        disabled={disabled}
        size={size}
        colorScheme={color}
        letterSpacing="wide"
      >
        {label.toUpperCase()}
      </Button>
    )
  );

const Buttons = ({ action, buttonSet }) => (
  <MotionBox
    as={Wrap}
    position="absolute"
    w="full"
    maxW="360px"
    spacing={3}
    justify="center"
    {...actionsTransition}
  >
    {getButtons(action, buttonSet)}
  </MotionBox>
);

const Actions = ({ G, ctx, playerID, moves }) => {
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
    },
    {
      label: "foreign aid",
      onClick: () => prepAction("foreign aid"),
      disabled: !isYourTurn || defaultArgs.mustCoup || defaultArgs.done,
    },
    {
      label: "coup",
      onClick: () => prepAction("coup"),
      disabled: !isYourTurn || !defaultArgs.canCoup || defaultArgs.done,
    },
    {
      label: "tax",
      onClick: () => prepAction("tax"),
      disabled: !isYourTurn || defaultArgs.mustCoup || defaultArgs.done,
    },
    {
      label: "assassinate",
      onClick: () => prepAction("assassinate"),
      disabled:
        !isYourTurn ||
        !defaultArgs.canAssassinate ||
        defaultArgs.mustCoup ||
        defaultArgs.done,
    },
    {
      label: "steal",
      onClick: () => prepAction("steal"),
      disabled: !isYourTurn || defaultArgs.mustCoup || defaultArgs.done,
    },
    {
      label: "exchange",
      onClick: () => prepAction("exchange"),
      disabled: !isYourTurn || defaultArgs.mustCoup || defaultArgs.done,
    },
  ];

  const allowButton = {
    label: "allow",
    onClick: () => allow(),
    color: "green",
    size: "md",
  };

  const blockButton = {
    label: "block",
    onClick: () => block(),
    color: "red",
    size: "md",
  };

  const challengeButton = {
    label: "challenge",
    onClick: () => challenge(),
    color: "red",
    size: "md",
  };

  const buttonSet = {
    block: [allowButton, blockButton],
    challenge: [allowButton, challengeButton],
    blockOrChallenge: [allowButton, blockButton, challengeButton],
    default: defaultButtons,
  };

  const action = ctx.activePlayers[playerID];

  return (
    <Flex position="relative" w="full" flex={1} justify="center" align="center">
      <AnimatePresence exitBeforeEnter>
        {action === "block" ? (
          <Buttons key="block" action="block" buttonSet={buttonSet} />
        ) : action === "challenge" ? (
          <Buttons key="challenge" action="challenge" buttonSet={buttonSet} />
        ) : action === "blockOrChallenge" ? (
          <Buttons
            key="blockOrChallenge"
            action="blockOrChallenge"
            buttonSet={buttonSet}
          />
        ) : (
          <Buttons key="default" action="default" buttonSet={buttonSet} />
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default Actions;
