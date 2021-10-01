import { Flex } from "@chakra-ui/react";
import { getFluidFontSize } from "../../../../utils";
import Actions from "./Actions";
import Profile from "./Profile";

const Console = (props) => (
  <Flex as="section" p={2} justify="space-between" {...getFluidFontSize()}>
    <Profile {...props} />
    <Actions {...props} />
  </Flex>
);

export default Console;
