import { Flex } from "@chakra-ui/react";
import DrawerDock from "../drawer_dock/DrawerDock";

const Wrapper = ({ children, ...rest }) => {
  return (
    <Flex
      as="main"
      flex={1}
      maxW="full"
      h="full"
      direction={{ base: "column", md: "row" }}
      {...rest}
    >
      {children}
      <DrawerDock />
    </Flex>
  );
};

export default Wrapper;
