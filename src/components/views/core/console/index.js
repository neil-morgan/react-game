import { Flex } from "@chakra-ui/react";
import Actions from "./Actions";
import Profile from "./Profile";

// { G, ctx, playerID, moves }
//font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])))

const Console = (props) => {
  return (
    <Flex
      fontSize="calc(10px + (16 - 10) * ((100vw - 300px) / (1920 - 300)))"
      mt="auto"
      p="0.5em"
      justify="space-between"
      bg="base.d100"
    >
      <Profile {...props} />
      <Actions {...props} />
    </Flex>
  );
};

export default Console;
