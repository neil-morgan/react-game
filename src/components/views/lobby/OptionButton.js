import React from "react";
import { Button } from "@chakra-ui/react";
import { MotionFlex } from "../../";
import { lobbyButtonTransition } from "../../../animations";

const OptionButton = ({ children, onClick }) => {
  return (
    <MotionFlex
      position="absolute"
      bottom={0}
      left={0}
      w="full"
      justify="center"
      {...lobbyButtonTransition}
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
