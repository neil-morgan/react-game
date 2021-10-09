import { Flex, Heading } from "@chakra-ui/react";
import Events from "./Events";
import Commentator from "../commentator";

const TopSection = (props) => {
  return (
    <Flex
      as="section"
      direction={{ base: "column", md: "row" }}
      w="full"
      flex={1}
    >
      <Flex
        display={{ base: "none", lg: "flex" }}
        position="relative"
        flex={1}
        px={{ base: 2, md: 6 }}
        py={{ base: 4, md: 6 }}
      >
        <Heading position="absolute" top={6} left={6} size="xs">
          Graveyard
        </Heading>
      </Flex>

      <Flex
        flex={{ base: 0, md: 1 }}
        alignItems="center"
        p={{ base: 2, md: 6 }}
        borderLeftWidth={1}
        borderRightWidth={1}
        borderColor="base.700"
      >
        <Commentator h={8} />
      </Flex>
      <Flex
        position="relative"
        flex={1}
        direction="column"
        p={{ base: 2, md: 6 }}
      >
        <Heading
          display={{ base: "none", md: "block" }}
          position="absolute"
          top={6}
          right={6}
          size="xs"
        >
          Turn log
        </Heading>
        <Events {...props} />
      </Flex>
    </Flex>
  );
};

export default TopSection;
