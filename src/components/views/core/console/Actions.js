import {
  Grid,
  GridItem,
  Wrap,
  Heading,
  Flex,
  Text,
  Button as ChakraButton,
} from "@chakra-ui/react";
import { MotionBox, IskCounter } from "../../..";
import { AnimatePresence } from "framer-motion";
import { actionsTransition, textUpdate } from "../../../../animations";

const Button = ({ label, onClick, color = "primary", disabled, ...rest }) => (
  <ChakraButton
    colorScheme={color}
    disabled={disabled}
    onClick={onClick}
    justify="center"
    fontSize="1.1em"
    w="full"
    h="full"
    {...rest}
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
    <Grid templateColumns="repeat(2, 1fr)" w="full" h="full" gap="0.4em">
      <GridItem as={Button} colSpan={2} {...buttonProps.coup} />
      <GridItem as={Button} {...buttonProps.income} />
      <GridItem as={Button} {...buttonProps.tax} />
      <GridItem as={Button} {...buttonProps.foreignAid} />
      <GridItem as={Button} {...buttonProps.assassinate} />
      <GridItem as={Button} {...buttonProps.steal} />
      <GridItem as={Button} {...buttonProps.exchange} />
    </Grid>
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
  const isk = yourPlayer.coins;

  const Buttons = ({ buttonSet }) => (
    <MotionBox position="relative" w="full" h="full">
      {getButtonSet[buttonSet]}
    </MotionBox>
  );

  return (
    <Flex flexDirection="column" w="18em">
      <Flex
        as="header"
        h="4em"
        mb="0.5em"
        justify="center"
        align="center"
        w="full"
      >
        <Text
          as="span"
          fontSize="1.2em"
          color="primary.300"
          fontFamily="Roboto Mono"
        >
          isk
        </Text>
        <Flex
          w={isk >= 10 ? "1.75em" : "1.5em"}
          h="full"
          position="relative"
          textAlign="right"
        >
          <AnimatePresence>
            <MotionBox
              position="absolute"
              top="50%"
              left="50%"
              w="full"
              as="span"
              fontSize="1.6em"
              fontWeight={isk >= 10 ? "black" : "bold"}
              color={isk >= 10 ? "red.400" : "white"}
              key={isk}
              {...textUpdate}
            >
              {isk}
            </MotionBox>
          </AnimatePresence>
        </Flex>
      </Flex>
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
