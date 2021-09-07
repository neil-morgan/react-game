import { Flex } from "@chakra-ui/react";

const Wrapper = ({ children, ...rest }) => (
  <Flex as="main" h="100vh" {...rest}>
    {children}
  </Flex>
);

export default Wrapper;
