import { Flex, Image, Heading, WrapItem, AspectRatio } from "@chakra-ui/react";
import { liveCardTransition, deadCardTransition } from "../../animations";
import { MotionBox } from "./MotionBox";
import { Icon, IskCounter } from "./";

const LiveCard = ({ src, alt, onClick }) => (
  <MotionBox
    position="absolute"
    inset={0}
    as={Image}
    onClick={onClick}
    src={src}
    alt={alt}
    {...liveCardTransition}
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
    h={{ base: "50px", sm: "77.5px", md: "155px" }}
    w={{ base: "50px", md: "100px" }}
    overflow="hidden"
    rounded={6}
    bg="base.d700"
    _first={{ mr: 3 }}
    justify="center"
    alignItems="center"
  >
    {children}
  </Flex>
);

const PlayerWrapper = ({ isCurrentPlayer, onClick, player, children }) => (
  <WrapItem
    flexDirection="column"
    justify="center"
    maxH="210px"
    h="full"
    onClick={onClick}
  >
    <Flex
      w="full"
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
  </WrapItem>
);

export { DeadCard, LiveCard, CardWrapper, PlayerWrapper };
