import { Flex, useMediaQuery } from "@chakra-ui/react";
import DrawerDock from "../drawer_dock/DrawerDock";

const Wrapper = ({ children, ...rest }) => {
  const [isPortrait] = useMediaQuery("(orientation: portrait)");

  return (
    <Flex
      {...(isPortrait ? { direction: "column" } : { direction: "row" })}
      as="main"
      flex={1}
      w="full"
      h="full"
      {...rest}
    >
      {children}
      <DrawerDock />
    </Flex>
  );
};

export default Wrapper;
