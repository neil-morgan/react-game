import { Flex } from "@chakra-ui/react";
import DrawerDock from "../drawer_dock/DrawerDock";

const Wrapper = ({ children, ...rest }) => (
  <Flex
    as="main"
    flex={1}
    w="full"
    h="full"
    direction={{ base: "column", xl: "row" }}
    {...rest}
  >
    {children}
    <DrawerDock />
  </Flex>
);

export default Wrapper;
