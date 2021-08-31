import React from "react";
import { Button } from "@chakra-ui/react";
import { MotionFlex } from "../../";

const animationProps = {
  initial: {
    y: 10,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { delay: 1, duration: 0.25, ease: "easeOut" },
  },
  exit: {
    y: 10,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const OptionButton = ({ children, onClick }) => {
  return (
    <MotionFlex
      position="absolute"
      bottom={0}
      left={0}
      w="full"
      justify="center"
      {...animationProps}
    >
      <Button
        _active={{ color: "primary.200" }}
        _hover={{ textDecoration: "none", color: "white" }}
        colorScheme="primary"
        variant="link"
        size="xs"
        onClick={onClick}
      >
        {children}
      </Button>
    </MotionFlex>
  );
};

export default OptionButton;
