import { Flex } from "@chakra-ui/react";
import { getFluidFontSize } from "../../../../utils";
import Actions from "./Actions";
import Profile from "./Profile";

const Console = (props) => (
  <Flex
    as="section"
    p={{ base: 2, md: 6 }}
    justify="space-between"
    {...getFluidFontSize()}
  >
    <Profile {...props} />
    <Actions {...props} />
  </Flex>
);

export default Console;
