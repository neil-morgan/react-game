import { Flex } from "@chakra-ui/react";
import Events from "./Events";
import Commentator from "../commentator";
import { getFluidFontSize } from "../../../../utils";

const TopSection = (props) => (
  <Flex
    as="section"
    px={{ base: 2, md: 6 }}
    py={{ base: 4, md: 6 }}
    w="full"
    h="20em"
    {...getFluidFontSize()}
  >
    <Commentator />
    <Events {...props} />
  </Flex>
);

export default TopSection;
