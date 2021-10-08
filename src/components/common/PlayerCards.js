import { Flex, Image } from "@chakra-ui/react";
import { liveCardTransition, deadCardTransition } from "../../animations";
import { MotionBox } from "./MotionBox";
import { Icon } from "./";

const LiveCard = ({ src, alt, onClick }) => (
  <MotionBox
    as={Image}
    draggable={false}
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
    boxSize="6em"
    position="absolute"
    {...deadCardTransition}
  />
);

const CardWrapper = ({ children }) => (
  <Flex
    position="relative"
    overflow="hidden"
    justify="center"
    align="center"
    rounded={6}
    w="50%"
    bg="base.d700"
    _first={{ mr: "1em" }}
  >
    {children}
  </Flex>
);

export { DeadCard, LiveCard, CardWrapper };
