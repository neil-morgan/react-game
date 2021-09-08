import { Flex } from "@chakra-ui/react";

const Wrapper = ({ children, ...rest }) => (
  <Flex as="main" h="100vh" p={2} {...rest}>
    {children}
  </Flex>
);

export default Wrapper;
