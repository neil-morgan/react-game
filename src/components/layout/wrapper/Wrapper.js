import { Flex } from "@chakra-ui/react";

const Wrapper = ({ children }) => (
  <Flex as="main" h="100vh" px={2}>
    {children}
  </Flex>
);

export default Wrapper;
