import { Flex, Heading } from "@chakra-ui/react";
import Events from "./Events";
import Commentator from "../commentator";

const TopSection = (props) => (
  <Flex as="section" direction="row" w="full" flex={1}>
    <Flex flex={1} px={{ base: 2, md: 6 }} py={{ base: 4, md: 6 }}>
      <Heading size="xs" mb={3}>
        Graveyard
      </Heading>
    </Flex>
    <Flex
      flex={1}
      alignItems="center"
      px={{ base: 2, md: 6 }}
      py={{ base: 4, md: 6 }}
      borderLeftWidth={1}
      borderRightWidth={1}
      borderColor="base.700"
    >
      <Commentator h={8} />
    </Flex>
    <Flex
      flex={1}
      direction="column"
      px={{ base: 2, md: 6 }}
      py={{ base: 4, md: 6 }}
    >
      <Heading size="xs" mb={3} textAlign="right">
        Turn log
      </Heading>
      <Events {...props} />
    </Flex>
  </Flex>
);

export default TopSection;
