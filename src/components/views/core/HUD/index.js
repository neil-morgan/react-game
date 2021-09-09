import React from "react";
import { Flex } from "@chakra-ui/react";
import Profile from "./profile/Profile";

const HUD = ({ G, ctx, playerID, moves }) => {
  const profileProps = { G, ctx, playerID, moves };

  return (
    <Flex as="section" w="full" justify={{ base: "center", lg: "flex-start" }}>
      <Profile {...profileProps} />
    </Flex>
  );
};

export default HUD;
