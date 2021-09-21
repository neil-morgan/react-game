import { Flex, Image } from "@chakra-ui/react";
import { liveCardTransition, deadCardTransition } from "../../animations";
import { MotionBox } from "./MotionBox";
import { Icon } from "./Icon";

export const LiveCard = ({ src, alt, onClick }) => (
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

export const DeadCard = () => (
  <MotionBox
    as={Icon}
    name="skull"
    color="red.800"
    boxSize="50px"
    position="absolute"
    {...deadCardTransition}
  />
);

export const CardWrapper = ({ children }) => (
  <Flex
    position="relative"
    h="155px"
    w="100px"
    rounded={6}
    bg="base.d700"
    _first={{ mr: 3 }}
    justify="center"
    alignItems="center"
  >
    {children}
  </Flex>
);
