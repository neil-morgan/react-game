import { Wrap, Flex, Button as ChakraButton } from "@chakra-ui/react";
import { MotionBox } from "../../..";
import { AnimatePresence } from "framer-motion";
import { actionsTransition } from "../../../../animations";

const Button = ({ label, onClick, color = "primary", disabled }) => (
  <ChakraButton
    colorScheme={color}
    disabled={disabled}
    onClick={onClick}
    fontSize="1em"
    w="6em"
    h="2em"
  >
    {label}
  </ChakraButton>
);

const Actions = ({ G, ctx, playerID, moves }) => {
  const yourPlayer = G.players[playerID];
  const isYourTurn = ctx.currentPlayer === playerID;

  const income = () => moves.income();
  const prepAction = (action) => moves.prepAction(action);
  const allow = () => moves.allow(playerID);
  const block = () => moves.block(playerID);
  const challenge = () => moves.initiateChallenge(playerID);

  const disabledArgs = {
    canCoup: yourPlayer.coins >= 7,
    mustCoup: yourPlayer.coins >= 10,
    canAssassinate: yourPlayer.coins >= 3,
    done: ctx.currentPlayer === G.turnLog.player.id || G.winner.id !== "-1",
  };

  const buttonProps = {
    income: {
      label: "income",
      onClick: () => income(),
      disabled: !isYourTurn || disabledArgs.mustCoup || disabledArgs.done,
    },
    foreignAid: {
      label: "foreign aid",
      onClick: () => prepAction("foreign aid"),
      disabled: !isYourTurn || disabledArgs.mustCoup || disabledArgs.done,
    },

    tax: {
      label: "tax",
      onClick: () => prepAction("tax"),
      disabled: !isYourTurn || disabledArgs.mustCoup || disabledArgs.done,
    },
    assassinate: {
      label: "assassinate",
      onClick: () => prepAction("assassinate"),
      disabled:
        !isYourTurn ||
        !disabledArgs.canAssassinate ||
        disabledArgs.mustCoup ||
        disabledArgs.done,
    },
    steal: {
      label: "steal",
      onClick: () => prepAction("steal"),
      disabled: !isYourTurn || disabledArgs.mustCoup || disabledArgs.done,
    },
    exchange: {
      label: "exchange",
      onClick: () => prepAction("exchange"),
      disabled: !isYourTurn || disabledArgs.mustCoup || disabledArgs.done,
    },
    coup: {
      label: "coup",
      onClick: () => prepAction("coup"),
      disabled: !isYourTurn || !disabledArgs.canCoup || disabledArgs.done,
      colorScheme: "red",
    },
    allow: {
      label: "allow",
      onClick: () => allow(),
      color: "green",
    },
    block: {
      label: "block",
      onClick: () => block(),
      color: "red",
    },
    challenge: {
      label: "challenge",
      onClick: () => challenge(),
      color: "red",
    },
  };

  const DefaultButtons = () => (
    <>
      <Button {...buttonProps.coup} />
      <Button {...buttonProps.income} />
      <Button {...buttonProps.tax} />
      <Button {...buttonProps.foreignAid} />
      <Button {...buttonProps.assassinate} />
      <Button {...buttonProps.steal} />
      <Button {...buttonProps.exchange} />
    </>
  );

  const BlockButtons = () => (
    <>
      <Button {...buttonProps.allow} />
      <Button {...buttonProps.block} />
    </>
  );

  const ChallengeButtons = () => (
    <>
      <Button {...buttonProps.allow} />
      <Button {...buttonProps.challenge} />
    </>
  );

  const BlockOrChallengeButtons = () => (
    <>
      <Button {...buttonProps.allow} />
      <Button {...buttonProps.block} />
      <Button {...buttonProps.challenge} />
    </>
  );

  const getButtonSet = {
    block: BlockButtons(),
    challenge: ChallengeButtons(),
    blockOrChallenge: BlockOrChallengeButtons(),
    default: DefaultButtons(),
  };

  const action = ctx.activePlayers[playerID];

  const Buttons = ({ buttonSet }) => (
    <MotionBox position="relative" w="60em">
      {getButtonSet[buttonSet]}
    </MotionBox>
  );

  return (
    <Flex fontSize="calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))">
      <AnimatePresence exitBeforeEnter>
        {action === "block" ? (
          <Buttons key="block" buttonSet="block" />
        ) : action === "challenge" ? (
          <Buttons key="challenge" buttonSet="challenge" />
        ) : action === "blockOrChallenge" ? (
          <Buttons key="blockOrChallenge" buttonSet="blockOrChallenge" />
        ) : (
          <Buttons key="default" buttonSet="default" />
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default Actions;
