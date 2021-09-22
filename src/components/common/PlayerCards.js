import { Flex, Image, Heading, WrapItem } from "@chakra-ui/react";
import { liveCardTransition, deadCardTransition } from "../../animations";
import { MotionBox } from "./MotionBox";
import { Icon, IskCounter } from "./";

const LiveCard = ({ src, alt, onClick }) => (
  <MotionBox
    position="absolute"
    inset={0}
    h="full"
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
    boxSize="50px"
    position="absolute"
    {...deadCardTransition}
  />
);

const CardWrapper = ({ children }) => (
  <Flex
    position="relative"
    h={{ base: "77.5px", md: "155px" }}
    w={{ base: "50px", md: "100px" }}
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
      px={4}
      mb={3}
      flex={1}
      align="center"
      bg={isCurrentPlayer ? "base.900" : "transparent"}
      transition="ease 250ms"
      rounded={6}
      overflow="hidden"
      justify="space-between"
    >
      <Heading size="md" color="white">
        {player.name}
      </Heading>
      <IskCounter isk={player.coins} />
    </Flex>

    <Flex>{children}</Flex>
  </WrapItem>
);

export { DeadCard, LiveCard, CardWrapper, PlayerWrapper };
