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
      <Flex direction="column" w="full" bg="base.900" rounded={5} p={8}>
        {children}
      </Flex>
    </MotionFlex>
  );
};

export default Option;
