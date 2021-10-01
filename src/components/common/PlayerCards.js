import { Flex, Image, Heading, AspectRatio } from "@chakra-ui/react";
import { liveCardTransition, deadCardTransition } from "../../animations";
import { MotionBox } from "./MotionBox";
import { Icon, IskCounter } from "./";

const LiveCard = ({ src, alt, onClick }) => (
  <MotionBox
    as={Image}
    draggable={false}
    onClick={onClick}
    src={src}
    alt={alt}
  />
);

const DeadCard = () => (
  <MotionBox
    as={Icon}
    name="skull"
    color="red.800"
    boxSize="60px"
    position="absolute"
    {...deadCardTransition}
  />
);

const CardWrapper = ({ children }) => (
  <Flex
    position="relative"
    overflow="hidden"
    rounded={6}
    bg="base.d700"
    _first={{ mr: "1em" }}
  >
    {children}
  </Flex>
);

const PlayerWrapper = ({ isCurrentPlayer, onClick, player, children }) => (
  <Flex display="inline-flex" flexDirection="column" onClick={onClick}>
    <Flex
      mb={3}
      align="center"
      bg={isCurrentPlayer ? "base.900" : "transparent"}
      transition="ease 250ms"
      rounded={6}
      overflow="hidden"
      justify="space-between"
    >
      <Heading fontSize={{ base: "10px", md: "md" }} color="white">
        {player.name}
      </Heading>
      <IskCounter isk={player.coins} />
    </Flex>

    <Flex>{children}</Flex>
  </Flex>
);

export { DeadCard, LiveCard, CardWrapper, PlayerWrapper };
