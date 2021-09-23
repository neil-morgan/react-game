import { Flex, Button } from "@chakra-ui/react";
import { MotionBox } from "../../..";
import { AnimatePresence } from "framer-motion";
import { actionsTransition } from "../../../../animations";
import { Icon } from "../../../";

const isEven = (num) => num % 2 == 0;

const getButtons = (action, buttonSet) => {
  // const angle = 20;
  // const positions = buttonSet[action].length;
  // const initialPosition = !isEven(positions) ? 0 : -Math.abs(angle);

  const positions = buttonSet[action].length;
  const range = 130;
  const center = range / 2 - 20;
  const angle = range / positions;
  const initial = center - (positions / 2) * angle + angle / 2;

  const getButtonAngle = (num) => {
    // if (initial + angle * positions + 10) {
    //   return initial;
    // }
    return initial + angle * num;
  };

  return (
    <>
      {buttonSet[action].map(
        (
          { label, onClick, color = "primary", size = "xs", disabled },
          index
        ) => {
          return (
            <Button
              position="absolute"
              w="110px"
              top="50%"
              right="140px"
              transform={`translateY(-50%) rotate(${getButtonAngle(index)}deg)`}
              transformOrigin="186px 50%"
              key={index}
              onClick={onClick}
              disabled={disabled}
              size={size}
              colorScheme={color}
              letterSpacing="wide"
            >
              {label.toUpperCase()}
            </Button>
          );
        }
      )}
    </>
  );
};

const Buttons = ({ action, buttonSet }) => (
  <MotionBox position="relative" w="full" h="full">
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
    // {
    //   label: "coup",
    //   onClick: () => prepAction("coup"),
    //   disabled: !isYourTurn || !defaultArgs.canCoup || defaultArgs.done,
    // },
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

  const coupButton = {
    onClick: () => prepAction("coup"),
    disabled: !isYourTurn || !defaultArgs.canCoup || defaultArgs.done,
    colorScheme: "red",
  };

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
    <Flex position="relative" w="125px">
      <Button
        zIndex={1}
        {...coupButton}
        position="absolute"
        inset={0}
        w="full"
        h="full"
        rounded="50%"
      >
        <Icon name="skull" boxSize={"75px"} />
      </Button>
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
