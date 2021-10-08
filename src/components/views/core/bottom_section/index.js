import { Flex } from "@chakra-ui/react";
import { getFluidFontSize } from "../../../../utils";
import Actions from "./Actions";
import Profile from "./Profile";
import Chat from "./Chat";

const BottomSection = (props) => (
  <Flex
    as="section"
    px={{ base: 2, md: 6 }}
    py={{ base: 4, md: 6 }}
    bg="base.d400"
    justify="space-between"
    {...getFluidFontSize()}
  >
    <Profile {...props} />
    <Chat {...props} />
    <Actions {...props} />
  </Flex>
);

export default BottomSection;
