import React from "react";
import { Wrap, Button } from "@chakra-ui/react";

const Actions = ({ G, ctx, playerID, moves }) => {
  const income = () => moves.income();
  const prepAction = (action) => moves.prepAction(action);

  const yourPlayer = G.players[playerID];
  const isYourTurn = ctx.currentPlayer === playerID;

  const args = {
    canCoup: yourPlayer.coins >= 7,
    mustCoup: yourPlayer.coins >= 10,
    canAssassinate: yourPlayer.coins >= 3,
    done: ctx.currentPlayer === G.turnLog.player.id || G.winner.id !== "-1",
  };

  const btns = [
    {
      label: "income",
      onClick: () => income(),
      disabled: !isYourTurn || args.mustCoup || args.done,
    },
    {
      label: "foreign aid",
      onClick: () => prepAction("foreign aid"),
      disabled: !isYourTurn || args.mustCoup || args.done,
    },
    {
      label: "coup",
      onClick: () => prepAction("coup"),
      disabled: !isYourTurn || !args.canCoup || args.done,
    },
    {
      label: "tax",
      onClick: () => prepAction("tax"),
      disabled: !isYourTurn || args.mustCoup || args.done,
    },
    {
      label: "assassinate",
      onClick: () => prepAction("assassinate"),
      disabled:
        !isYourTurn || !args.canAssassinate || args.mustCoup || args.done,
    },
    {
      label: "steal",
      onClick: () => prepAction("steal"),
      disabled: !isYourTurn || args.mustCoup || args.done,
    },
    {
      label: "exchange",
      onClick: () => prepAction("exchange"),
      disabled: !isYourTurn || args.mustCoup || args.done,
    },
  ];

  return (
    <Wrap
      spacing={3}
      justify="center"
      maxW="360px"
      hidden={
        G.turnLog.action === "exchange" &&
        G.turnLog.successful &&
        ctx.activePlayers[playerID] === "action" &&
        isYourTurn
      }
    >
      {btns.map(({ label, onClick, disabled }, index) => {
        return (
          <Button
            key={index}
            onClick={onClick}
            disabled={disabled}
            size="xs"
            colorScheme="primary"
            letterSpacing="wide"
          >
            {label.toUpperCase()}
          </Button>
        );
      })}
    </Wrap>
  );
};

export default Actions;
