import { Image } from "@chakra-ui/react";
import { liveCardTransition, deadCardTransition } from "../../animations";
import { MotionBox } from "./MotionBox";

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
    position="absolute"
    pb="50%"
    w="50%"
    h={0}
    bg="red.d200"
    {...deadCardTransition}
  />
);
