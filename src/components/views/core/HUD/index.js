import React from "react";
import { Flex } from "@chakra-ui/react";
import Profile from "./profile/Profile";

const HUD = ({ G, ctx, playerID, moves }) => {
  const profileProps = { G, ctx, playerID, moves };

  return (
    <Flex as="section" w="full" h="25%" px={4} pt={4} pb={6}>
      <Profile {...profileProps} />
    </Flex>
  );
};

export default HUD;
