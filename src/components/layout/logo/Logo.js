import React from "react";
import { IconButton } from "@chakra-ui/react";
import { Icon } from "../../";

const Logo = () => {
  return (
    <>
      <IconButton
        as="a"
        href="/"
        colorScheme="primary"
        variant="ghost"
        position="absolute"
        top={4}
        left={6}
      >
        <Icon name="star" boxSize={8} />
      </IconButton>
    </>
  );
};

export default Logo;
