import React from "react";
import { Flex } from "@chakra-ui/react";
import { MotionFlex } from "../";

const animationProps = {
  initial: {
    x: 60,
    scale: 1.2,
    opacity: 0,
  },
  animate: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { delay: 0.7, duration: 0.4, ease: "easeOut" },
  },
  exit: {
    x: -100,
    scale: 0.4,
    opacity: 0,
    transition: { duration: 0.6, ease: "backIn" },
  },
};

const Option = ({ children }) => {
  return (
    <Flex position="absolute" top={0} left={0} h="390px" w="full">
      <MotionFlex
        direction="column"
        w="full"
        bg="base.900"
        rounded={5}
        px={6}
        py={8}
        {...animationProps}
      >
        {children}
      </MotionFlex>
    </Flex>
  );
};

export default Option;
