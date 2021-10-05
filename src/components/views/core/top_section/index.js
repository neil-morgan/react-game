import { Flex } from "@chakra-ui/react";
import Events from "./Events";

const TopSection = (props) => (
  <Flex
    as="section"
    px={{ base: 2, md: 6 }}
    py={{ base: 4, md: 6 }}
    w="full"
    h="full"
  >
    <Events {...props} />
  </Flex>
);

export default TopSection;
