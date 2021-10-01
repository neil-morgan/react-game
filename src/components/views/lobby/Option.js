import React from "react";
import { Flex } from "@chakra-ui/react";
import { MotionFlex } from "../../";
import { pageTransition } from "../../../animations";

const Option = ({ children }) => {
  return (
    <MotionFlex
      position="absolute"
      top={0}
      left={0}
      h="390px"
      w="full"
      {...pageTransition}
    >
      <Flex
        direction="column"
        w="full"
        bg="base.d400"
        borderWidth={1}
        borderColor="base.d100"
        rounded={5}
        p={8}
      >
        {children}
      </Flex>
    </MotionFlex>
  );
};

export default Option;
