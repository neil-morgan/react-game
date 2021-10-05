import {
  Grid,
  GridItem,
  Flex,
  Text,
  Button as ChakraButton,
} from "@chakra-ui/react";
import { MotionBox } from "../../..";
import { AnimatePresence } from "framer-motion";
import { actionsTransition, textUpdate } from "../../../../animations";

const Button = ({ label, onClick, disabled, ...rest }) => (
  <GridItem
    as={ChakraButton}
    disabled={disabled}
    onClick={onClick}
    justify="center"
    fontSize="1.1em"
    w="full"
    h="full"
    {...rest}
  >
    {label}
  </GridItem>
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

  const defaultButtons = [
    {
      label: "coup",
      onClick: () => prepAction("coup"),
      disabled: !isYourTurn || !disabledArgs.canCoup || disabledArgs.done,
      colorScheme: "red",
      colSpan: 2,
    },
    {
      label: "income",
      onClick: () => income(),
      disabled: !isYourTurn || disabledArgs.mustCoup || disabledArgs.done,
      colorScheme: "primary",
    },
    {
      label: "foreign aid",
      onClick: () => prepAction("foreign aid"),
      disabled: !isYourTurn || disabledArgs.mustCoup || disabledArgs.done,
      colorScheme: "primary",
    },

    {
      label: "tax",
      onClick: () => prepAction("tax"),
      disabled: !isYourTurn || disabledArgs.mustCoup || disabledArgs.done,
      colorScheme: "primary",
    },
    {
      label: "assassinate",
      onClick: () => prepAction("assassinate"),
      disabled:
        !isYourTurn ||
        !disabledArgs.canAssassinate ||
        disabledArgs.mustCoup ||
        disabledArgs.done,
      colorScheme: "primary",
    },
    {
      label: "steal",
      onClick: () => prepAction("steal"),
      disabled: !isYourTurn || disabledArgs.mustCoup || disabledArgs.done,
      colorScheme: "primary",
    },
    {
      label: "exchange",
      onClick: () => prepAction("exchange"),
      disabled: !isYourTurn || disabledArgs.mustCoup || disabledArgs.done,
      colorScheme: "primary",
    },
  ];

  const allowButton = {
    label: "allow",
    onClick: () => allow(),
    colorScheme: "green",
    colSpan: 2,
  };

  const blockButton = {
    label: "block",
    onClick: () => block(),
    colorScheme: "red",
    colSpan: 2,
  };

  const challengeButton = {
    label: "challenge",
    onClick: () => challenge(),
    colorScheme: "red",
    colSpan: 2,
  };

  const buttonGridProps = {
    ...actionsTransition,
    templateColumns: "repeat(2, 1fr)",
    templateRows: "repeat(4, 1fr)",
    position: "relative",
    gap: "0.4em",
    w: "full",
    h: "full",
    as: Grid,
  };

  const getButtonSet = {
    block: [allowButton, blockButton],
    challenge: [allowButton, challengeButton],
    blockOrChallenge: [allowButton, blockButton, challengeButton],
    default: defaultButtons,
  };

  const action = ctx.activePlayers[playerID];
  const isk = yourPlayer.coins;

  return (
    <Flex flexDirection="column" w="18em">
      <Flex
        as="header"
        h="2em"
        mb="1em"
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
          <MotionBox key="block" {...buttonGridProps}>
            {getButtonSet["block"].map((props, index) => (
              <Button key={index} {...props} />
            ))}
          </MotionBox>
        ) : action === "challenge" ? (
          <MotionBox key="challenge" {...buttonGridProps}>
            {getButtonSet["challenge"].map((props, index) => (
              <Button key={index} {...props} />
            ))}
          </MotionBox>
        ) : action === "blockOrChallenge" ? (
          <MotionBox key="blockOrChallenge" {...buttonGridProps}>
            {getButtonSet["blockOrChallenge"].map((props, index) => (
              <Button key={index} {...props} />
            ))}
          </MotionBox>
        ) : (
          <MotionBox key="default" {...buttonGridProps}>
            {getButtonSet["default"].map((props, index) => (
              <Button key={index} {...props} />
            ))}
          </MotionBox>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default Actions;
