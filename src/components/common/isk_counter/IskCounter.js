import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "../../";
import { textUpdate } from "../../../animations";

const IskCounter = ({ isk }) => {
  return (
    <Flex align="center">
      <Text size="xs" color="primary.300" fontFamily="Roboto Mono">
        isk
      </Text>
      <Flex
        w={isk >= 10 ? "30px" : "20px"}
        h="full"
        position="relative"
        textAlign="right"
      >
        <AnimatePresence>
          <MotionBox
            position="absolute"
            top="50%"
            left="50%"
            w="full"
            as={Heading}
            size="md"
            fontWeight={isk >= 10 ? "black" : "bold"}
            color={isk >= 10 ? "red.400" : "white"}
            key={isk}
            letterSpacing="wider"
            {...textUpdate}
          >
            {isk}
          </MotionBox>
        </AnimatePresence>
      </Flex>
    </Flex>
  );
};

export default IskCounter;
